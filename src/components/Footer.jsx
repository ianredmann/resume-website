function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <p className="site-footer-text">© {year} Ian Redman. All rights reserved. · Built with React &amp; Vite · Deployed on GitHub Pages</p>
            </div>
        </footer>
    )
}

export default Footer
