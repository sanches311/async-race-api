export default class Modal {
    constructor(private nameCar: string, private time: number) {
        this.nameCar = nameCar;
        this.time = time;
    }
    getHtml() {
        const html = `
        <div id='modal'>
            <div class='modal-window'>${this.nameCar} was first time ${this.time} ms</div>
            <div></div>
        </div>
        `;
        return html;
    }
    render() {
        const modal = document.createElement('div');
        const root = document.getElementById('root');
        modal.id = 'moadl';
        const html = this.getHtml();
        modal.innerHTML = html;
        root!.append(modal);
    }
    remove() {
        document.addEventListener('click', () => {
            document.getElementById('modal')?.remove();
        });
    }
}
