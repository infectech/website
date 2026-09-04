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
/** Flow angle, wrapped to [0, 2PI). */
uniform float uPhase;
/** Grain clock, wrapped to [0, 256). */
uniform float uGrainPhase;
uniform vec3 uBackground;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uColorD;
uniform vec3 uColorE;
uniform float uGrain;
uniform float uGrainScale;
uniform float uSeed;

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
  // Offsets each instance into a different part of the noise field, so a grid
  // of cards reads as several gradients rather than the same one repeated.
  p += uSeed;

  // The flow is driven by sampling the noise field along circles rather than
  // by sliding it linearly with time. A linear offset grows without bound, and
  // once the coordinates are large enough that a 32-bit float cannot separate
  // neighbouring pixels, the field starts to crawl and jitter. Circles keep
  // every coordinate small forever, and because the three terms are integer
  // harmonics of one angle they all come back together at 2PI, so the loop is
  // seamless.
  vec2 flowA = vec2(cos(uPhase), sin(uPhase)) * 0.55;
  vec2 flowB = vec2(cos(2.0 * uPhase + 1.7), sin(2.0 * uPhase + 1.7)) * 0.40;
  vec2 flowC = vec2(cos(3.0 * uPhase + 4.2), sin(3.0 * uPhase + 4.2)) * 0.30;

  // First warp.
  vec2 q = vec2(fbm(p + flowA),
                fbm(p + vec2(5.2, 1.3) + flowB));

  // Second warp, fed by the first — this is what makes it fold.
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + flowC),
                fbm(p + 3.5 * q + vec2(8.3, 2.8) - flowB));

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

  // Film grain. Quantised to a cell a couple of device pixels across, so it
  // stays visible instead of dissolving into the pixel grid on a retina
  // screen, and stepped at ~20fps rather than every frame — continuous noise
  // reads as a smooth shimmer, where film grain jitters.
  vec2 grainCell = floor(gl_FragCoord.xy / uGrainScale);
  float g = hash(grainCell + uGrainPhase * 17.3) - 0.5;
  colour += g * uGrain;

  gl_FragColor = vec4(colour, 1.0);
}
`;

const TAU = Math.PI * 2;
/** Radians of flow per second at speed 1; sets the loop length. */
const FLOW_RATE = 0.12;
/** Grain updates per second — film jitters, it does not shimmer. */
const GRAIN_FPS = 20;
/** Distinct grain patterns before repeating. */
const GRAIN_STEPS = 256;

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
  /** Two to five stops, mixed in order over the background. Fewer than five
   *  are cycled to fill the shader's slots. */
  colors?: string[];
  background?: string;
  speed?: number;
  /** Amplitude of the film grain, 0–1. */
  grain?: number;
  /** Size of one grain cell in CSS pixels; scaled by DPR so it looks the
   *  same on a retina screen as on a standard one. */
  grainScale?: number;
  /** Shifts this instance into a different part of the noise field. */
  seed?: number;
  className?: string;
};

export default function MeshGradient({
  colors = ["#FF3087", "#1B36A6", "#00D3FF", "#6D3BFF", "#492E52"],
  background = "#003FFF",
  speed = 1,
  grain = 0.13,
  grainScale = 1,
  seed = 0,
  className = "",
}: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The effect keys off the joined colours rather than the array itself: an
  // array prop is a new identity on every render, which would tear the
  // context down and rebuild it each time.
  const colorKey = colors.join(",");

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
    const uPhase = u("uPhase");
    const uGrainPhase = u("uGrainPhase");

    // Cycled, so a four-stop preset fills all five slots without a gap.
    const stops = colorKey.split(",");
    const stopAt = (i: number) => rgb(stops[i % stops.length]);

    gl.uniform3fv(u("uBackground"), rgb(background));
    gl.uniform3fv(u("uColorA"), stopAt(0));
    gl.uniform3fv(u("uColorB"), stopAt(1));
    gl.uniform3fv(u("uColorC"), stopAt(2));
    gl.uniform3fv(u("uColorD"), stopAt(3));
    gl.uniform3fv(u("uColorE"), stopAt(4));
    gl.uniform1f(u("uGrain"), grain);
    gl.uniform1f(u("uSeed"), seed);
    const uGrainScale = u("uGrainScale");

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
      // Set here, not once at init: the cell is specified in CSS pixels, so it
      // has to be re-expressed in device pixels whenever the DPR changes —
      // dragging the window to a second monitor, for instance.
      gl.uniform1f(uGrainScale, grainScale * dpr);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const elapsed = (now - start) / 1000;
      // Both clocks are wrapped before they reach the shader. Left to run,
      // they climb until a 32-bit float can no longer resolve one frame from
      // the next, which is what makes a long-running gradient start to
      // shudder. TAU is the flow's natural period, so wrapping there is
      // invisible; the grain is noise, so any wrap is invisible.
      gl.uniform1f(uPhase, (elapsed * speed * FLOW_RATE) % TAU);
      gl.uniform1f(uGrainPhase, Math.floor(elapsed * GRAIN_FPS) % GRAIN_STEPS);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(draw);
    };

    // A grid of these means several shaders running at once, so stop drawing
    // the moment one scrolls out of view rather than burning frames on a
    // surface nobody can see.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frame) {
          frame = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0 }
    );

    if (reduce) {
      // One still frame, at a point in the loop that looks composed.
      gl.uniform1f(uPhase, 1.9);
      gl.uniform1f(uGrainPhase, 7);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      visibility.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      // Browsers cap live WebGL contexts at around 16 and drop the oldest, so
      // release it explicitly rather than waiting for GC on every navigation.
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    colorKey,
    background,
    speed,
    grain,
    grainScale,
    seed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}
