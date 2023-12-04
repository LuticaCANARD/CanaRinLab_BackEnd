import axios from "axios";
import moment, { now } from 'moment'
export const getWeather = async (nx:BigInt|Number,ny:BigInt|Number,row:BigInt|Number,korean:boolean=true) => {
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
	
	/**
	* POP	강수확률	%	8
	PTY	강수형태	코드값	4
	PCP	1시간 강수량	범주 (1 mm)	8
	REH	습도	%	8
	SNO	1시간 신적설	범주(1 cm)	8
	SKY	하늘상태	코드값	4
	TMP	1시간 기온	℃	10
	TMN	일 최저기온	℃	10
	TMX	일 최고기온	℃	10
	UUU	풍속(동서성분)	m/s	12
	VVV	풍속(남북성분)	m/s	12
	WAV	파고	M	8
	VEC	풍향	deg	10
	WSD	풍속	m/s	10
	- 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
	- 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7) 
	(단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 
	- 초단기예보, 단기예보 강수량(RN1, PCP) 범주 및 표시방법(값)
	
	*/
	// fcstDate:fcstTime:category:fcstValue
	const red:Array<{
		baseDate:string,
		baseTime:string,
		fcstDate:string,
		fcstTime:string,
		fcstValue:string,
		nx:string,
		ny:string,
		category:string
	}> = weather.data.response.body["items"]["item"];
	const ret = {};
	red.forEach(f=>{
		if(ret[f.fcstDate]==undefined) ret[f.fcstDate]={};
		if(ret[f.fcstDate][f.fcstTime]==undefined) ret[f.fcstDate][f.fcstTime]={};
		if(korean==true && f.category=='SKY'){
			switch(f.fcstValue){
				case '1' : ret[f.fcstDate][f.fcstTime][f.category] ='맑음'; break;
				case '3' : ret[f.fcstDate][f.fcstTime][f.category] ='구름많음'; break;
				case '4' : ret[f.fcstDate][f.fcstTime][f.category] ='흐림'; break;
				default  : ret[f.fcstDate][f.fcstTime][f.category] ='?'; break;
			}
		}
		else if(korean==true&&f.category=='PTY'){
			switch(f.fcstValue){
				case '0' : ret[f.fcstDate][f.fcstTime][f.category] ='없음'; break;
				case '1' : ret[f.fcstDate][f.fcstTime][f.category] ='비'; break;
				case '2' : ret[f.fcstDate][f.fcstTime][f.category] ='비/눈'; break;
				case '3' : ret[f.fcstDate][f.fcstTime][f.category] ='눈'; break;
				case '4' : ret[f.fcstDate][f.fcstTime][f.category] ='소나기'; break;
				default  : ret[f.fcstDate][f.fcstTime][f.category] ='?'; break;
			}
		}
		else 
		ret[f.fcstDate][f.fcstTime][f.category] = f.fcstValue;
	})
		
	return ret;
	
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