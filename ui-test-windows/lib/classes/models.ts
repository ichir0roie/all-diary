import {DateUtil}from "~/lib/util/date.ts";

export class Diary{
    id:string;
    dateTimeNumber:number|null;
    date:Date;
    text:string;
    constructor(id:string|null,dateTimeNumber:number|null,text:string|null){
        this.id =id==null? "":id;
        this.dateTimeNumber=dateTimeNumber;
        if(dateTimeNumber==null){
            this.date=new Date(1997,5,12);
        }else{
            // this.date=new Date(dateTimeString);
            this.date=DateUtil.getDate(dateTimeNumber);
        }
        // this.date=date==null?new Date(2000,1,1):date;
        this.text=text==null?"":text;
    }   
    public setup(){
        if(this.dateTimeNumber!=null)this.date=DateUtil.getDate(this.dateTimeNumber);
    }
}
