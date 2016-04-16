export var wineDetailsController = function($stateParams, wineStore){
	var model = this;

	model.wine = [];

	wineStore.getSingle($stateParams.wineId).then((wine) => model.wine = wine);
};