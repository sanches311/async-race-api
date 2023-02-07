import Controller from './controller';

const controller = new Controller();

export default class Route {
    handleHash(): void {
        const hash = window.location.hash.slice(1);
        const route = `${hash}Route`;

        switch (route) {
            case 'Route':
                controller.garageRoute();
                break;
            case 'winnersRoute':
                controller.winnersRoute();
                break;
            default:
                console.log('page not found');
                break;
        }
    }
    initRoute(): void {
        addEventListener('hashchange', this.handleHash);
        this.handleHash();
    }
}
