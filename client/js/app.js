import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {wineStore} from './services/wine_store';
import {wineAPI} from './services/wine_api';

import {routes} from './routes';

var app = angular.module('wineApp', ['ui.router']);
app.config(routes);

app.service('wineStore', wineStore);
app.service('wineAPI', wineAPI);
