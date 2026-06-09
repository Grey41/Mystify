"use strict"

/*
# XP

- Does deleveling glitch it?
*/

const GEAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"/></svg>`
const CALC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm16 168a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM88 352a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM64 424c0-13.3 10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L88 448c-13.3 0-24-10.7-24-24zm232-24c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24z"/></svg>`
const CLOSE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c9.4-9.4 24.6-9.4 33.9 0l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>`
const FIRE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0 198.4 0 208 9.6 208 21.3l0 22.1c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7 384 434 306 512 209.7 512L192 512C86 512 0 426 0 320l0-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6 12.5 0 22.6 10.1 22.6 22.6L96 288c0 35.3 28.7 64 64 64s64-28.7 64-64l0-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7 0-27.7 9-54.8 25.6-76.9z"/></svg>`
const LAYER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 149.8C5.4 145.8 0 137.3 0 128s5.4-17.9 13.9-21.8L232.5 5.2zM48.1 218.4l164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 277.8C5.4 273.8 0 265.3 0 256s5.4-17.9 13.9-21.8l34.1-15.8zM13.9 362.2l34.1-15.8 164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 405.8C5.4 401.8 0 393.3 0 384s5.4-17.9 13.9-21.8z"/></svg>`
const NS = "http://www.w3.org/2000/svg"

const main = document.createElement("div")
const host = main.attachShadow({mode: "open"})
const ext = globalThis.browser ?? globalThis.chrome

const items = image("/data/misc/item16.png")
const tiles = image("/data/misc/tile16.png")

class Popup {
    static windows = new Map()
    static top = 0

    static open(base) {
        const existing = this.windows.get(base)

        if (existing) {
            const rect = existing.window.getBoundingClientRect()

            existing.focus()
            existing.window.style.left = Math.min(Math.max(rect.left, 0), innerWidth - rect.width) + "px"
            existing.window.style.top = Math.min(Math.max(rect.top, 0), innerHeight - rect.height) + "px"

            return existing
        }

        const win = new base()

        this.windows.set(base, win)
        return win
    }

    window = document.createElement("div")

    constructor(width, height, mw, mh) {
        const drag = (event, edge) => {
            const x = event.clientX
            const y = event.clientY
            const rect = this.window.getBoundingClientRect()

            event.target.onpointerup = event => {
                event.target.onpointermove = null
                event.target.releasePointerCapture(event.pointerId)
            }

            event.target.onpointermove = event => {
                const dx = event.clientX - x
                const dy = event.clientY - y

                const left = Math.max(rect.left + dx, 0)
                const top = Math.max(rect.top + dy, 0)

                if (edge) {
                    if (edge.x == "left") {
                        const pos = Math.min(rect.right - mw, left)

                        this.window.style.left = pos + "px"
                        this.window.style.width = rect.right - pos + "px"
                    }

                    if (edge.y == "top") {
                        const pos = Math.min(rect.bottom - mh, top)

                        this.window.style.top = pos + "px"
                        this.window.style.height = rect.bottom - pos + "px"
                    }

                    if (edge.x == "right")
                        this.window.style.width = Math.min(Math.max(mw, rect.width + dx), innerWidth - rect.left) + "px"

                    if (edge.y == "bottom")
                        this.window.style.height = Math.min(Math.max(mh, rect.height + dy), innerHeight - rect.top) + "px"
                }

                else {
                    this.window.style.left = Math.min(left, innerWidth - rect.width) + "px"
                    this.window.style.top = Math.min(top, innerHeight - rect.height) + "px"
                }
            }

            event.target.setPointerCapture(event.pointerId)
            event.stopPropagation()
        }

        this.window.innerHTML = `
<div>
    ${CLOSE}

    <div class = top></div>
    <div class = right></div>
    <div class = bottom></div>
    <div class = left></div>

    <div class = tl></div>
    <div class = tr></div>
    <div class = bl></div>
    <div class = br></div>
</div>

<main></main>`

        this.window.querySelector(".left").onpointerdown = e => drag(e, {x: "left"})
        this.window.querySelector(".top").onpointerdown = e => drag(e, {y: "top"})
        this.window.querySelector(".right").onpointerdown = e => drag(e, {x: "right"})
        this.window.querySelector(".bottom").onpointerdown = e => drag(e, {y: "bottom"})
        this.window.querySelector(".tl").onpointerdown = e => drag(e, {x: "left", y: "top"})
        this.window.querySelector(".tr").onpointerdown = e => drag(e, {x: "right", y: "top"})
        this.window.querySelector(".bl").onpointerdown = e => drag(e, {x: "left", y: "bottom"})
        this.window.querySelector(".br").onpointerdown = e => drag(e, {x: "right", y: "bottom"})

        this.window.firstElementChild.onpointerdown = e => drag(e)
        this.window.addEventListener("pointerdown", () => this.focus(), true)

        this.window.querySelector("svg").onclick = () => {
            this.window.remove()
            Popup.windows.delete(this.constructor)
        }

        this.window.style.left = innerWidth / 2 - width / 2 + "px"
        this.window.style.top = innerHeight / 2 - height / 2 + "px"
        this.window.style.width = width + "px"
        this.window.style.height = height + "px"

        this.main = this.window.lastElementChild
        host.getElementById("popups").appendChild(this.window)
    }

    focus() {
        this.window.style.zIndex = ++ Popup.top
    }
}

class Layer extends Popup {
    constructor() {
        super(150, 200, 150, 150)

        const main = document.createElement("div")
        const title = document.createElement("strong")
        const layers = document.createElement("div")

        const draw = spr => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")

            const x = Math.abs(spr) % 16
            const y = Math.floor(Math.abs(spr) / 16)

            canvas.width = 16
            canvas.height = 16
            ctx.drawImage(spr < 0 ? tiles : items, x * 16, y * 16, 16, 16, 0, 0, 16, 16)

            return canvas
        }

        this.render = () => {
            const main = document.createElement("div")

            layers.replaceChildren(...Layer.list.map(item => {
                const main = document.createElement("div")
                main.append(draw(item.spr), item.name)

                return main
            }).reverse(), main)

            main.appendChild(draw(-Layer.tile))
        }

        layers.id = "layers"
        title.textContent = "Tile Info"

        main.append(title, layers)
        this.main.appendChild(main)

        Layer.window = this
        Layer.list ? this.render() : layers.textContent = "Click on a tile to see extra information"
    }
}

class Settings extends Popup {
    static ready = ext.storage.local.get()
    static light = 1

    constructor() {
        super(350, 200, 200, 150)

        const range = name => {
            const label = main.querySelector("#" + name)

            label.lastElementChild.value = Settings[name]
            label.onchange = e => ext.storage.local.set({[name]: Settings[name] = Number(e.target.value)})
            label.oninput = e => postMessage({type: name, value: Number(e.target.value)})
        }

        const main = document.createElement("div")

        main.innerHTML = `
<strong>Settings</strong>

<button title = "The real 'fullscreen mode'">Toggle fullscreen</button>

<datalist id = marker>
    <option value = 1></option>
</datalist>

<label class = range id = light>Brightness<input type = range step = any max = 2 min = 0 list = marker></label>
<label class = range id = sat>Saturation<input type = range step = any max = 2 min = 0 list = marker></label>
<label class = range id = contrast>Contrast<input type = range step = any max = 2 min = 0 list = marker></label>

<label class = check id = sharp>Sharp rendering<input type = checkbox ${Settings.sharp ? "checked" : ""}></label>`

        range("light")
        range("sat")
        range("contrast")

        main.querySelector("#sharp").onchange = event => {
            postMessage({type: "sharp", value: event.target.checked})
            ext.storage.local.set({sharp: Settings.sharp = event.target.checked})
        }

        main.querySelector("button").onclick = () => document.fullscreenElement ? document.exitFullscreen?.() : document.body.requestFullscreen()
        main.id = "settings"
        this.main.appendChild(main)
    }
}

class Skills extends Popup {
    static data = {}
    static active = false
    static tier = 0

    static {
        setInterval(() => {
            for (const key in this.data) {
                const item = this.data[key]

                const exp = this.exp(item)
                const dx = Math.max(exp - item.xp, 0)

                item.rate = dx * 360
                item.xp = exp
                this.panel == key && item.change?.()
            }
        }, 1e4)
    }

    static update(obj, tier) {
        for (const key in obj) {
            const [r, l, e, t] = obj[key]
            const base = this.get(key)

            base.carns = r
            base.level = t - e + l
        }

        this.active = true
        this.tier = tier
        this.window?.render()
    }

    static get(key) {
        return this.data[key] ||= {carns: 0, level: 0, bar: 0, xp: 0, rate: 0, inc: false}
    }

    static bar(key, value) {
        const skill = this.get(key)
        const now = value / 100

        skill.bar > now && !skill.inc && (skill.level ++) // If message appears in chat, don't increase level.
        skill.bar = now
        skill.inc = false

        this.refresh(key)
    }

    static refresh(key) {
        if (!this.window) return

        const skill = this.data[key]
        skill.change ? skill.change() : this.active && this.window.render()
    }

    static exp(item) {
        return (item.level + item.bar) ** (10 / 3) - (item.carns * 10) ** (10 / 3)
    }

    constructor() {
        super(400, 200, 350, 150)

        const title = document.createElement("strong")
        const skills = document.createElement("div")

        const left = document.createElement("div")
        const right = document.createElement("div")

        this.render = () => skills.replaceChildren(...Object.entries(Skills.data).map(([key, item]) => {
            const name = key.replace(/\w\S*/g, e => e[0].toUpperCase() + e.substr(1).toLowerCase())
            const main = document.createElement("div")
            const title = document.createElement("span")

            const svg = document.createElementNS(NS, "svg")
            const fade = document.createElementNS(NS, "rect")
            const yellow = document.createElementNS(NS, "rect")
            const blue = document.createElementNS(NS, "rect")

            const panel = () => {
                const title = document.createElement("strong")
                const total = document.createElement("span")
                const xp = document.createElement("span")
                const hour = document.createElement("span")

                title.textContent = name
                total.textContent = "Total levels: " + Math.round((item.level + item.bar) * 1e3) / 1e3
                xp.textContent = "Total XP: " + Math.round(Skills.exp(item))
                hour.textContent = "XP/hr: " + Math.floor(item.rate)

                right.replaceChildren(title, total, xp, hour)
            }

            item.change = () => {
                const level = item.level + item.bar
                const base = Math.min(Skills.tier * 10, level)

                fade.setAttribute("width", level - base + "%")
                fade.setAttribute("x", base + "%")

                yellow.setAttribute("width", Math.max(base - item.carns * 10, 0) + "%")
                yellow.setAttribute("x", item.carns * 10 + "%")

                blue.setAttribute("width", item.carns * 10 + "%")
                title.textContent = name + ": " + Math.floor(Math.max(base, item.carns * 10) * 10) / 10
                this.panel == key && panel()
            }

            main.onclick = () => {
                this.panel = key
                panel()
            }

            fade.setAttribute("fill", "#888")
            fade.setAttribute("height", "100%")

            yellow.setAttribute("fill", "#fc0")
            yellow.setAttribute("height", "100%")

            blue.setAttribute("fill", "#2af")
            blue.setAttribute("height", "100%")

            svg.setAttribute("viewBox", "0 0 5760 576")
            svg.append(fade, yellow, blue)

            main.append(title, svg)
            item.change()

            return main
        }))

        title.textContent = "Skills"
        skills.id = "skills"

        this.main.append(left, right)
        left.append(title, skills)

        Skills.window = this
        Skills.active ? this.render() : skills.textContent = "Please go to Character -> Skills"
    }
}

function image(path) {
    const image = new Image()

    image.src = path

    return image
}

function start() {
    const panel = host.getElementById("panel")

    addEventListener("message", event => {
        const json = event.data.data

        if (event.data.type == "parse") {
            if (json.type == "message") {
                const match = json.text.match(/<span style='color:#66ffff'>Your (.+) skill is now level (\d+)\! .+ has increased\.<\/span>/)

                if (match) {
                    const [, key, level] = match
                    const item = Skills.get(key)

                    item.level = Number(level)
                    item.inc = true

                    Skills.refresh(key)
                }
            }

            if (json.type == "s" && json.t)
                Skills.bar(json.t, json.k)

            if (json.type == "skill")
                Skills.update(json.obj, json.tier)
        }

        if (event.data.type == "send") {
            if (json.type == "c" && json.r == "ub" && json.u == "star") {
                Skills.tier ++
                Skills.window?.render()
            }
        }

        if (event.data.type == "ready")
            Settings.ready.then(data => {
                postMessage({type: "light", value:  Settings.light = data.light ?? 1})
                postMessage({type: "sat", value: Settings.sat = data.sat ?? 1})
                postMessage({type: "contrast", value: Settings.contrast = data.contrast ?? 1})
                postMessage({type: "sharp", value: Settings.sharp = data.sharp ?? false})
            })

        if (event.data.type == "click") {
            Layer.list = event.data.list
            Layer.tile = event.data.tile
            Layer.window?.render()
        }
    })

    host.getElementById("calc").onclick = () => Popup.open(Skills)
    host.getElementById("gear").onclick = () => Popup.open(Settings)
    host.getElementById("map").onclick = () => Popup.open(Layer)
    host.getElementById("toggle").onclick = () => panel.classList.toggle("open")
}

function init() {
    const script = document.createElement("script")

    const load = () => {
        document.body.appendChild(main)
        document.documentElement.appendChild(script)

        script.remove()
    }

    host.innerHTML = `
<style>
    :host {
        font-size: 12px;
        font-family: verdana, sans-serif;
        color: #bbb;
        scrollbar-color: #888 transparent;
        user-select: none
    }

    * {
        box-sizing: border-box
    }

    svg {
        overflow: visible;
        fill: currentColor;
        display: block
    }

    strong {
        display: block;
        font-weight: normal;
        font-size: 1.2em;
        color: #fff;
        margin-bottom: 1em
    }

    #layers {
        display: flex;
        flex-direction: column;
        gap: .5em;

        div {
            color: #fff;
            display: flex;
            align-items: center;
            gap: 1em
        }

        canvas {
            width: 32px;
            height: 32px;
            border-radius: .5em;
            image-rendering: pixelated
        }
    }

    #settings {
        button {
            font: inherit;
            cursor: pointer;
            padding: .2em .5em;
            border: none;
            background-color: #333;
            border-radius: .5em;
            color: inherit;
            transition: .2s;

            &:hover {
                background-color: #555;
                color: #fff
            }
        }

        label {
            display: flex;
            max-width: 20em;
            margin: 1em 0
        }

        .check {
            align-items: center;

            input {
                margin: 0 0 0 auto;
                width: 3em;
                position: relative;
                -webkit-appearance: none;
                height: 1.2em;
                border-radius: 1em;
                outline: none;
                transition: .2s;
                cursor: pointer;
                background-color: #444;

                &:checked {
                    background-color: #2af !important;

                    &::after {
                        left: calc(100% - 1.5em - 2px);
                        background-color: #fff
                    }
                }

                &::after {
                    position: absolute;
                    content: "";
                    width: 1.5em;
                    left: 2px;
                    top: 2px;
                    border-radius: 1em;
                    height: calc(100% - 4px);
                    background-color: #888;
                    transition: .2s
                }
            }
        }

        .range {
            flex-direction: column;
            gap: .2em;

            input {
                -webkit-appearance: none;
                height: .5em;
                border-radius: 1em;
                background-color: #2af;
                width: 100%;
                margin: 0;

                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 1.5em;
                    height: 1em;
                    background-color: #fff;
                    border-radius: 1em
                }

                &::-moz-range-thumb {
                    width: 1.5em;
                    height: 1em;
                    border: none;
                    background-color: #fff;
                    border-radius: 1em
                }
            }
        }
    }

    #popups {
        > div {
            position: fixed;
            overflow: hidden;
            left: 50%;
            top: 50%;
            background-color: #111c;
            backdrop-filter: blur(5px);
            border: 1px solid #555;
            border-radius: 1em;
            display: flex;
            flex-direction: column;

            main {
                display: flex;
                flex: 1 1 0;
                min-height: 0;

                > div:first-child {
                    scrollbar-width: none;
                    overflow: auto;
                    flex: 1 1 0;
                    padding: 0 1em 1em 1em;

                    + div {
                        padding: 0 1em 1em 1em;
                        flex: 0 0 14em;
                        border-left: 1px solid #333;

                        span {
                            display: block;
                            white-space: nowrap
                        }
                    }
                }
            }

            > div:first-child {
                flex: 0 0 2em;

                div {
                    position: absolute
                }

                .top {
                    top: 0;
                    left: 0;
                    height: .5em;
                    width: 100%;
                    transform: translateY(-50%);
                    cursor: ns-resize
                }

                .left {
                    left: 0;
                    top: 0;
                    width: .5em;
                    height: 100%;
                    transform: translateX(-50%);
                    cursor: ew-resize
                }

                .bottom {
                    bottom: 0;
                    left: 0;
                    height: .5em;
                    width: 100%;
                    transform: translateY(50%);
                    cursor: ns-resize
                }

                .right {
                    right: 0;
                    top: 0;
                    width: .5em;
                    height: 100%;
                    transform: translateX(50%);
                    cursor: ew-resize
                }

                .tl {
                    left: 0;
                    top: 0;
                    width: 1em;
                    height: 1em;
                    cursor: nwse-resize
                }

                .tr {
                    right: 0;
                    top: 0;
                    width: 1em;
                    height: 1em;
                    cursor: nesw-resize
                }

                .bl {
                    left: 0;
                    bottom: 0;
                    width: 1em;
                    height: 1em;
                    cursor: nesw-resize
                }

                .br {
                    right: 0;
                    bottom: 0;
                    width: 1em;
                    height: 1em;
                    cursor: nwse-resize
                }

                svg {
                    position: absolute;
                    top: 1em;
                    right: 1em;
                    width: 1.2em;
                    height: 1.2em;
                    transform: translate(50%, -50%);
                    cursor: pointer;
                    color: #888;
                    transition: .2s;

                    &:hover {
                        color: #fff
                    }
                }
            }
        }
    }

    #panel {
        position: fixed;
        left: 1em;
        bottom: 1em;
        border-radius: 2em;
        background-color: #222;

        svg {
            width: 2em;
            height: 2em
        }

        button {
            font: inherit;
            padding: .5em;
            border: none;
            background: none;
            cursor: pointer;
            color: #aaa;
            transition: .2s;
            border-radius: 2em;

            &:hover {
                color: #fff;
                background-color: #333
            }
        }

        > button {
            background-color: #333
        }

        &.open > div {
            grid-template-rows: 1fr
        }

        > div {
            display: grid;
            grid-template-rows: 0fr;
            transition: .2s;

            > div {
                overflow: hidden;

                > div {
                    display: flex;
                    flex-direction: column
                }
            }
        }
    }

    #skills > div {
        display: grid;
        grid-template-columns: 10em auto;
        cursor: pointer;
        transition: .2s;

        &:hover {
            color: #fff
        }

        svg {
            height: 1.5em
        }

        rect {
            clip-path: url(#clip)
        }
    }
</style>

<svg>
    <defs>
        <path id = stars d = "M309.5-18.9 383 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L441.7 305.9 467 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9L19.9 191.4c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4L266.7-18.9c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L959 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L1017.7 305.9 1043 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2L864.1 417.6 719.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9L595.9 191.4c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4L842.7-18.9c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L1535 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L1593.7 305.9 1619 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2l-144.3-73.4L1295.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9-114.4-114.5c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L2111 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L2169.7 305.9 2195 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2l-144.3-73.4L1871.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9-114.4-114.5c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L2687 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L2745.7 305.9 2771 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2l-144.3-73.4L2447.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9-114.4-114.5c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L3263 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L3321.7 305.9 3347 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2l-144.3-73.4L3023.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9-114.4-114.5c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L3839 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L3897.7 305.9 3923 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2l-144.3-73.4L3599.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9-114.4-114.5c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L4415 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L4473.7 305.9 4499 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2l-144.3-73.4L4175.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9-114.4-114.5c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L4991 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L5049.7 305.9 5075 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2l-144.3-73.4L4751.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9-114.4-114.5c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Zm576 0L5567 125.3l159.8 25.4c9 1.4 16.3 7.7 19.1 16.3s.6 18-5.8 24.4L5625.7 305.9 5651 465.8c1.4 9-2.3 17.9-9.6 23.2s-17 6.1-25 2l-144.3-73.4L5327.7 491c-8.1 4.1-17.7 3.3-25-2s-11-14.3-9.6-23.2l25.2-159.9-114.4-114.5c-6.3-6.4-8.6-15.8-5.8-24.4s10.2-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1Z"/>

        <clipPath id = clip>
            <use href = #stars></use>
        </clipPath>
    </defs>
</svg>

<div id = select></div>

<div id = panel>
    <div>
        <div>
            <div>
                <button id = map title = "Map selector">${LAYER}</button>
                <button id = calc title = "Skill calculator">${CALC}</button>
                <button id = gear title = Settings>${GEAR}</button>
            </div>
        </div>
    </div>

    <button id = toggle>${FIRE}</button>
</div>

<div id = popups></div>`

    main.id = "overlay"
    script.src = ext.runtime.getURL("inject.js")

    document.getElementById("overlay")?.remove()
    document.readyState == "loading" ? addEventListener("DOMContentLoaded", load, {once: true}) : load()

    start()
}

init()