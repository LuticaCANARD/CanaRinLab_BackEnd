import  request  from "request"
export const getWeather = () => {
	const url = "";
	const config:request.CoreOptions= {
		//headers:
		body: {},
		method: "POST",
		json:true
	}
	request.post( url,config,(error, response, body)=>{

	})
}