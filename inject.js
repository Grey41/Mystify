(() => {
    "use strict"

    const listeners = []
    const send = () => listen(connection, "send", e => postMessage({type: "send", data: JSON.parse(e)}))

    const listen = (target, name, method) => {
        console.log(name)
        const base = target[name].bind(target)

        target[name] = (...args) => {
            base(...args)
            method(...args)
        }

        listeners.push(() => target[name] = base)
    }

    console.log("start")
    window._?.()

    window._ = () => {
        console.log("clean")
        listeners.forEach(e => e())
    }

    listen(window, "parse", data => postMessage({type: "parse", data}))
    connection ? send() : listen(window, "init_network", send)
})()