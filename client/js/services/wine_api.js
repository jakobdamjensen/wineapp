import {wine} from '../models/wine';

var wineWrapper = {
	wrap(item){
		function getNameWithoutYear(item){
			var match = item.Name.match(/(.*)\s(\d{4})$/);
			return match ? match[1] : item.Name;
		}

		function getYearFromName(item){
			var match = item.Name.match(/\s(\d{4})$/);
			return match ? match[1] : 0;
		}

		return wine({
			name: getNameWithoutYear(item),
			year: getYearFromName(item),
			retailPrice: item.PriceRetail,
			highestRating: item.Ratings.HighestRating
		});
	}
};

const API_KEY = '06bfbef7d9ef00636951cb303e397bf3';
const BASE_PATH = 'http://services.wine.com/api/beta2/service.svc/json';

export var wineAPI = function ($http, $q) {
	var model = this;

	model.search = search;

	function search({query, offset}) {
		return $http.get(`${BASE_PATH}/catalog?apikey=${API_KEY}&type=wine&search=${query}`)
			.then((result) => {
				return result.data.Products.List.map((item) => wineWrapper.wrap(item));
			})
	}
};