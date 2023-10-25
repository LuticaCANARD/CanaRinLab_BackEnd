import axios from "axios";
import {isKoreanHoliday} from '../Utils/get_holiday'
import {getUTCTimeDate} from '../Utils/getutc'
export const getRailwayTimeTable = async (opecode:string,line_code:string,stn_code:string,day:'normal'|'holiday'|'saturday'|'today') =>
{

    let daycode = 0;
    switch(day){
        case 'normal' :  daycode = 8; break;
        case 'holiday' : daycode = 7; break;
        case 'saturday' : daycode = 9;break;
        case 'today' :{
            const dt = getUTCTimeDate();
            const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
            const kr_curr = new Date(dt + (KR_TIME_DIFF));
            const holiday = isKoreanHoliday(kr_curr);
            if(holiday)  daycode = 7;
            else if(kr_curr.getDay()==6) daycode = 9;
            else daycode = 8;
        };
        break;
    }
    let query = 'serviceKey='+process.env['RAILWAY_KEY'];
    query += '&' + 'format=json';
    query += '&' + 'railOprIsttCd='+encodeURIComponent(opecode);
    query += '&' + 'lnCd='+encodeURIComponent(line_code);
    query += '&' + 'dayCd=' + encodeURIComponent(daycode);
    query += '&' + 'stinCd=' + encodeURIComponent(stn_code);
    const req_url = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationTimetable?'+query;
    return await axios.get(req_url)
}