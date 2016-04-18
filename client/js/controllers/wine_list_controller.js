export var wineListController = function(wineStore, $scope){
	var model = this;

	model.wines = [];

	$scope.$watch(() => wineStore.wines, (newval) => {
		model.wines = newval;
	});

	wineStore.all().then((wines) => model.wines = wines);


};