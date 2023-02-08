import { state } from '../state';
import Rest from '../app';
import Track from '../templates/track';
import { carImg } from '../../public/assets/img/carImg';

export default class GaragePage {
    rest = new Rest();
    async getCarsHtml() {
        const page = Number(sessionStorage.getItem('page'));
        if (page) {
            state.garage.cars = await (await this.rest.getCars(page)).cars;
            state.garage.count = await (await this.rest.getCars(page)).count;
        } else {
            state.garage.cars = await (await this.rest.getCars(1)).cars;
            state.garage.count = await (await this.rest.getCars(1)).count;
        }

        return state.garage.cars
            ?.map((car) => new Track(car, carImg))
            .map((car) => car.getTrack())
            .join('');
    }
    async getPageGarageHtml() {
        const carsList = await this.getCarsHtml();
        let page = Number(sessionStorage.getItem('page'));
        if (!page) {
            page = 1;
        }

        const html = `
        <div id='garage'>
            <div class='control'>
                <div class='create'>
                    <input class='create-name' type='text'></input>
                    <input type='color'class='create-color'></input>
                    <button class='create-btn'>create</button>
                </div>
                <div class='update'>
                    <input class='update-name' type='text'></input>
                    <input type='color'class='update-color'></input>
                    <button class='update-btn'>update</button>
                </div> 
                <div class='remote'>
                    <button class='remote-race'>race</button>
                    <button class='remote-reset'>reset</button>
                    <button class='generate-btn'>generate cars</button>
                </div>               
            </div>
            <div id='info'>
                <div class='info-garage'>
                    <span>Garage</span><span id='count_cars'>${state.garage.count}</span>
                </div>
                <div class='info-page'>
                    <span>Page</span><span id='curr_page'>${page}</span>
                </div>
            </div>
            <div id='track'>
                ${carsList}
            </div> 
            <div class='pagination'>
                <button class='pagination-prev'>previos</button>
                <button class='pagination-next'>next</button>
            </div>                  
        </div>
        `;
        return html;
    }
}
