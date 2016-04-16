export var wineStore = function($q){

	var wines = [{
		name: 'lala'
	}];

	function all(){
		return $q((resolve) => {
			setTimeout(() => resolve(wines));
		});
	}

	return {
		all
	}

};