import { useEffect, useState } from 'react'
import { countUp } from '../utils/countUp'

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Counts from 0 to `target` once `active` becomes true. Under reduced motion
// it shows the final value straight away.
export function useCountUp(target, active, { duration = 1200, decimal = false, delay = 0 } = {}) {
    const [value, setValue] = useState(decimal ? '0.0' : 0)
    const reduced = prefersReducedMotion()

    useEffect(() => {
        if (!active || reduced) return
        let cancel
        const timer = setTimeout(() => {
            cancel = countUp(setValue, target, duration, decimal)
        }, delay)
        return () => {
            clearTimeout(timer)
            cancel?.()
        }
    }, [active, reduced, target, duration, decimal, delay])

    if (reduced && active) return decimal ? target.toFixed(1) : target
    return value
}
