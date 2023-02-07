import Win from '../templates/win';
import Rest from '../app';
import { state } from '../state';
import { carImg } from '../../public/assets/img/carImg';
import { ICars } from '../interfaces/interface';
import { setColorImg } from '../utils';

export default class WinnersPage {
    rest = new Rest();
    async getWinnnerCars() {
        const page = Number(sessionStorage.getItem('pageWinners'));
        if (page) {
            state.winners.win = await (await this.rest.getWinners(page)).item;
            state.winners.count = await (await this.rest.getWinners(page)).count;
        } else {
            const page = Number(sessionStorage.setItem('pageWinners', '1'));
            state.winners.win = await (await this.rest.getWinners(page)).item;
            state.winners.count = await (await this.rest.getWinners(page)).count;
        }
        const cars = await this.rest.getCarsAll();
        if (state.winners.win !== undefined) {
            state.winners.win.map((winner) => {
                const { name, color } = cars.find((car: ICars) => car.id === winner.id);
                winner.name = name;
                winner.car = setColorImg(carImg, color);
            });
        }
    }
    async getWinnersHtml() {
        await this.getWinnnerCars();
        if (state.winners.win !== undefined) {
            return state.winners.win
                .map((winner) => new Win(winner))
                .map((item) => item.getWinnerHtml())
                .join(' ');
        }
    }

    async getPageWinnersHtml() {
        const listWinners = await this.getWinnersHtml();
        const html = `
        <div class='winners'>
        <div>
           <span>Winners: </span><span>${state.winners.count}</span>
        </div>
        <div>
            <span>Page: </span><span>${sessionStorage.getItem('pageWinners')}</span>
        </div>
        <div class='container-winners-table'>
        <div class='winners-pagination'>
            <button class='winners-pagination-prev'>Previous</button>        
        </div>
        <div class='winners-tab'>
            <table>
                <caption>Table winners race</caption>
                   <tr>
                   <td>Number</td><td>Car</td><td>Name</td><td>Count win</td><td>Best time</td>               
                   </tr>               
                   ${listWinners}               
            </table>
        </div>
            <div class='winners-pagination'>                
                <button class='winners-pagination-next'>Next</button>
            </div>
            </div>
        </div>
        `;
        return html;
    }
}
