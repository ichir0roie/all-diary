import {Diary} from "~/lib/classes/diary.ts";
import * as RP from  "~/lib/classes/resultPacks.ts";
import {CreateDemoData}from "~/lib/createDemoData.ts";


export class AccessDiary{
    cdd:CreateDemoData;
    constructor(){
        this.cdd=new CreateDemoData();
    }

    // for initialize.
    public getRange(yearRange:number,dayRange:number):Array<Array<Diary>>{
        let data:Array<Array<Diary>>=[];
        data=this.cdd.getRange(yearRange,dayRange);
        return data;
    }

    public getYearlyData(
        year:number,
        baseDate:Date,
        getRange:number
        ):RP.ResultPackYearly{
        let data:RP.ResultPackYearly;
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
        ):{[year:number]:RP.ResultPackDaily}{
        let data:{[year:number]:RP.ResultPackDaily}={}

        return data;
    }
    
}
