/**
 * Lustre — React wrapper.
 *
 * Works in Next.js, Vite, Remix, Framer and anything else running React 17+.
 * A thin shell: all the work happens in the class, so the canvas is created
 * once and never re-created by a re-render.
 *
 *   import LustreBackground from "./Lustre";
 *
 *   <LustreBackground motif="silk" palette="dusk" style={{ height: "100svh" }}>
 *     <h1>Your hero</h1>
 *   </LustreBackground>
 *
 * SSR-safe: nothing touches `window` until the effect runs, which only ever
 * happens in the browser.
 */

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import Lustre from "../dist/lustre.esm.js";

const LustreBackground = forwardRef(function LustreBackground(
  {
    motif = "caustics",
    palette,
    colors,
    background,
    scale,
    energy = 0.5,
    contrast,
    speed,
    grain,
    vignette,
    mouse,
    quality,
    intro,
    pauseOffscreen,
    respectReducedMotion,
    onFallback,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const host = useRef(null);
  const inst = useRef(null);

  /* Keep the latest callback without making it a dependency: an inline arrow
     would otherwise tear the canvas down on every render. */
  const fallbackRef = useRef(onFallback);
  fallbackRef.current = onFallback;

  /* Only these need a full teardown. Everything else — motif included — can be
     pushed into the live instance, which just rebuilds the shader. */
  const structuralKey = JSON.stringify({
    pauseOffscreen,
    respectReducedMotion,
    quality,
    mouse,
    intro,
  });

  useEffect(() => {
    if (!host.current) return undefined;

    const instance = new Lustre(host.current, {
      motif,
      palette,
      colors,
      background,
      scale,
      energy,
      contrast,
      speed,
      grain,
      vignette,
      mouse,
      quality,
      intro,
      pauseOffscreen,
      respectReducedMotion,
      onFallback: (reason) => fallbackRef.current && fallbackRef.current(reason),
    });

    inst.current = instance;
    return () => {
      instance.destroy();
      inst.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [structuralKey]);

  /* Cheap updates: straight into the running instance. */
  useEffect(() => {
    if (!inst.current) return;
    inst.current.set({ motif, palette, colors, background, scale, contrast, speed, grain, vignette });
  }, [motif, palette, colors, background, scale, contrast, speed, grain, vignette]);

  useEffect(() => {
    if (inst.current) inst.current.energy(energy);
  }, [energy]);

  useImperativeHandle(ref, () => ({
    /** The live Lustre instance, if you need the raw API. */
    get instance() {
      return inst.current;
    },
    energy: (v) => inst.current && inst.current.energy(v),
    motif: (n) => inst.current && inst.current.motif(n),
    palette: (n) => inst.current && inst.current.palette(n),
    play: () => inst.current && inst.current.play(),
    pause: () => inst.current && inst.current.pause(),
  }));

  return (
    <div
      ref={host}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});

export default LustreBackground;

/* --------------------------------------------------------------------------
 * Driving energy from scroll — the effect most buyers are after.
 *
 *   const ref = useRef(null);
 *   useEffect(() => {
 *     const onScroll = () => ref.current?.energy(window.scrollY / window.innerHeight);
 *     window.addEventListener("scroll", onScroll, { passive: true });
 *     return () => window.removeEventListener("scroll", onScroll);
 *   }, []);
 *   <LustreBackground ref={ref} style={{ height: "100svh" }} />
 *
 * .energy() eases towards whatever you give it, so raw scroll values are fine —
 * there is no need to throttle or smooth them yourself.
 * -------------------------------------------------------------------------- */
