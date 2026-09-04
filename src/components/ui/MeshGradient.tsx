"use client";

import { useEffect, useRef } from "react";

/**
 * Animated mesh gradient, drawn by one fullscreen fragment shader.
 *
 * The look comes from domain warping: fbm noise is used to distort the
 * coordinates fed to more fbm noise, twice over, which is what produces the
 * slow folding flow rather than a plain blur between colour stops. Each colour
 * is then mixed in against a different band of that field, and a little grain
 * is laid over the top to break up the banding a flat gradient would show.
 *
 * Raw WebGL and no dependencies — the whole thing is the shader below.
 */

const VERTEX = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uBackground;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uColorD;
uniform vec3 uColorE;
uniform float uGrain;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    total += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }
  return total;
}

void main() {
  // Normalise on the shorter edge so the flow keeps its proportions
  // whatever shape the card is.
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * vec2(uResolution.x / min(uResolution.x, uResolution.y),
                     uResolution.y / min(uResolution.x, uResolution.y));
  p *= 2.2;

  float t = uTime * 0.12;

  // First warp.
  vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + t),
                fbm(p + vec2(5.2, 1.3) - t * 0.8));

  // Second warp, fed by the first — this is what makes it fold.
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.7),
                fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 0.5));

  float f = fbm(p + 3.0 * r);

  // smoothstep rather than a raw clamp: it gives each colour a defined band
  // with soft shoulders, which is what separates the stops instead of letting
  // them average into one muddy wash.
  float mA = smoothstep(0.30, 0.95, f * 1.7);
  float mB = smoothstep(0.20, 0.90, length(q) * 1.15);
  float mC = smoothstep(0.25, 0.85, r.x * 1.6);
  float mD = smoothstep(0.10, 0.80, dot(q, r) * 1.8);
  float mE = smoothstep(0.35, 1.00, f * r.y * 2.6);

  vec3 colour = uBackground;
  colour = mix(colour, uColorA, mA);
  colour = mix(colour, uColorB, mB);
  colour = mix(colour, uColorC, mC);
  colour = mix(colour, uColorD, mD);
  colour = mix(colour, uColorE, mE);

  // Lift and deepen with the field, so it reads as lit rather than flat.
  colour *= 0.82 + 0.5 * f;

  // Push saturation past what mixing alone gives, matching the vivid look
  // these gradients are set up for.
  float luma = dot(colour, vec3(0.299, 0.587, 0.114));
  colour = clamp(mix(vec3(luma), colour, 1.45), 0.0, 1.0);

  // Grain, animated so it shimmers instead of sitting as a fixed pattern.
  float g = hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5;
  colour += g * uGrain;

  gl_FragColor = vec4(colour, 1.0);
}
`;

/** "#RRGGBB" to normalised rgb. */
function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // Surfaced rather than swallowed: a silent shader failure is otherwise
    // indistinguishable from a blank element.
    console.error("MeshGradient shader failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export type MeshGradientProps = {
  /** Five stops, mixed in order over the background. */
  colors?: [string, string, string, string, string];
  background?: string;
  speed?: number;
  grain?: number;
  className?: string;
};

export default function MeshGradient({
  colors = ["#FF3087", "#1B36A6", "#00D3FF", "#6D3BFF", "#492E52"],
  background = "#003FFF",
  speed = 1,
  grain = 0.06,
  className = "",
}: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      // The gradient repaints every frame, so there is nothing to preserve.
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("MeshGradient link failed:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // One triangle covering the viewport — cheaper than two, and avoids the
    // seam a quad can show along its diagonal.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uResolution = u("uResolution");
    const uTime = u("uTime");

    gl.uniform3fv(u("uBackground"), rgb(background));
    gl.uniform3fv(u("uColorA"), rgb(colors[0]));
    gl.uniform3fv(u("uColorB"), rgb(colors[1]));
    gl.uniform3fv(u("uColorC"), rgb(colors[2]));
    gl.uniform3fv(u("uColorD"), rgb(colors[3]));
    gl.uniform3fv(u("uColorE"), rgb(colors[4]));
    gl.uniform1f(u("uGrain"), grain);

    const resize = () => {
      // Capped: this is a decorative surface, not worth 3x pixels on a phone.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      const width = Math.max(1, Math.floor(w * dpr));
      const height = Math.max(1, Math.floor(h * dpr));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolution, width, height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const start = performance.now();
    const draw = (now: number) => {
      gl.uniform1f(uTime, ((now - start) / 1000) * speed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(draw);
    };

    if (reduce) {
      // One still frame, at a point in the loop that looks composed.
      gl.uniform1f(uTime, 8);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      frame = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      // Browsers cap live WebGL contexts at around 16 and drop the oldest, so
      // release it explicitly rather than waiting for GC on every navigation.
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [colors, background, speed, grain]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}
