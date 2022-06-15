import { Diary } from "./classes/models.ts";

export class AccessDiaryBase{
    baseDate:Date;
    constructor(){
        this.baseDate = new Date(
        new Date().toLocaleString("jp", { timeZone: "Asia/Tokyo" }),
      );
    }

    // for initialize.
    public getRange(yearRange:number,dayRange:number):Array<Array<Diary>>{
        console.log("get range");
        return new Array<Array<Diary>>();
    }

    public getYearlyData(
        year:number,
        baseDate:Date,
        getRange:number
        ):Array<Diary>|null{
            return null;
    }
    
    public getDailyData(//TODO return ResultPackDaily
        years:Array<number>,
        getPositionFrom:number,
        getPositionSize:number,
        future:boolean
        ):Array<Array<Diary>>|null{
            return null;
    }

}