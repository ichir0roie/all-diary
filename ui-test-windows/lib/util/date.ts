export class DateUtil{  
    public static milliOfDay:number=1000*60*60*24;

    public static getDayCount(date:Date):number{
        return Math.floor(date.getTime()/this.milliOfDay);
    }
    public static getDate(dayCount:number):Date{
        const date=new Date();
        date.setTime(Math.floor(dayCount)*this.milliOfDay);
        return date;
    }
}