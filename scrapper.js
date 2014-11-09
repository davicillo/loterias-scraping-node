var cheerio = require('cheerio');
var request = require('request');


var get_euromillones = function(startDate,endDate,cb){
	var url = 'http://www.loteriasyapuestas.es/es/buscador?startDate='+startDate+'&gameId=02&type=search&endDate='+endDate;
	var sorteo =[];
	request(url, function(err, resp, body) {
	    if (err)
	        throw err;
	    $ = cheerio.load(body);
	    $('.euromillones.cuerpoRegionInf .contenidoRegion').each(function(){
	    	var date = get_date($(this).find('.tituloRegion').text().trim().replace(/\s\s+/g, ' '));
	    	var resul = [];
	    	$(this).find('.cuerpoRegionIzq ul li').each(function(){
	    		resul.push($(this).text().trim());
	    	});
	    	$(this).find('.cuerpoRegionMed ul li').each(function(){
	    		resul.push($(this).text().trim());
	    	});
	    	sorteo[date]=resul;
	    });
	    cb(sorteo);
	});
}


get_date = function(titulo){
	months = {
	    'enero': 01,
	    'febrero': 02,
	    'marzo': 03,
	    'abril': 04,
	    'mayo': 05,
	    'junio': 06,
	    'julio': 07,
	    'agosto': 08,
	    'septiembre': 09,
	    'octubre': 10,
	    'noviembre': 11,
	    'diciembre': 12
	};
	var rePattern = new RegExp(/^Resultado del \w+ (\d+) de (\w+) de (\d{4})/);
	var arrMatches = titulo.match(rePattern);
	date = [];
	date[0] = arrMatches[1] < 10 ? '0'+arrMatches[1] : arrMatches[1];
	date[1] = months[arrMatches[2]];
	date[2] = arrMatches[3];
	return date.join("/");

}



var startDate = '05/10/2014';
var endDate = '07/11/2014';
var euromillones = [];

get_euromillones(startDate,endDate, function(sorteo){
	euromillones = sorteo;
	console.log('Euromillones');
	console.log(euromillones);
});


