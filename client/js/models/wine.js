import angular from 'angular';

export var wine = function (properties) {
	var clonedProperties = angular.copy(properties);
	var {name, year, retailPrice, rating, id, highestRating} = clonedProperties;

	return {
		id() {
			return id;
		},
		name() {
			return name;
		},
		year() {
			return year;
		},
		retailPrice(){
			return retailPrice;
		},
		rating(){
			return rating;
		},

		highestRating(){
			return highestRating;
		},

		toJSON(){
			return {name, year, retailPrice, rating, id, highestRating};
		}
	}
};