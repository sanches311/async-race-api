export default class Header {
    getHeader() {
        const html = `
        <header>
            <nav>
                <a href='/'><button>Garage</button></a>
                <a href='#winners'><button>Winners</button></a>     
            </nav>
        </header>
        `;
        return html;
    }
}
