import axios from "axios";
import moment, { now } from 'moment'
export const getWeather = async (nx:BigInt|Number,ny:BigInt|Number,row:BigInt|Number) => {
	const url = "";

	let setdaet = moment().format('YYYYMMDD');
	let date = new Date();
	let date_change = false;
	if(date.getUTCHours()+9>24&&date.getUTCHours()+9<31) 
	{
		setdaet = moment().subtract(1, 'day').format('YYYYMMDD');
		date_change = true;
	}
	var queryParams = '?' + encodeURIComponent('serviceKey') + '='+process.env["WEATHER_KEY"];
	queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
	queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(String(row)); 
	queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); 
	queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(setdaet); 
	queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500');
	queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(String(nx)); 
	queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(String(ny));
	const weather = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'+queryParams)
	return weather;

	// https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst
	// getUltraSrtNcst/key/...
	// GET 방식으로 입력.

	/**
	 * 
	 *  NodeJs 12 샘플 코드 

z

request({
		url: url + queryParams,
		method: 'GET'
}, function (error, response, body) {
		//console.log('Status', response.statusCode);
		//console.log('Headers', JSON.stringify(response.headers));
		//console.log('Reponse received', body);
});

FROM : https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084


결과코드	resultCode	2	필수	00	결과코드
결과메시지	resultMsg	50	필수	OK	결과메시지
한 페이지 결과 수	numOfRows	4	필수	10	한 페이지 결과 수
페이지 번호	pageNo	4	필수	1	페이지번호
전체 결과 수	totalCount	4	필수	3	전체 결과 수
데이터 타입	dataType	4	필수	XML	응답자료형식 (XML/JSON)
발표일자	baseDate	8	필수	20210628	‘21년 6월 28일 발표
발표시각	baseTime	4	필수	1200	12시00분 발표
예보지점 X 좌표	nx	2	필수	55	입력한 예보지점 X 좌표
예보지점 Y 좌표	ny	2	필수	127	입력한 예보지점 Y 좌표
자료구분코드	category	3	필수	LGT	자료구분코드
예측일자	fcstDate	8	필수	20210628	예측일자(YYYYMMDD)
예측시간	fcstTime	4	필수	1200	예측시간(HH24MI)
예보 값	fcstValue	2	필수	0	예보 값
	 */
}