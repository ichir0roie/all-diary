import {Diary} from "./classes/Diary.ts"



export class AccessDiary{

    // for initialize.
    public getRange(years:Array<number>,dateFrom:Date,dateTo:Date):Array<Array<Diary>>{
        let data:Array<Array<Diary>>=[];

        return data;
    }

    public getYear(year:number,dateFrom:Date,dateTo:Date):Array<Diary>{
        let data:Array<Diary>=[];
        
        return data;
    }
    
    // concept functions.
    // public getDaily(year:number,dayPosFrom:number,dayPosTo:number){}

    // functions conscious of RDB.
    public getDailyData(
        years:Array<number>,
        getPositionFrom:number,
        getPositionSize:number,
        future:boolean
        ):{[year:number]:YearlyEdgeDiary}{
        let data:{[year:number]:YearlyEdgeDiary}={}

        return data;
    }
    
}


class YearlyEdgeDiary{
    public past:Array<Diary>;
    public future:Array<Diary>;
    constructor(past:Array<Diary>,future:Array<Diary>){
        this.past=past;
        this.future=future;
    }
}
