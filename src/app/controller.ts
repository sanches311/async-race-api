import GaragePage from './pages/garage';
import Render from './render';
import WinnersPage from './pages/winners';

export default class Controller {
    garagePage = new GaragePage();
    winnersPage = new WinnersPage();
    render = new Render();

    async garageRoute() {
        const html = await this.garagePage.getPageGarageHtml();
        this.render.render(html);
    }
    async winnersRoute() {
        const html = await this.winnersPage.getPageWinnersHtml();
        this.render.render(html);
    }
}
