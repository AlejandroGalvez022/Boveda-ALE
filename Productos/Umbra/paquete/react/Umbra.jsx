/**
 * Umbra — React wrapper.
 *
 * Works in Next.js, Vite, Remix, Framer and anything else that runs React 17+.
 * The component is a thin shell: all the work happens in the class, so the
 * canvas is created once and never re-created by a re-render.
 *
 *   import UmbraBackground from "./Umbra";
 *
 *   <UmbraBackground preset="nebula" style={{ height: "100svh" }}>
 *     <h1>Your hero</h1>
 *   </UmbraBackground>
 *
 * Server-side rendering is safe: nothing touches `window` until the effect
 * runs, which only ever happens in the browser.
 */

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import Umbra from "../dist/umbra.esm.js";

/* Options that need a full teardown when they change. Everything else can be
   pushed into the live instance with .set(), which is far cheaper. */
const STRUCTURAL = ["pauseOffscreen", "respectReducedMotion", "quality", "mouse"];

const UmbraBackground = forwardRef(function UmbraBackground(
  {
    preset,
    colors,
    background,
    x,
    y,
    radius,
    open = 0,
    speed,
    orbits,
    stars,
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

  /* Keep the latest callback without making it a dependency: otherwise an
     inline arrow function would tear the canvas down on every render. */
  const fallbackRef = useRef(onFallback);
  fallbackRef.current = onFallback;

  const structuralKey = JSON.stringify({
    pauseOffscreen,
    respectReducedMotion,
    quality,
    mouse,
    intro,
  });

  useEffect(() => {
    if (!host.current) return undefined;

    const instance = new Umbra(host.current, {
      preset,
      colors,
      background,
      x,
      y,
      radius,
      open,
      speed,
      orbits,
      stars,
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

  /* Cheap updates: push straight into the running instance. */
  useEffect(() => {
    if (!inst.current) return;
    inst.current.set({
      preset,
      colors,
      background,
      x,
      y,
      radius,
      speed,
      orbits,
      stars,
      grain,
      vignette,
    });
  }, [preset, colors, background, x, y, radius, speed, orbits, stars, grain, vignette]);

  useEffect(() => {
    if (inst.current) inst.current.open(open);
  }, [open]);

  useImperativeHandle(ref, () => ({
    /** The live Umbra instance, if you need the raw API. */
    get instance() {
      return inst.current;
    },
    open: (v) => inst.current && inst.current.open(v),
    play: () => inst.current && inst.current.play(),
    pause: () => inst.current && inst.current.pause(),
    preset: (n) => inst.current && inst.current.preset(n),
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

export default UmbraBackground;

/* --------------------------------------------------------------------------
 * Wiring the aperture to scroll — the effect most buyers are after.
 *
 *   const ref = useRef(null);
 *   useEffect(() => {
 *     const onScroll = () => ref.current?.open(window.scrollY / window.innerHeight);
 *     window.addEventListener("scroll", onScroll, { passive: true });
 *     return () => window.removeEventListener("scroll", onScroll);
 *   }, []);
 *   <UmbraBackground ref={ref} style={{ height: "100svh" }} />
 *
 * .open() eases towards whatever you give it, so raw scroll values are fine —
 * there is no need to throttle or smooth them yourself.
 * -------------------------------------------------------------------------- */
