var wineWrapper = {
	wrap(item){
		return {
			id() {
				return item.Id;
			},
			name() {
				var match = item.Name.match(/(.*)\s(\d{4})$/);
				return match ? match[1] : item.Name;
			},
			year() {
				// Simple regex to extract the year from the name
				var match = item.Name.match(/\s(\d{4})$/);
				return match ? match[1] : 0;
			},
			retailPrice(){
				return item.PriceRetail;
			},
			rating(){
				return item.Ratings.HighestRating;
			}
		}
	}
};

//http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=06bfbef7d9ef00636951cb303e397bf3
export var wineStore = function ($http, $q) {

	function all() {
		/*return $q((resolve) => {
		 setTimeout(() => resolve(JSON.parse(localStorage.getItem('wines'))));
		 });*/
		return $http.get('http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=06bfbef7d9ef00636951cb303e397bf3&type=wine')
			.then((result) => {
				localStorage.setItem('wines', JSON.stringify(result.data.Products.List));
				return result.data.Products.List.map((item) => wineWrapper.wrap(item));
			})
	}

	function getSingle(id) {
		return $q((resolve) => {
			setTimeout(() => {
				var wines = JSON.parse(localStorage.getItem('wines'));
				var wineFound = wines.filter((wine) => wine.Id == id)[0];

				resolve(wineWrapper.wrap(wineFound));
			});
		});
	}

	return {
		all,
		getSingle
	}

};