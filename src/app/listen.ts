import Rest from './app';
import { state } from './state';
import GaragePage from './pages/garage';
import Render from './render';
import { generateNameCar, generateColor } from './utils';
import Animate from './animate';
import { IWin } from './interfaces/interface';
import WinnersPage from './pages/winners';

const garagePage = new GaragePage();

const rest = new Rest();
const render = new Render();

export default class Listen {
    winnersPage = new WinnersPage();
    init() {
        this.createCar();
        this.deleteCar();
        this.selectCar();
        this.updateCar();
        this.generateCars();
        this.switchPage();
        this.startEngine();
        this.StopCar();
        this.startRace();
        this.resetRace();
    }
    createCar() {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target!.closest('.create-btn')) {
                const parent = document.querySelector('.create') as HTMLElement;
                const name = parent.children[0] as HTMLInputElement;
                const color = parent.children[1] as HTMLInputElement;
                await rest.createCar({
                    name: name.value,
                    color: color.value,
                });
                const html: string = await garagePage.getPageGarageHtml();
                render.render(html);
            }
        });
    }
    deleteCar() {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.edit-remove')) {
                const carId = Number(target.id.slice(12));
                await rest.deleteCarGarage(carId);
                const winners = await (await rest.getWinnersAll()).item;
                console.log(winners);
                const winner = winners!.find((winner: IWin) => winner.id === carId);
                if (winner) {
                    await rest.deleteCarWinner(carId);
                }
                const html: string = await garagePage.getPageGarageHtml();
                render.render(html);
            }
        });
    }
    selectCar() {
        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.edit-select')) {
                const carId = Number(target.id.slice(12));
                const parent = document.querySelector('.update') as HTMLElement;
                const name = parent.children[0] as HTMLInputElement;
                const color = parent.children[1] as HTMLInputElement;
                const car = state.garage.cars?.find((car) => car.id === carId);
                const selects = document.querySelectorAll('.edit-select');
                const selectCur = document.getElementById(`edit-select-${carId}`);
                selects.forEach((select) => {
                    if (selectCur!.id !== select.id) {
                        select.classList.remove('select');
                    }
                });
                selectCur!.classList.toggle('select');
                if (car!.name) {
                    name.value = car!.name;
                }
                if (car!.color) {
                    color.value = car!.color;
                }
            }
        });
    }
    updateCar() {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target!.closest('.update-btn')) {
                const select = document.querySelector('.select');
                if (select) {
                    const carId = Number(select.id.slice(12));
                    const parent = document.querySelector('.update') as HTMLElement;
                    const name = parent.children[0] as HTMLInputElement;
                    const color = parent.children[1] as HTMLInputElement;
                    await rest.updateCar(carId, { name: name.value, color: color.value });
                    const html: string = await garagePage.getPageGarageHtml();
                    render.render(html);
                }
            }
        });
    }
    generateCars() {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.generate-btn')) {
                for (let i = 0; i < 100; i++) {
                    const name = generateNameCar();
                    const color = generateColor();
                    await rest.createCar({
                        name: name,
                        color: color,
                    });
                }
                const html: string = await garagePage.getPageGarageHtml();
                render.render(html);
            }
        });
    }
    switchPage() {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.pagination-next')) {
                const pageCur = Number(sessionStorage.getItem('page'));
                const pageMax = Math.ceil(Number(state.garage.count) / 7);
                if (pageCur !== pageMax) {
                    sessionStorage.setItem('page', String(pageCur + 1));
                    const html: string = await garagePage.getPageGarageHtml();
                    render.render(html);
                }
            }
            if (target.closest('.pagination-prev')) {
                const pageCur = Number(sessionStorage.getItem('page'));
                if (pageCur !== 1) {
                    sessionStorage.setItem('page', String(pageCur - 1));
                    const html: string = await garagePage.getPageGarageHtml();
                    render.render(html);
                }
            }
        });
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.winners-pagination-next')) {
                const pageCur = Number(sessionStorage.getItem('pageWinners'));
                const pageMax = Math.ceil(Number(state.winners.count) / 10);
                if (pageCur !== pageMax) {
                    sessionStorage.setItem('pageWinners', String(pageCur + 1));
                    this.winnersPage.getPageWinnersHtml().then((resp) => {
                        render.render(resp);
                    });
                }
            }
            if (target.closest('.winners-pagination-prev')) {
                const pageCur = Number(sessionStorage.getItem('pageWinners'));
                if (pageCur !== 1) {
                    sessionStorage.setItem('pageWinners', String(pageCur - 1));
                    this.winnersPage.getPageWinnersHtml().then((resp) => {
                        render.render(resp);
                    });
                }
            }
        });
    }
    startEngine() {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.control-start')) {
                const id = Number(target.id.slice(14));
                document.getElementById(`control-stop-${id}`)?.removeAttribute('disabled');
                target.setAttribute('disabled', 'true');
                const { velocity, distance } = await rest.carStart(id);
                const car = document.getElementById(`car-model-${id}`)?.childNodes[3] as SVGAElement;
                const animate = new Animate(car, distance, velocity);
                animate.animate(animate.timing, animate.draw, id);
            }
        });
    }
    StopCar() {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.control-stop')) {
                const id = Number(target.id.slice(13));
                document.getElementById(`control-start-${id}`)?.removeAttribute('disabled');
                target.setAttribute('disabled', 'true');
                await rest.carStop(id);
            }
        });
    }
    startRace() {
        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const rest = new Rest();
            if (target.closest('.remote-race')) {
                const carsArr = [];
                let countCarEndRace = 0;
                const winnerRace: IWin = {
                    id: null,
                    wins: null,
                    time: null,
                };
                const cars = document.querySelectorAll('.car-img');
                for (const car of cars) {
                    carsArr.push(car);
                }
                carsArr.map(async (item) => {
                    const id = Number(item.id.slice(10));
                    const { velocity, distance } = await rest.carStart(id);
                    const name = document.getElementById(`car-name-${id}`)!.textContent;
                    const duration = distance / velocity;
                    const car = item.childNodes[3] as SVGAElement;
                    const animate = new Animate(car, distance, velocity);
                    animate.animate(animate.timing, animate.draw, id);
                    rest.carDrive(id).then((resp) => {
                        animate.success = resp.success;
                        countCarEndRace += 1;
                        if (resp.success === true) {
                            if (!winnerRace.time) {
                                winnerRace.time = Number(duration.toFixed(0));
                                winnerRace.id = id;
                            } else if (winnerRace.time > duration) {
                                winnerRace.time = Number(duration.toFixed(0));
                                winnerRace.id = id;
                            }
                        }
                        if (carsArr.length === countCarEndRace) {
                            rest.getWinnersAll().then((resp) => {
                                console.log(resp);
                                const winner = resp.find((winnner: IWin) => winnner.id === winnerRace.id);
                                if (winner) {
                                    rest.updateWinner(winnerRace.id!, {
                                        id: winnerRace.id,
                                        time: winnerRace.time,
                                        wins: winner.wins + 1,
                                    });
                                } else {
                                    const data = { id: winnerRace.id, time: winnerRace.time, wins: 1 };
                                    rest.addWinner(data);
                                }
                            });
                        }
                    });
                });
            }
        });
    }
    resetRace() {
        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.remote-reset')) {
                const cars = document.querySelectorAll('.car-img');
                const carsArr = [];
                for (const car of cars) {
                    carsArr.push(car);
                }
                carsArr.forEach(async (item) => {
                    const car = item.childNodes[3] as SVGAElement;
                    car.style.left = '0px';
                });
            }
        });
    }
}
