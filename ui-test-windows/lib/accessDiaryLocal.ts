import { Diary } from "~/lib/classes/models.ts";
import { AccessDiaryBase } from "~/lib/accessDiaryBase.ts";

import{DateUtil}from "~/lib/util/date.ts";

export class AccessDiaryLocal extends AccessDiaryBase{
    public data=new Map<number,Map<string,Diary>>();


    override getRange(yearRange:number,dayRange:number):Array<Array<Diary>>{
        let ret= new Array<Array<Diary>>();
        
        for(let y=0;y<yearRange-1;y++){
            const ty=this.baseDate.getFullYear()-y;
            let data=this.getDiaryData(ty);
            data=new Map(
                [...data.entries()].sort(
                    (a,b)=>Math.abs(parseInt(b[0])-parseInt(a[0]))
                )
                );
            let ta=new Array<Diary>();
            let values=Array.from( data.values());
            for(var l=0;l<dayRange;l++){
                if (values[l]!=undefined)ta.push(values[l]);
            }
            ret.push(ta);
        }

        return ret;
    }

    public getDiaryData(year:number):Map<string,Diary>{
        const key="diary"+year.toString();
        const mapString:string|null=localStorage.getItem(key);
        if (mapString==null)return new Map<string,Diary>();
        if(mapString=="{}")return new Map<string,Diary>();
        let json=JSON.parse(mapString) ;
        console.log(json);
        let data:Map<string,Diary>=new Map(Object.entries(json["body"])) ;
        return data;
    }
    public getDiaryToday():Diary{
        let d=this.getDiary(this.baseDate);
        console.log(d);
        if(d==null){
            return new Diary(null,this.baseDate,"");
        }else{
            return d;
        }
        
    }
    public getDiary(date:Date):Diary|null{
        
        this.data.get(date.getFullYear())?.forEach((v:Diary,time:string)=>{
            if  (
                // time==this.getDateTime(date)
                time==DateUtil.getDateTime(date)
                ){
                return  v;
            }
        });
        return null;
    }

    //this is dangerous method.
    public setDiaryYearly(year:number,map:Map<string,Diary>){
        const key:string="diary"+year;
        localStorage.setItem(key,JSON.stringify({body:Object.fromEntries(map)}));
    }

    public setDiary(diary:Diary){
        const key:string="diary"+diary.date.getFullYear();
        let data:Map<string,Diary>=this.getDiaryData(diary.date.getFullYear());
        console.log(data);
        // data.set(this.getDateTime(diary.date),diary);
        data.set(DateUtil.getDateTime(diary.date),diary);
        // https://moznion.hatenadiary.com/entry/2019/11/12/160614
        localStorage.setItem(key,JSON.stringify({body:Object.fromEntries(data)}));
    }
}