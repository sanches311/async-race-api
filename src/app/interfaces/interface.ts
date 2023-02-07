export interface ICars {
    name: string;
    color: string;
    id?: number;
}

export interface IState {
    garage: {
        page: number;
        cars?: Array<ICars> | null;
        count?: string | null;
    };
    winners: {
        win?: Array<IWin>;
        count?: number | null;
    };
    winner: {
        id?: number;
        name?: string;
        time?: number;
    };
}

export const ICarsModel = [
    { Volvo: Array<string> },
    { Lada: Array<string> },
    { Renault: Array<string> },
    { Citroen: Array<string> },
    { Polo: Array<string> },
    { Honda: Array<string> },
];

export interface IWin {
    id: number | null;
    wins: number | null;
    time: number | null;
    car?: string | null;
    name?: string | null;
}
export interface IWinnerRace {
    id?: number;
    time?: number;
    name?: string | null;
}
