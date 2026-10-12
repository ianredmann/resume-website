import { useInView } from '../hooks/useInView'

// Fades its children up once, the first time they scroll into view.
// Used for every section so the whole site shares one entrance motion.
function Reveal({ className = '', delay = 0, threshold = 0.15, children, ...rest }) {
    const [ref, inView] = useInView({ threshold })
    return (
        <div
            ref={ref}
            className={`reveal${inView ? ' reveal-in' : ''}${className ? ` ${className}` : ''}`}
            style={delay ? { transitionDelay: `${delay}s` } : undefined}
            {...rest}
        >
            {children}
        </div>
    )
}

export default Reveal
