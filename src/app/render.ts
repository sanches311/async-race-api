import Header from './header';
import Modal from './modal';

export default class Render {
    header = new Header();
    //modal = new Modal();

    renderHeader() {
        const header = document.createElement('header');
        const html = this.header.getHeader();
        header.innerHTML = html;
        document.body.prepend(header);
    }
    render(html: string) {
        const root = document.getElementById('root') as HTMLElement;
        root.innerHTML = html;
    }
    renderModal() {
        const window = document.createElement('div');
    }
}
