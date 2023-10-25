export const getUTCTimeDate = () =>{
    const day = new Date();
    const utc = day.getTime() + (day.getTimezoneOffset() * 60 * 1000);
    return utc;
}