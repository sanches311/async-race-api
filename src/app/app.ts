import { ICars, IWin } from './interfaces/interface';
export default class Rest {
    baseURl = 'http://127.0.0.1:3000';
    path = {
        garage: '/garage',
        winners: '/winners',
        engine: '/engine',
    };
    getCar = async (id: number) => {
        const response = await fetch(`${this.baseURl}${this.path.garage}/${id}`);
        const car = await response.json();
        return car;
    };
    getCars = async (page: number) => {
        const response = await fetch(`${this.baseURl}${this.path.garage}?_page=${page}&_limit=7`);
        const cars = await response.json();
        const count = response.headers.get('X-Total-Count');
        return {
            cars,
            count,
        };
    };
    getCarsAll = async () => {
        const response = await fetch(`${this.baseURl}${this.path.garage}`);
        const data = await response.json();
        return data;
    };
    createCar = async (data: ICars) => {
        const response = await fetch(`${this.baseURl}${this.path.garage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    };
    deleteCarGarage = async (id: number) => {
        const response = await fetch(`${this.baseURl}${this.path.garage}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    };
    deleteCarWinner = async (id: number) => {
        const response = await fetch(`${this.baseURl}${this.path.winners}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    };
    updateCar = async (id: number, data: ICars) => {
        const response = await fetch(`${this.baseURl}${this.path.garage}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };
    carStart = async (id: number) => {
        const response = await fetch(`${this.baseURl}${this.path.engine}?id=${id}&status=started`, {
            method: 'PATCH',
        });
        const data = await response.json();
        return data;
    };
    carStop = async (id: number) => {
        const response = await fetch(`${this.baseURl}${this.path.engine}?id=${id}&status=stopped`, {
            method: 'PATCH',
        });
        const data = await response.json();
        return data;
    };
    carDrive = async (id: number) => {
        const response = await fetch(`${this.baseURl}${this.path.engine}?id=${id}&status=drive`, {
            method: 'PATCH',
        });
        if (response.status === 200) return await response.json();
        return { success: false };
    };
    getWinners = async (page: number) => {
        const response = await fetch(`${this.baseURl}${this.path.winners}/?_page=${page}&_limit=${10}`);
        const data = await response.json();
        const count = Number(response.headers.get('X-Total-Count'));
        return {
            item: data,
            count: count,
        };
    };
    getWinnersAll = async () => {
        const response = await fetch(`${this.baseURl}${this.path.winners}`);
        const data = await response.json();
        return data;
    };
    deleteWinner = async (id: number) => {
        const response = await fetch(`${this.baseURl}${this.path.winners}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    };
    addWinner = async (data: IWin) => {
        const response = await fetch(`${this.baseURl}${this.path.winners}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    };
    updateWinner = async (id: number, data: IWin) => {
        const response = await fetch(`${this.baseURl}${this.path.winners}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    };
}
