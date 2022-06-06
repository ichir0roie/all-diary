import { Diary } from "./classes/diary.ts";
import * as RP from  "~/lib/classes/resultPacks.ts";

export class CreateDemoData {
  constructor() {}

  public getRange(years: number, size: number) {
    let array: Array<Array<Diary>> = [];
    const today: Date = new Date(
      new Date().toLocaleString("jp", { timeZone: "Asia/Tokyo" }),
    );
    let id = 0;
    for (let cy = 0; cy < years; cy++) {
      let ta: Array<Diary> = [];
      for (let cd = 0; cd < size; cd++) {
        let y = today.getFullYear() - cy;
        let m = getRandomInt(0, 11);
        let d = getRandomInt(1, 31);
        //HACK
        if (cy == 0) {
          m = getRandomInt(0, today.getMonth() - 1);
          d = getRandomInt(1, today.getDate() - 1);
        }

        const nDate = new Date(
          y,
          m,
          d,
          getRandomInt(0, 23),
          getRandomInt(0, 59),
          getRandomInt(0, 59),
        );

        const testText = "this is test text.";
        const diary: Diary = new Diary(id.toString(), nDate, testText);
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
  ):RP.ResultPackYearly{
    let ret=new RP.ResultPackYearly();
    const today: Date = baseDate;

    let id = 0;
    let ta: Array<Diary> = [];
    for (let cd = 0; cd < getRange; cd++) {
      let y = year;
      let m = getRandomInt(0, today.getMonth());
      let d = getRandomInt(1, today.getDate());

      const nDate = new Date(
        y,
        m,
        d,
        getRandomInt(0, 23),
        getRandomInt(0, 59),
        getRandomInt(0, 59),
      );

      const testText = "this is test text.";
      const diary: Diary = new Diary(id.toString(), nDate, testText);
      ta.push(diary);
      id += 1;
    }
    ta = ta.sort(function (a: Diary, b: Diary) {
      return b.date.getTime() - a.date.getTime();
    });
    ret.future=ta;
    
    ta=[];
    for (let cd = 0; cd < getRange; cd++) {
      let y = year;
      let m = getRandomInt(today.getMonth(),11);
      let d = getRandomInt( today.getDate(),31);

      const nDate = new Date(
        y,
        m,
        d,
        getRandomInt(0, 23),
        getRandomInt(0, 59),
        getRandomInt(0, 59),
      );

      const testText = "this is test text.";
      const diary: Diary = new Diary(id.toString(), nDate, testText);
      ta.push(diary);
      id += 1;
    }
    ta = ta.sort(function (a: Diary, b: Diary) {
      return b.date.getTime() - a.date.getTime();
    });
    ret.past=ta;

    const testText = "this is test text.";
    const diary: Diary = new Diary(id.toString(),baseDate , testText);
    ret.baseDate=diary;

    return ret;
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
