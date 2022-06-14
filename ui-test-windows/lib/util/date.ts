export class DateUtil{  
    static milliOfDay:number=1000*60*60*24;
    public static getDateTime(date:Date):string{
        return Math.floor(date.getTime()/this.milliOfDay).toString();
    }
    public static getDate(dateTime:string):Date{
        return new Date(parseInt(dateTime)*this.milliOfDay);
    }
}