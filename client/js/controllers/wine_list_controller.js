export var wineListController = function(wineStore){
	var model = this;

	model.wines = [];

	wineStore.all().then((wines) => model.wines = wines);
};