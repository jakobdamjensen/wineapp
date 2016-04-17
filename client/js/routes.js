import {wineListController} from './controllers/wine_list_controller';
import {wineDetailsController} from './controllers/wine_details_controller';
import {newWineController} from './controllers/new_wine_controller';

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
		.state('new_wine', {
			url: '/wines/new',
			views: {
				modal: {
					templateUrl: '/client/views/new_wine_form.html',
					controller: newWineController,
					controllerAs: 'form'
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