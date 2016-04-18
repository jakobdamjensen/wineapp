import {wine} from '../models/wine';

var wineWrapper = {
	wrap({name, year, retailPrice, rating, id}){
		return wine({name, year, retailPrice, rating, id});
	}
};

/**
 * wineStore service handles all saving and retrieving of wine items from the local store.
 */

const WINES_KEY = 'wine_store__wines';
const NEW_WINE_ITEM_KEY = 'wine_store__new_wine_item';
const WINES_ID_KEY = 'wine_store__next_id';

export var wineStore = function ($http, $q) {
	var service = this;


	service.all = all;
	service.getSingle = getSingle;
	service.getNewItem = getNewItem;
	service.storeNewItem = storeNewItem;
	service.create = create;
	service.update = update;

	service.wines = [];

	function all() {
		return $q((resolve) => {
		 	setTimeout(() => {
				var wines = JSON.parse(localStorage.getItem(WINES_KEY));

				if( !wines ){
					wines = [];
				}

				service.wines = wines.map((item) => wineWrapper.wrap(item));

				resolve(service.wines);
			});
		 });
	}

	function getSingle(id) {
		return all()
			.then((wines) => wines.filter((wine) => wine.id() == id)[0]);
	}

	function create(item){
		return all()
			.then((wines) => {
				var newWine = wine({
					id: nextId(),
					name: item.name(),
					retailPrice: item.retailPrice(),
					rating: item.rating(),
					year: item.year()
				});

				wines.push(newWine);

				updateLocalStorage(wines);

				service.wines = wines;

				return newWine;
			})
	}

	function update(item){

	}

	function getNewItem(){
		return $q((resolve) => {
			setTimeout(() => {
				var newItemRaw = localStorage.getItem(NEW_WINE_ITEM_KEY);
				var newItem = wineWrapper.wrap(JSON.parse(newItemRaw));
				resolve(newItem);
			});
		});
	}

	function storeNewItem(item){
		return $q((resolve) => {
			setTimeout(() => {
				localStorage.setItem(NEW_WINE_ITEM_KEY, JSON.stringify(item.toJSON()));
				resolve(item);
			});
		});
	}

	function updateLocalStorage(wines){
		localStorage.setItem(WINES_KEY, JSON.stringify(wines.map((item) => item.toJSON())));
	}

	function nextId(){
		var id = localStorage.getItem(WINES_ID_KEY) || 0;

		localStorage.setItem(WINES_ID_KEY, ++id);

		return id;
	}
};