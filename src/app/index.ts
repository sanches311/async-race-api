import '../style/app.scss';
import Route from './router';
import Render from './render';
import Listen from './listen';

const render = new Render();
const route = new Route();
const listen = new Listen();

render.renderHeader();
route.initRoute();
listen.init();
