"use strict"

/*
# XP

/- Skill mastery detection
/- Level up when exceeding skill mastery

- Does deleveling glitch it?
*/

const GEAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"/></svg>`
const CALC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm16 168a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM88 352a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM64 424c0-13.3 10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L88 448c-13.3 0-24-10.7-24-24zm232-24c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24z"/></svg>`
const CLOSE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c9.4-9.4 24.6-9.4 33.9 0l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>`
const NS = "http://www.w3.org/2000/svg"

const main = document.createElement("div")
const host = main.attachShadow({mode: "open"})
const ext = globalThis.browser ?? globalThis.chrome

class Popup {
    static windows = new Map()

    static open(base) {
        const existing = this.windows.get(base)

        if (existing)
            return existing

        const win = new base()

        this.windows.set(base, win)
        return win
    }

    constructor(width, height) {
        const drag = (event, edge) => {
            const x = event.clientX
            const y = event.clientY
            const rect = div.getBoundingClientRect()

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
                        const pos = Math.min(rect.right - width, left)

                        div.style.left = pos + "px"
                        div.style.width = rect.right - pos + "px"
                    }

                    if (edge.y == "top") {
                        const pos = Math.min(rect.bottom - height, top)

                        div.style.top = pos + "px"
                        div.style.height = rect.bottom - pos + "px"
                    }

                    if (edge.x == "right")
                        div.style.width = Math.min(Math.max(width, rect.width + dx), innerWidth - rect.left) + "px"

                    if (edge.y == "bottom")
                        div.style.height = Math.min(Math.max(height, rect.height + dy), innerHeight - rect.top) + "px"
                }

                else {
                    div.style.left = Math.min(left, innerWidth - rect.width) + "px"
                    div.style.top = Math.min(top, innerHeight - rect.height) + "px"
                }
            }

            event.target.setPointerCapture(event.pointerId)
            event.stopPropagation()
        }

        const div = document.createElement("div")
        const popups = host.getElementById("popups")

        div.innerHTML = `
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

<main>
    <div></div>
    <div></div>
</main>`

        div.querySelector(".left").onpointerdown = e => drag(e, {x: "left"})
        div.querySelector(".top").onpointerdown = e => drag(e, {y: "top"})
        div.querySelector(".right").onpointerdown = e => drag(e, {x: "right"})
        div.querySelector(".bottom").onpointerdown = e => drag(e, {y: "bottom"})
        div.querySelector(".tl").onpointerdown = e => drag(e, {x: "left", y: "top"})
        div.querySelector(".tr").onpointerdown = e => drag(e, {x: "right", y: "top"})
        div.querySelector(".bl").onpointerdown = e => drag(e, {x: "left", y: "bottom"})
        div.querySelector(".br").onpointerdown = e => drag(e, {x: "right", y: "bottom"})
        div.firstElementChild.onpointerdown = e => drag(e)

        div.querySelector("svg").onclick = () => {
            div.remove()
            this.constructor.windows.delete(this.constructor)
        }

        div.style.left = "50%"
        div.style.top = "50%"
        div.style.width = width + "px"
        div.style.height = height + "px"

        popups.appendChild(div)
        this.main = div.querySelector("main div:first-child")
        this.side = div.querySelector("main div:last-child")
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
        super(350, 200)

        const title = document.createElement("strong")
        const skills = document.createElement("div")

        this.render = () => skills.replaceChildren(...Object.entries(this.constructor.data).map(([key, item]) => {
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
                xp.textContent = "Total XP: " + Math.round(this.constructor.exp(item))
                hour.textContent = "XP/hr: " + Math.floor(item.rate)

                this.side.replaceChildren(title, total, xp, hour)
            }

            item.change = () => {
                const level = item.level + item.bar
                const base = Math.min(this.constructor.tier * 10, level)

                fade.setAttribute("width", level - base + "%")
                fade.setAttribute("x", base + "%")

                yellow.setAttribute("width", base - item.carns * 10 + "%")
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

        this.main.append(title, skills)
        this.constructor.window = this

        if (this.constructor.active)
            this.render()

        else {
            skills.textContent = "Please go to Character -> Skills"
        }
    }
}

function start() {
    const panel = host.getElementById("panel")

    onmessage = event => {
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
    }

    host.getElementById("calc").onclick = () => Popup.open(Skills)
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
        scrollbar-color: #888 transparent
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
        padding-bottom: .5em
    }

    #popups {
        > div {
            position: fixed;
            overflow: hidden;
            left: 50%;
            top: 50%;
            background-color: #222;
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
                    padding: 0 1em 1em 1em
                }

                > div:last-child {
                    padding: 0 1em 1em 1em;
                    flex: 0 0 14em;
                    border-left: 1px solid #333;

                    span {
                        display: block;
                        white-space: nowrap
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
            width: 1.5em;
            height: 1.5em
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
                <button id = calc title = "Skill calculator">${CALC}</button>
            </div>
        </div>
    </div>

    <button id = toggle>${GEAR}</button>
</div>

<div id = popups></div>`

    main.id = "overlay"
    script.src = ext.runtime.getURL("inject.js")

    document.getElementById("overlay")?.remove()
    document.readyState == "loading" ? addEventListener("DOMContentLoaded", load, {once: true}) : load()

    start()
}

init()

// {
//   "type": "skill",
//   "obj": {
//     "exploration": [
//       0, <- reincarnations
//       1, <- level
//       1, <- level (plus extras)
//       1 <- overall level (plus extras)
//     ]
//   },
//   "tier": 1
// }

// {
//   "type": "s",
//   "h": 79.49549001812753,
//   "f": 34.8,
//   "p": 155,
//   "k": 98.59,
//   "t": "exploration",
//   "b": [],
//   "e": 50.86046511627907,
//   "u": 0,
//   "q": 557
// }

// {
//   "type": "message",
//   "text": "<span style='color:#66ffff'>Your exploration skill is now level 4! Movement speed has increased.</span>"
// }

// {"type":"c","r":"ub","u":"hp"}