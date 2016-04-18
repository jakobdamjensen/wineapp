import {wine} from '../models/wine';

const MIN_QUERY_LENGTH = 3;

export var newWineController = function($scope, $state, wineAPI, wineStore){
	var form = this;

	form.searchQuery = '';

	form.newWine = {};
	form.wines = [];

	form.onItemSelected = onItemSelected;

	$scope.$watch(() => form.searchQuery, searchWineAPIForMatches);

	function onItemSelected(item){
		wineStore.storeNewItem(item).then(() => {
			$state.go('wines.new_wine_details');
		});
	}

	var queryTimestamp;
	function searchWineAPIForMatches(query) {
		if (!query || query.length < MIN_QUERY_LENGTH) {
			return;
		}
		form.newWine = wine({name: form.searchQuery});

		// set timestamp to test against when async request finishes
		var timestamp = queryTimestamp = Date.now();
		wineAPI.search({query})
			.then((results) => {
				if (timestamp === queryTimestamp) {
					form.wines = results
				}
			});
	};
};