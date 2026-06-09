(() => {
    "use strict"

    const listeners = []
    const canvas = document.getElementById("jv")
    const send = () => listen(connection, "send", e => postMessage({type: "send", data: JSON.parse(e)}))

    const listen = (target, name, method) => {
        const base = target[name].bind(target)

        target[name] = (...args) => {
            base(...args)
            method(...args)
        }

        listeners.push(() => target[name] = base)
    }

    const load = e => {
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

        onmessage = ({data}) => {
            if (data.type == "light")
                filter.uniforms.light = data.value

            if (data.type == "sat")
                filter.uniforms.sat = data.value

            if (data.type == "contrast")
                filter.uniforms.contrast = data.value

            if (data.type == "sharp")
                canvas.style.imageRendering = data.value ? "pixelated" : "auto"
        }

        jv.stage.filters = [filter]
        postMessage({type: "ready"})
    }

    canvas.onpointerdown = event => {
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

    window._?.()
    window._ = () => listeners.forEach(e => e())

    listen(window, "parse", data => postMessage({type: "parse", data}))
    connection ? send() : listen(window, "init_network", send)
    jv.stage ? load() : addEventListener("load", load, {once: true})
})()