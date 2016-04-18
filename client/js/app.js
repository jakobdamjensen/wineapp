import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';


import {wineStore} from './services/wine_store';
import {wineAPI} from './services/wine_api';

import {routes} from './routes';

var app = angular.module('wineApp', ['ui.router', 'ngAnimate']);
app.config(routes);

app.service('wineStore', wineStore);
app.service('wineAPI', wineAPI);

