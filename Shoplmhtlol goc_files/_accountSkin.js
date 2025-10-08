$.get('/assets/ajax/site/skinjson.php', function (data) {
	$('input[data-filter="tim-theo-trang-phuc"]').typeahead({
		source: data,
	    updater: function (item) {
	    	skin_str = item;
	        return item;
	    }
	});
}, "json");

$.get('/assets/ajax/site/championjson.php', function (data) {
	$('input[data-filter="tim-theo-tuong"]').typeahead({
		source: data,
	    updater: function (item) {
	    	champ_str = item;
	        return item;
	    }
	});
}, "json");