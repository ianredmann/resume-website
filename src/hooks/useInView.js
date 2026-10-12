import { useEffect, useRef, useState } from 'react'

// Flips to true once the element scrolls into view (and stays true).
// startDelay holds observation back briefly so content that is already on
// screen at load doesn't reveal itself on top of the hero's own intro.
export function useInView({ threshold = 0.2, startDelay = 700 } = {}) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        let observer
        const timer = setTimeout(() => {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setInView(true)
                        observer.disconnect()
                    }
                },
                { threshold }
            )
            observer.observe(el)
        }, startDelay)
        return () => {
            clearTimeout(timer)
            observer?.disconnect()
        }
    }, [threshold, startDelay])

    return [ref, inView]
}
