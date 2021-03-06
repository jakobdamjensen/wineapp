import {wine} from '../models/wine';

export var newWineDetailsController = function($scope, $state, wineAPI, wineStore){
	var form = this;

	form.newWine = {};
	form.onFormSubmit = onFormSubmit;

	wineStore.getNewItem().then((newItem) => {
		form.newWine = newItem.toJSON();
		form.newWine.rating = 3;
	});

	function onFormSubmit(){
		wineStore.create(wine(form.newWine))
			.then((newWineItem) => $state.go('wines.details', {wineId: newWineItem.id()}))
	}
};