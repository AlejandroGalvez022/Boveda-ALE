// @ts-nocheck
/*!
 * LUSTRE for Framer — one code file, no packages to install.
 * Generated from src/framer.tsx + src/lustre.js by build.ps1.
 * Copyright (c) 2026 Alejandro Galvez. See LICENSE.md.
 *
 * INSTALL: Assets → Code → "+" → New file → name it Lustre → paste this whole
 * file over the template → save. "Lustre" appears in your Assets. Drag it onto
 * the canvas, set it to fill its parent, and put your content above it.
 */

import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { useEffect, useRef } from "react"

/*__LUSTRE_ENGINE__*/

const PALETTE_NAMES = ["lagoon", "dusk", "forest", "steel", "magma", "violet", "mono", "custom"]

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 * @framerDisableUnlink
 */
export default function LustreBackground(props) {
    /* Defaults live here (and as each control's defaultValue): React is
       retiring defaultProps on function components. */
    const {
        motif = "caustics", palette = "lagoon",
        color1 = "#eafff7", color2 = "#5fe2c8", color3 = "#1f8fb5", color4 = "#10275c",
        background = "#030a14", scale = 1, speed = 1, energy = 0.5,
        scrollEnergy = false, scrollDistance = 1, contrast = 1, grain = 0.03,
        vignette = 0.35, mouse = 0.1, quality = 1.75, animateOnCanvas = false, style,
    } = props

    const host = useRef(null)
    const inst = useRef(null)

    /* On the Framer canvas a live WebGL loop per instance makes the editor
       sluggish, so by default it paints one still frame there. The preview
       and the published site always animate. */
    const onCanvas = RenderTarget.current() === RenderTarget.canvas
    const still = onCanvas && !animateOnCanvas

    const look = () => {
        const o = { motif, scale, speed: still ? 0 : speed, contrast, grain, vignette }
        if (palette === "custom") {
            o.colors = [color1, color2, color3, color4]
            o.background = background
        } else {
            o.palette = palette
        }
        return o
    }

    useEffect(() => {
        if (!host.current) return undefined
        const h = new Lustre(host.current, {
            ...look(),
            energy,
            mouse: onCanvas ? 0 : mouse,
            quality,
            intro: !onCanvas,
        })
        if (still) h.pause()
        inst.current = h
        return () => {
            h.destroy()
            inst.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mouse, quality, still, onCanvas])

    /* Everything cosmetic goes straight into the running instance. */
    useEffect(() => {
        const h = inst.current
        if (!h) return
        h.set(look())
        if (still) h._draw()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [motif, palette, color1, color2, color3, color4, background, scale, speed, contrast, grain, vignette])

    /* Energy: a fixed value, or driven by how far the page has scrolled. */
    useEffect(() => {
        const h = inst.current
        if (!h) return undefined
        if (!scrollEnergy || onCanvas) {
            h.energy(energy)
            if (still) h._draw()
            return undefined
        }
        const onScroll = () => {
            const k = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * scrollDistance))
            h.energy(energy + (1 - energy) * k)
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [energy, scrollEnergy, scrollDistance, onCanvas])

    return (
        <div
            ref={host}
            style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%", ...style }}
        />
    )
}

LustreBackground.displayName = "Lustre"


const notCustom = (p) => p.palette !== "custom"

addPropertyControls(LustreBackground, {
    motif: {
        type: ControlType.Enum,
        title: "Motif",
        options: ["caustics", "silk", "chrome"],
        optionTitles: ["Caustics", "Silk", "Chrome"],
        defaultValue: "caustics",
    },
    palette: {
        type: ControlType.Enum,
        title: "Palette",
        options: PALETTE_NAMES,
        optionTitles: ["Lagoon", "Dusk", "Forest", "Steel", "Magma", "Violet", "Mono", "Custom"],
        defaultValue: "lagoon",
    },
    color1: { type: ControlType.Color, title: "Highlight", defaultValue: "#eafff7", hidden: notCustom },
    color2: { type: ControlType.Color, title: "Light", defaultValue: "#5fe2c8", hidden: notCustom },
    color3: { type: ControlType.Color, title: "Mid", defaultValue: "#1f8fb5", hidden: notCustom },
    color4: { type: ControlType.Color, title: "Shade", defaultValue: "#10275c", hidden: notCustom },
    background: { type: ControlType.Color, title: "Background", defaultValue: "#030a14", hidden: notCustom },
    energy: {
        type: ControlType.Number, title: "Energy", min: 0, max: 1, step: 0.01, defaultValue: 0.5,
        description: "How alive it is. With Scroll on, this is where it starts.",
    },
    scrollEnergy: {
        type: ControlType.Boolean, title: "Scroll", enabledTitle: "Drives it", disabledTitle: "Off", defaultValue: false,
    },
    scrollDistance: {
        type: ControlType.Number, title: "Full at", min: 0.25, max: 4, step: 0.25, unit: "× screen", defaultValue: 1,
        hidden: (p) => !p.scrollEnergy,
    },
    scale: { type: ControlType.Number, title: "Scale", min: 0.3, max: 3, step: 0.05, defaultValue: 1 },
    speed: { type: ControlType.Number, title: "Speed", min: 0, max: 3, step: 0.05, defaultValue: 1 },
    contrast: { type: ControlType.Number, title: "Contrast", min: 0.3, max: 2, step: 0.05, defaultValue: 1 },
    grain: { type: ControlType.Number, title: "Grain", min: 0, max: 0.2, step: 0.005, defaultValue: 0.03 },
    vignette: { type: ControlType.Number, title: "Vignette", min: 0, max: 1, step: 0.01, defaultValue: 0.35 },
    mouse: { type: ControlType.Number, title: "Mouse", min: 0, max: 0.5, step: 0.01, defaultValue: 0.1 },
    quality: {
        type: ControlType.Number, title: "Quality", min: 0.75, max: 2, step: 0.25, defaultValue: 1.75,
        description: "Pixel-density cap. Lower it for very large sections.",
    },
    animateOnCanvas: {
        type: ControlType.Boolean, title: "On canvas", enabledTitle: "Animate", disabledTitle: "Still", defaultValue: false,
    },
})
