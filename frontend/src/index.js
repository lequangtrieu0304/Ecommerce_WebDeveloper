import Header from "./components/Header.js";
import DashBoardScreen from "./screens/DashBoardScreen.js";
import CartScreen from "./screens/CartSreen.js";
import ErrorScreen from "./screens/ErrorScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import { parseRequestUrl } from "./ultis.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import SummaryScreen from "./screens/SummaryScreen.js";
import ProductContentScreen from "./screens/ProductContentScreen.js";

const routes = {
    "/": HomeScreen,
    "/cart": CartScreen,
    "/shipping": ShippingScreen,
    "/orderplace": PlaceOrderScreen,
    "/order/:id": OrderScreen,
    "/login": LoginScreen,
    "/register": RegisterScreen,
    "/profile": ProfileScreen,
    "/admin": DashBoardScreen,
    "/product": ProductScreen,
    "/product/:id/edit": ProductEditScreen,
    "/summary": SummaryScreen,
    "/productcontent/:id": ProductContentScreen,
}

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') + 
                        (request.id ? '/:id' : '') + 
                        (request.verb ? `/${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : ErrorScreen;

    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    if(screen.after_render) await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);