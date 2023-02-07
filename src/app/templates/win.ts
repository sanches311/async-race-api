import { IWin } from '../interfaces/interface';

export default class Win {
    constructor(private winner: IWin) {
        this.winner = winner;
    }
    getWinnerHtml() {
        const html = `
            <tr>
                <td>${this.winner.id}</td><td><div class='winner-car-img'>${this.winner.car}</div></td><td>${this.winner.name}</td><td>${this.winner.wins}</td><td>${this.winner.time}</td>
            </tr>
        `;
        return html;
    }
}
