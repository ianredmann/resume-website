// Animated show/hide for expandable content. Shared by Projects and Experience
// so both disclosures open the same way.
export function Chevron({ open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`chevron${open ? ' open' : ''}`}
            aria-hidden="true"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    )
}

function Collapse({ open, id, children }) {
    return (
        <div id={id} className={`collapse${open ? ' open' : ''}`}>
            <div className="collapse-inner">{children}</div>
        </div>
    )
}

export default Collapse
