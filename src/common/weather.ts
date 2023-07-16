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
	request.get( url,config,(error, response, body)=>{

	})
}