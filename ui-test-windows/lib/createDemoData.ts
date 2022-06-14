import { Diary } from "./classes/models.ts";
import {DateUtil}from "~/lib/util/date.ts";

export class CreateDemoData {
  today:Date;
  nowTemp:Date;
  testId=0;
  constructor() {
    this.today = new Date(
      new Date().toLocaleString("jp", { timeZone: "Asia/Tokyo" }),
    );
    this.nowTemp=new Date(
      new Date().toLocaleString("jp", { timeZone: "Asia/Tokyo" }),
    );
  }

  public getRange(years: number, size: number) {
    let array: Array<Array<Diary>> = [];
    let id = 0;
    for (let cy = 0; cy < years; cy++) {
      let ta: Array<Diary> = [];
      for (let cd = 0; cd < size; cd++) {
        let y = this.today.getFullYear() - cy;
        const nDate = this.getRandomDate(y,true);

        const testText = "this is test text.";
        const diary: Diary = new Diary(id.toString(), DateUtil.getDateTime(nDate) , testText);
        ta.push(diary);
        id += 1;
      }
      ta = ta.sort(function (a: Diary, b: Diary) {
        return b.date.getTime() - a.date.getTime();
      });
      array.push(ta);
    }

    return array;
  }

  public getYear(
    year: number,
    baseDate: Date,
    getRange: number,
  ):Array<Diary>{
    let ta: Array<Diary> = [];
    for (let cd = 0; cd < getRange; cd++) {
      ta.push(this.getRandomDiary(this.getRandomDate(year,true)));
    }
    ta = ta.sort(function (a: Diary, b: Diary) {
      return b.date.getTime() - a.date.getTime();
    });
    
    return ta;
  }
  
    // functions conscious of RDB.
    public getDailyData(//TODO return ResultPackDaily
        years:Array<number>,
        ):Array<Array<Diary>>{
            let data=new Array<Array<Diary>>();
            years.forEach(y=>{
              let diary:Diary=this.getRandomDiary(this.getRandomDate(y,true));
              data.push([diary]);
            });
            return data;
    }

    public getRandomDate(year:number,isFuture:boolean):Date{
      // let d=new Date(
      //   year,
      //   getRandomInt(this.today.getMonth(),11),
      //   getRandomInt( this.today.getDate(),31),
      //   getRandomInt(0, 23),
      //   getRandomInt(0, 59),
      //   getRandomInt(0, 59),
      // );
      // return d;
      if(isFuture){
        this.nowTemp.setTime(this.nowTemp.getTime()+1000*60*60*24);
      }else{
        this.nowTemp.setTime(this.nowTemp.getTime()-1000*60*60*24);
      }
     
     this.nowTemp.setFullYear(year);
     const newDate:Date=new Date(this.nowTemp.getTime());
      return newDate;
    }

    public resetRandomDate(){
      this.nowTemp=new Date(
        new Date().toLocaleString("jp", { timeZone: "Asia/Tokyo" }),
      );
    }

    public getRandomDiary(date:Date){
      const testText = "this is test text.";
      let d= new Diary(this.testId.toString(),DateUtil.getDateTime(date),testText);
      this.testId+=1;
      return d;
    }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


