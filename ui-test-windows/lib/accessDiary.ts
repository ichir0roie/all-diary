import {Diary} from "~/lib/classes/models.ts";
import {CreateDemoData}from "~/lib/createDemoData.ts";


export class AccessDiary{
    cdd:CreateDemoData;
    constructor(){
        console.log("init ad.");
        this.cdd=new CreateDemoData();
    }

    // for initialize.
    public getRange(yearRange:number,dayRange:number):Array<Array<Diary>>{
        console.log("get range");
        let data:Array<Array<Diary>>=[];
        data=this.cdd.getRange(yearRange,dayRange);
        return data;
    }

    public getYearlyData(
        year:number,
        baseDate:Date,
        getRange:number
        ):Array<Diary>{
            console.log("get yearly")
        let data:Array<Diary>;//todo ?
        data=this.cdd.getYear(year,baseDate,getRange);
        return data;
    }
    
    // concept functions.
    // public getDaily(year:number,dayPosFrom:number,dayPosTo:number){}

    // functions conscious of RDB.
    public getDailyData(//TODO return ResultPackDaily
        years:Array<number>,
        getPositionFrom:number,
        getPositionSize:number,
        future:boolean
        ):Array<Array<Diary>>{
            console.log("get daily")
            let data=new Array<Array<Diary>>();
            data=this.cdd.getDailyData(years);
            return data;
    }
    
}
