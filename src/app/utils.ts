/* eslint-disable @typescript-eslint/no-explicit-any */
import { HEX } from './constants';
import { carsModel } from './constants';

export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateNameCar = (): string => {
    const objCars: any = carsModel[random(1, 3)];
    const brand = Object.keys(objCars)[0];
    const brandCarModels: string = objCars[brand];
    return `${brand} ${brandCarModels[random(0, brandCarModels.length - 1)]}`;
};

export const generateColor = (): string =>
    `#${HEX[random(0, 15)]}${HEX[random(0, 15)]}${HEX[random(0, 15)]}${HEX[random(0, 15)]}${HEX[random(0, 15)]}${
        HEX[random(0, 15)]
    }`;
export const setColorImg = (img: string, color: string): string => {
    const start = img.indexOf('fill:#');
    const end = img.indexOf(';', start);
    return `${img.slice(0, start)} fill:${color} ${img.slice(end)}`;
};
export const animateFinishLine = (id: number) => {
    const finish = document.getElementById(`finish-${id}`);
    const white = finish?.querySelectorAll('.white');
    const black = finish?.querySelectorAll('.black');
    white?.forEach((item) => {
        item.classList.add('white-reverse');
        item.addEventListener("animationend", () => item.classList.remove('white-reverse'));
    });
    black?.forEach((item) => {
        item.classList.add('black-reverse');
        item.addEventListener("animationend", () => item.classList.remove('black-reverse'));
    });
};
