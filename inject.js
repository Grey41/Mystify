(() => {
    "use strict"

    const SPRITES = {
        "misc/tile16": [0, 0, 256, 1024],
        "misc/item16": [256, 0, 256, 1024],
        "monsters/136": [512, 0, 168, 216],
        "monsters/138": [680, 0, 168, 208],
        "monsters/78": [848, 0, 120, 200],
        "monsters/130": [968, 0, 114, 192],
        "monsters/148": [1082, 0, 132, 192],
        "monsters/27": [1214, 0, 132, 192],
        "monsters/129": [1346, 0, 102, 176],
        "monsters/142": [512, 216, 108, 176],
        "monsters/144": [620, 216, 108, 176],
        "monsters/32": [728, 216, 48, 176],
        "monsters/35": [776, 216, 120, 176],
        "monsters/59": [896, 216, 72, 168],
        "monsters/74": [968, 216, 114, 168],
        "monsters/123": [1082, 216, 96, 160],
        "monsters/85": [1178, 216, 138, 160],
        "monsters/30": [1316, 216, 84, 152],
        "monsters/76": [1400, 216, 120, 152],
        "monsters/147": [512, 392, 90, 144],
        "monsters/54": [602, 392, 66, 144],
        "monsters/55": [668, 392, 66, 144],
        "monsters/57": [734, 392, 66, 144],
        "monsters/62": [800, 392, 72, 144],
        "monsters/77": [872, 392, 138, 144],
        "monsters/125": [1010, 392, 72, 140],
        "monsters/100": [1082, 392, 78, 136],
        "monsters/101": [1160, 392, 72, 136],
        "monsters/122": [1232, 392, 108, 136],
        "monsters/26": [1340, 392, 108, 136],
        "monsters/33": [1448, 392, 78, 136],
        "monsters/40": [1448, 0, 66, 136],
        "monsters/88": [512, 536, 120, 136],
        "monsters/90": [632, 536, 120, 136],
        "monsters/92": [752, 536, 120, 136],
        "monsters/93": [872, 536, 120, 136],
        "monsters/94": [992, 536, 120, 136],
        "monsters/95": [1112, 536, 120, 136],
        "monsters/96": [1232, 536, 72, 136],
        "monsters/97": [1304, 536, 72, 136],
        "monsters/98": [1376, 536, 72, 136],
        "monsters/99": [1448, 536, 72, 136],
        "monsters/107": [512, 672, 72, 128],
        "monsters/108": [584, 672, 54, 128],
        "monsters/118": [638, 672, 138, 128],
        "monsters/126": [776, 672, 54, 128],
        "monsters/127": [830, 672, 54, 128],
        "monsters/34": [884, 672, 108, 128],
        "monsters/43": [992, 672, 66, 128],
        "monsters/51": [1058, 672, 48, 128],
        "monsters/63": [1106, 672, 54, 128],
        "monsters/64": [1160, 672, 54, 128],
        "monsters/65": [1214, 672, 54, 128],
        "monsters/66": [1268, 672, 54, 128],
        "monsters/84": [1322, 672, 84, 128],
        "monsters/86": [1406, 672, 96, 128],
        "monsters/87": [512, 800, 66, 128],
        "monsters/10": [578, 800, 60, 120],
        "monsters/117": [638, 800, 96, 120],
        "monsters/119": [734, 800, 96, 120],
        "monsters/121": [830, 800, 96, 120],
        "monsters/128": [926, 800, 84, 120],
        "monsters/137": [1010, 800, 120, 120],
        "monsters/140": [1130, 800, 60, 120],
        "monsters/141": [1190, 800, 60, 120],
        "monsters/143": [1250, 800, 60, 120],
        "monsters/145": [1310, 800, 60, 120],
        "monsters/146": [1370, 800, 60, 120],
        "monsters/28": [1430, 800, 66, 120],
        "monsters/38": [0, 1024, 60, 120],
        "monsters/39": [60, 1024, 60, 120],
        "monsters/42": [120, 1024, 60, 120],
        "monsters/52": [180, 1024, 60, 120],
        "monsters/58": [240, 1024, 66, 120],
        "monsters/60": [306, 1024, 66, 120],
        "monsters/70": [372, 1024, 126, 120],
        "monsters/139": [498, 1024, 120, 112],
        "body/b1": [618, 1024, 54, 104],
        "body/b2": [672, 1024, 54, 104],
        "body/b3": [726, 1024, 54, 104],
        "body/b4": [780, 1024, 54, 104],
        "body/b5": [834, 1024, 54, 104],
        "body/b6": [888, 1024, 54, 104],
        "body/b7": [942, 1024, 54, 104],
        "body/b8": [996, 1024, 54, 104],
        "body/b9": [1050, 1024, 54, 104],
        "body/e1": [1104, 1024, 54, 104],
        "clothes/c10_a": [1158, 1024, 54, 104],
        "clothes/c10_b": [1212, 1024, 54, 104],
        "clothes/c11_a": [1266, 1024, 54, 104],
        "clothes/c11_b": [1320, 1024, 54, 104],
        "clothes/c12_a": [1374, 1024, 54, 104],
        "clothes/c12_b": [1428, 1024, 54, 104],
        "clothes/c13_a": [1482, 1024, 54, 104],
        "clothes/c13_b": [0, 1144, 54, 104],
        "clothes/c14_a": [54, 1144, 54, 104],
        "clothes/c14_b": [108, 1144, 54, 104],
        "clothes/c15_a": [162, 1144, 54, 104],
        "clothes/c15_b": [216, 1144, 54, 104],
        "clothes/c16_a": [270, 1144, 54, 104],
        "clothes/c16_b": [324, 1144, 54, 104],
        "clothes/c1_a": [378, 1144, 54, 104],
        "clothes/c1_b": [432, 1144, 54, 104],
        "clothes/c2_a": [486, 1144, 54, 104],
        "clothes/c2_b": [540, 1144, 54, 104],
        "clothes/c3_a": [594, 1144, 54, 104],
        "clothes/c3_b": [648, 1144, 54, 104],
        "clothes/c4_a": [702, 1144, 54, 104],
        "clothes/c4_b": [756, 1144, 54, 104],
        "clothes/c5_a": [810, 1144, 54, 104],
        "clothes/c6_a": [864, 1144, 54, 104],
        "clothes/c6_b": [918, 1144, 54, 104],
        "clothes/c7_a": [972, 1144, 54, 104],
        "clothes/c8_a": [1026, 1144, 54, 104],
        "clothes/c8_b": [1080, 1144, 54, 104],
        "clothes/c9_a": [1134, 1144, 54, 104],
        "clothes/c9_b": [1188, 1144, 54, 104],
        "hair/h10_a": [1242, 1144, 54, 104],
        "hair/h10_c": [1296, 1144, 54, 104],
        "hair/h11_a": [1350, 1144, 54, 104],
        "hair/h11_b": [1404, 1144, 54, 104],
        "hair/h12_a": [1458, 1144, 54, 104],
        "hair/h12_b": [0, 1248, 54, 104],
        "hair/h14_a": [54, 1248, 54, 104],
        "hair/h14_c": [108, 1248, 54, 104],
        "hair/h15_a": [162, 1248, 54, 104],
        "hair/h16_a": [216, 1248, 54, 104],
        "hair/h16_b": [270, 1248, 54, 104],
        "hair/h17_a": [324, 1248, 54, 104],
        "hair/h17_b": [378, 1248, 54, 104],
        "hair/h18_a": [432, 1248, 54, 104],
        "hair/h19_a": [486, 1248, 54, 104],
        "hair/h19_b": [540, 1248, 54, 104],
        "hair/h1_a": [594, 1248, 54, 104],
        "hair/h20_b": [648, 1248, 54, 104],
        "hair/h21_b": [702, 1248, 54, 104],
        "hair/h22_b": [756, 1248, 54, 104],
        "hair/h2_a": [810, 1248, 54, 104],
        "hair/h3_a": [864, 1248, 54, 104],
        "hair/h4_a": [918, 1248, 54, 104],
        "hair/h5_a": [972, 1248, 54, 104],
        "hair/h6_a": [1026, 1248, 54, 104],
        "hair/h6_b": [1080, 1248, 54, 104],
        "hair/h7_a": [1134, 1248, 54, 104],
        "hair/h8_a": [1188, 1248, 54, 104],
        "hair/h9_a": [1242, 1248, 54, 104],
        "monsters/1": [1296, 1248, 54, 104],
        "monsters/69": [1350, 1248, 96, 104],
        "monsters/73": [1446, 1248, 90, 104],
        "monsters/115": [0, 1352, 105, 100],
        "monsters/22": [105, 1352, 48, 100],
        "misc/edges": [153, 1352, 256, 96],
        "hair/h13_a": [409, 1352, 50, 96],
        "hair/h20_a": [459, 1352, 50, 96],
        "hair/h21_a": [509, 1352, 50, 96],
        "hair/h22_a": [559, 1352, 50, 96],
        "monsters/135": [609, 1352, 84, 96],
        "monsters/2": [693, 1352, 60, 96],
        "monsters/45": [753, 1352, 96, 96],
        "monsters/48": [849, 1352, 78, 96],
        "monsters/79": [927, 1352, 60, 96],
        "monsters/13": [987, 1352, 72, 88],
        "monsters/44": [1059, 1352, 90, 88],
        "monsters/47": [1149, 1352, 78, 88],
        "monsters/53": [1227, 1352, 48, 88],
        "monsters/6": [1275, 1352, 72, 88],
        "monsters/68": [1347, 1352, 90, 88],
        "monsters/7": [1437, 1352, 72, 88],
        "monsters/9": [512, 928, 72, 88],
        "monsters/131": [584, 928, 60, 80],
        "monsters/132": [644, 928, 60, 80],
        "monsters/133": [704, 928, 60, 80],
        "monsters/134": [764, 928, 60, 80],
        "monsters/14": [824, 928, 48, 80],
        "monsters/17": [872, 928, 48, 80],
        "monsters/19": [920, 928, 60, 80],
        "monsters/56": [980, 928, 48, 80],
        "monsters/67": [1028, 928, 60, 80],
        "monsters/71": [1088, 928, 78, 80],
        "monsters/75": [1166, 928, 48, 80],
        "monsters/8": [1214, 928, 54, 80],
        "monsters/82": [1268, 928, 66, 80],
        "monsters/111": [1334, 928, 54, 72],
        "monsters/50": [1388, 928, 78, 72],
        "monsters/72": [1466, 928, 48, 68],
        "monsters/102": [0, 1452, 48, 64],
        "monsters/103": [48, 1452, 48, 64],
        "monsters/104": [96, 1452, 48, 64],
        "monsters/105": [144, 1452, 48, 64],
        "monsters/106": [192, 1452, 48, 64],
        "monsters/109": [240, 1452, 48, 64],
        "monsters/11": [288, 1452, 48, 64],
        "monsters/110": [336, 1452, 48, 64],
        "monsters/112": [384, 1452, 48, 64],
        "monsters/113": [432, 1452, 48, 64],
        "monsters/114": [480, 1452, 48, 64],
        "monsters/116": [528, 1452, 48, 64],
        "monsters/12": [576, 1452, 48, 64],
        "monsters/120": [624, 1452, 48, 64],
        "monsters/124": [672, 1452, 48, 64],
        "monsters/15": [720, 1452, 48, 64],
        "monsters/16": [768, 1452, 48, 64],
        "monsters/18": [816, 1452, 48, 64],
        "monsters/20": [864, 1452, 48, 64],
        "monsters/21": [912, 1452, 48, 64],
        "monsters/23": [960, 1452, 48, 64],
        "monsters/24": [1008, 1452, 48, 64],
        "monsters/25": [1056, 1452, 48, 64],
        "monsters/29": [1104, 1452, 48, 64],
        "monsters/3": [1152, 1452, 48, 64],
        "monsters/31": [1200, 1452, 48, 64],
        "monsters/36": [1248, 1452, 48, 64],
        "monsters/37": [1296, 1452, 66, 64],
        "monsters/4": [1362, 1452, 48, 64],
        "monsters/41": [1410, 1452, 48, 64],
        "monsters/49": [1458, 1452, 48, 64],
        "monsters/5": [0, 1516, 48, 64],
        "monsters/61": [48, 1516, 48, 64],
        "monsters/80": [96, 1516, 48, 64],
        "monsters/81": [144, 1516, 42, 64],
        "monsters/83": [186, 1516, 42, 64],
        "monsters/89": [228, 1516, 48, 64],
        "monsters/91": [276, 1516, 48, 64],
        "monsters/46": [324, 1516, 60, 48],
        "misc/music_icon": [384, 1516, 32, 32],
        "misc/sound_icon": [416, 1516, 32, 32],
        "misc/star": [448, 1516, 16, 16],
        "misc/buffs": [464, 1516, 80, 8],
        "misc/chat_global": [544, 1516, 8, 8],
        "misc/chat_party": [552, 1516, 8, 8],
        "misc/chat_say": [560, 1516, 8, 8],
        "misc/chat_tell": [568, 1516, 8, 8],
        "misc/chat_tribe": [576, 1516, 8, 8]
    }

    const listeners = []
    const store = {arrows: []}
    const ptoi = e => e.replace(/^\/data\/|\.png.*$/g, "")

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
        const sprites = {}

        Object.defineProperty(window, "game_load", {
            get: () => () => {
                jv.retry_assets = []
                jv.init()

                jv.loading_container.visible = false
                jv.frame()
                init()

                PIXI.loader.add(jv.assets).load(() => {
                    jv.ready()
                    ready()
                })
            }
        })

        Object.defineProperty(window, "jv", {
            get: () => store.jv,

            set: value => {
                store.jv = value
                Object.defineProperty(value, "load", {get: () => e => jv.assets.push(...e.filter(e => !SPRITES[ptoi(e)]))})

                Object.defineProperty(value, "sprite", {
                    get: () => item => {
                        if (typeof item == "string") {
                            const frame = SPRITES[ptoi(item)]

                            if (frame)
                                return new PIXI.Sprite(sprites[item] ||= new PIXI.Texture(store.base, new PIXI.Rectangle(...frame)))

                            return new PIXI.Sprite.fromImage(item)
                        }

                        return new PIXI.Sprite(item)
                    }
                })

                Object.defineProperty(value, "spritesheet", {
                    set: e => store.spritesheet = e,

                    get: () => (path, width, height, scale = 1) => {
                        if (typeof path == "string") {
                            const name = ptoi(path)
                            const frame = SPRITES[name]

                            if (frame) {
                                const [x, y, w, h] = frame

                                const edges = name == "misc/edges"
                                const monster = width == 24 && height == 32 && w != 128
                                const result = []

                                const u = monster ? Math.floor(w / 3) : edges ? 16 : width
                                const v = monster ? Math.floor(h / 4) : edges ? 16 : height
                                const s = monster || edges ? 2 : scale

                                for (let a = 0; a < Math.floor(w / u); a ++) {
                                    result[a] = []

                                    for (let b = 0; b < Math.floor(h / v); b ++) {
                                        const texture = result[a][b] = new PIXI.Texture(store.base, new PIXI.Rectangle(x + a * u, y + b * v, u, v))

                                        texture.orig.width *= s
                                        texture.orig.height *= s
                                    }
                                }

                                return result
                            }
                        }

                        return store.spritesheet(path, width, height, scale)
                    }
                })
            }
        })

        addEventListener("DOMContentLoaded", () => {
            store.base = PIXI.BaseTexture.fromImage(document.getElementById("overlay").dataset.url)
            store.base.scaleMode = PIXI.SCALE_MODES.NEAREST
        }, {once: true})

        Object.defineProperty(window, "Map", {get: () => map})
    }

    else {
        init()
        ready()
    }

    // window.connection ? send() : listen(window, "init_network", send)
    listen(window, "parse", data => postMessage({type: "parse", data}))

    /*if (jv.stage) {
        load()
        ready()
    }

    else {
        const base = PIXI.BaseTexture.fromImage(document.currentScript.dataset.url)
        // const add = PIXI.loader.add
        // const from = PIXI.Sprite.fromImage

        // for (const name in SPRITES) {
        //     const [x, y, w, h] = SPRITES[name]
        //     const texture = new PIXI.Texture(base, new PIXI.Rectangle(x, y, w, h))

        //     // texture.baseTexture = texture
        //     PIXI.Texture.addToCache(texture, `/data/${name}.png${vt}`)
        // }

        jv.load = e => {
            console.log(e)
            jv.assets.push(...e.filter(e => !sprites[e]))
        }

        jv.sprite = item => {
            if (typeof item == "string") {
                if (item in sprites) {
                    const [x, y, w, h] = sprites[item].frame
                    return new PIXI.Sprite(sprites[item].texture ||= new PIXI.Texture(base, new PIXI.Rectangle(x, y, w, h)))
                }

                return new PIXI.Sprite.fromImage(item)
            }

            return new PIXI.Sprite(item)
        }

        // jv.spritesheet = (path, w, h) => {

        // }
        console.log("aaa", jv.spritesheet)

        addEventListener("load", () => load, {once: true})
        listen(jv, "ready", ready)
    }

    connection ? send() : listen(window, "init_network", send)
    // jv.stage ? load() : addEventListener("load", load, {once: true})*/
})()