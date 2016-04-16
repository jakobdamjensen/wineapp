

//http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=06bfbef7d9ef00636951cb303e397bf3
export var wineStore = function($http, $q){

	function all(){
		return $q((resolve) => {
			setTimeout(() => resolve(JSON.parse(localStorage.getItem('wines'))));
		});
		/*return $http.get('http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=06bfbef7d9ef00636951cb303e397bf3')
			.then((result) => {
				localStorage.setItem('wines', JSON.stringify(result.data.Products.List));
				return result.data.Products.List;
			})*/
	}

	return {
		all
	}

};