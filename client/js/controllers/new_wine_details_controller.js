import {wine} from '../models/wine';

export var newWineDetailsController = function($scope, $state, wineAPI, wineStore){
	var form = this;

	form.newWine = {};
	form.onFormSubmit = onFormSubmit;

	wineStore.getNewItem().then((newItem) => {
		form.newWine = newItem.toJSON();
	});

	function onFormSubmit(){
		wineStore.create(wine(form.newWine))
			.then((newWineItem) => $state.go('wines_details', {wineId: newWineItem.id()}))
	}
};