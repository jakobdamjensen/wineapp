import {wineListController} from './controllers/wine_list_controller';
import {wineDetailsController} from './controllers/wine_details_controller';

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
		})
		.state('wines_details', {
			url: '/wines/:wineId',
			views: {
				main: {
					templateUrl: '/client/views/wine_details.html',
					controller: wineDetailsController,
					controllerAs: 'ctrl'
				}
			}
		});


	$urlRouterProvider.otherwise('/');
};