import {wineListController} from './controllers/wine_list_controller';

export var routes = function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('wines', {
			url: '/',
			views: {
				main: {
					templateUrl: '/client/views/wine_list.html',
					controller: wineListController,
					controllerAs: 'ctrl'
				}
			}
		});

	$urlRouterProvider.otherwise('/');
};