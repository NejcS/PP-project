function loadGraph( scores ) {
	$(".graphContainer").highcharts({
		title: {
            text: 'Uspešnost zadnjih iger',
            x: -20 //center
        },
        subtitle: {
            text: 'Urejeno po času od najstarejšega rezultata do najnovejšega',
            x: -20
        },
        xAxis: {

        },
        yAxis: {
            title: {
                text: 'Število pravilnih odgovorov'
            },
            min: 0,
            max: 10,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Uspešnost',
            data: [5, 5, 7, 6, 6, 2, 2, 0, 5, 5, 4]
        }]
	});
};

$( document ).ready( function() {
	var scores = [];

	$.getJSON("/results").done(function(data) {
		data.forEach(function(rez) {
			if (rez && rez.result) scores.push(rez.result);
		});

		loadGraph( scores );
	});
});