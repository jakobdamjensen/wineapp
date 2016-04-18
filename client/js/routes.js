import {wineListController} from './controllers/wine_list_controller';
import {wineDetailsController} from './controllers/wine_details_controller';
import {newWineController} from './controllers/new_wine_controller';
import {newWineDetailsController} from './controllers/new_wine_details_controller';

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
		.state('wines.new_wine', {
			url: 'wines/new',
			views: {
				modal: {
					templateUrl: '/client/views/new_wine_form.html',
					controller: newWineController,
					controllerAs: 'form'
				}
			}
		})
		.state('wines.new_wine_details', {
			url: 'wines/new_details',
			views: {
				modal: {
					templateUrl: '/client/views/new_wine_details_form.html',
					controller: newWineDetailsController,
					controllerAs: 'form'
				}
			}
		})
		.state('wines_edit', {
			url: 'wines/:wineId/edit',
			views: {
				main: {
					templateUrl: '/client/views/wine_details.html',
					controller: wineDetailsController,
					controllerAs: 'ctrl'
				}
			}
		})
		.state('wines.details', {
			url: 'wines/:wineId',
			views: {
				details: {
					templateUrl: '/client/views/wine_details.html',
					controller: wineDetailsController,
					controllerAs: 'ctrl'
				}
			}
		});


	$urlRouterProvider.otherwise('/');
};