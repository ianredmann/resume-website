// Eases `setter` from 0 to `target` over `duration` ms. Returns a cancel function.
export function countUp(setter, target, duration, isDecimal = false) {
    const start = performance.now()
    let raf
    function step(now) {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const value = eased * target
        setter(isDecimal ? value.toFixed(1) : Math.floor(value))
        if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
}
