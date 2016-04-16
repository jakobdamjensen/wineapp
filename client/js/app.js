import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {wineStore} from './services/wine_store';

import {routes} from './routes';

var app = angular.module('wineApp', ['ui.router']);
app.config(routes);

app.service('wineStore', wineStore);
