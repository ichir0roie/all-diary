export class DateUtil{  
    static milliOfDay:number=1000*60*60*24;
    public static getDateTime(date:Date):string{
        return Math.floor(date.getTime()/this.milliOfDay).toString();
    }
    public static getDate(dateTime:string):Date{
        const date=new Date();
        date.setTime(parseInt(dateTime));
        return date;
    }
}