(() => {
    "use strict"

    const listeners = []
    const store = {arrows: []}

    const listen = (target, name, method) => {
        let base = target[name]?.bind(target)

        Object.defineProperty(target, name, {
            configurable: true,
            set: e => base = e,

            get: () => (...args) => {
                base(...args)
                method(...args)
            }
        })

        listeners.push(() => Object.defineProperty(target, name, base))
    }

    const ready = () => {
        const gfx = new PIXI.Graphics()

        const loop = () => {
            store.loop = requestAnimationFrame(loop)

            gfx.clear()
            gfx.lineStyle(2, 0, 1)

            myself && store.arrows.forEach(({name, color}) => {
                const list = objects.items.filter(e => e && e.name == name)

                gfx.beginFill(color)

                list.forEach(item => {
                    const cx = myself.fromx * 32 + myself.tweenx + 16
                    const cy = myself.fromy * 32 + myself.tweeny + 16

                    const x = item.x * 32 + 16 - cx
                    const y = item.y * 32 + 16 - cy
                    const len = Math.hypot(x, y)

                    const u = x / len
                    const v = y / len

                    const bx = cx + u * (len / 4 - 2)
                    const by = cy + v * (len / 4 - 2)

                    const angle = Math.atan2(v, u)
                    const size = 6

                    const p1x = bx + Math.cos(angle) * size
                    const p1y = by + Math.sin(angle) * size

                    const p2x = bx + Math.cos(angle + Math.PI * 2 / 3) * size
                    const p2y = by + Math.sin(angle + Math.PI * 2 / 3) * size

                    const p3x = bx + Math.cos(angle - Math.PI * 2 / 3) * size
                    const p3y = by + Math.sin(angle - Math.PI * 2 / 3) * size

                    gfx.moveTo(p1x, p1y)
                    gfx.lineTo(p2x, p2y)
                    gfx.lineTo(p3x, p3y)
                    gfx.closePath()
                })

                gfx.endFill()
            })
        }

        listeners.push(() => {
            effect_container.removeChild(gfx)
            gfx.destroy()

            cancelAnimationFrame(store.loop)
        })

        effect_container.addChild(gfx)
        store.loop = requestAnimationFrame(loop)
    }

    const init = () => {
        const canvas = document.getElementById("jv")

        const filter = new PIXI.Filter(undefined, `
            precision mediump float;

            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;

            uniform float light;
            uniform float sat;
            uniform float contrast;

            void main() {
                vec4 color = texture2D(uSampler, vTextureCoord);
                vec3 shade = (mix(vec3(dot(color.rgb, vec3(.299, .587, .114))), color.rgb, sat) - .5) * contrast + .5;

                gl_FragColor = vec4(shade * light, 1);
            }`)

        window._?.()
        window._ = () => listeners.forEach(e => e())

        canvas.onpointerdown = event => {
            if (!window.master_container) return
            const rect = canvas.getBoundingClientRect()

            const pos = master_container.toLocal({
                x: (event.clientX - rect.left) * canvas.width / rect.width,
                y: (event.clientY - rect.top) * canvas.height / rect.height
            })

            const x = Math.floor(pos.x / 32)
            const y = Math.floor(pos.y / 32)

            const list = map_index[getkey(x, y)]?.o.map(e => ({name: e.name, spr: e.sprite}))
            const tile = map[Math.floor(loc2tile(x, y))].spr

            list && postMessage({type: "click", list, tile})
        }

        onmessage = ({data}) => {
            if (data.type == "light")
                filter.uniforms.light = data.value

            if (data.type == "sat")
                filter.uniforms.sat = data.value

            if (data.type == "contrast")
                filter.uniforms.contrast = data.value

            if (data.type == "sharp")
                canvas.style.imageRendering = data.value ? "pixelated" : "auto"

            if (data.type == "arrow")
                store.arrows = data.value
        }

        jv.stage.filters = [filter]
        postMessage({type: "ready"})
    }

    if (document.readyState == "loading") {
        const map = window.Map
        let root, method, load

        Object.defineProperty(window, "jv", {
            get: () => root,

            set: value => {
                root = value

                Object.defineProperty(root, "ready", {
                    set: e => method = e,

                    get: () => () => {
                        method()
                        ready()
                    }
                })
            }
        })

        Object.defineProperty(window, "game_load", {
            set: e => load = e,

            get: () => () => {
                load()
                init()
            }
        })

        Object.defineProperty(window, "Map", {get: () => map})
    }

    else {
        init()
        ready()
    }

    // Object.defineProperty(window, "do_resize", {
    //     configurable: true,
    //     get: () => () => {}
    // })

    listen(window, "parse", data => postMessage({type: "parse", data}))
})()