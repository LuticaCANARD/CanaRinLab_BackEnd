import  request  from "request"
export const getWeather = () => {
	const url = "";
	const config:request.CoreOptions= {
		//headers:
		body: {},
		method: "GET",
		json:true
	}
	// https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst
	// getUltraSrtNcst/key/...
	// GET 방식으로 입력.

	/**
	 * 
	 *  NodeJs 12 샘플 코드 


var request = require('request');

var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=서비스키';  Service Key
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); 
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML'); 
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20210628'); 
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0600');
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); 
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127');

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
});

FROM : https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084
	 */
	request.get( url,config,(error, response, body)=>{

	})
}