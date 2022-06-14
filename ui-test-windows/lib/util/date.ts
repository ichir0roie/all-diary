export class DateUtil{  
    public static getDateTime(date:Date):string{
        return Math.floor(date.getTime()/1000/60/60/24).toString();
    }
}