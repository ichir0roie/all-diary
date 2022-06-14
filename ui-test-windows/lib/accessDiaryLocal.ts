import { Diary } from "~/lib/classes/models.ts";
import { AccessDiaryBase } from "~/lib/accessDiaryBase.ts";

import { DateUtil } from "~/lib/util/date.ts";

export class AccessDiaryLocal extends AccessDiaryBase {
  public data = new Map<number, Map<string, Diary>>();

  override getRange(yearRange: number, dayRange: number): Array<Array<Diary>> {
    let ret = new Array<Array<Diary>>();

    for (let y = 0; y < yearRange - 1; y++) {
      const ty = this.baseDate.getFullYear() - y;
      let data = this.getYearlyDataAll(ty);
      data = new Map(
        [...data.entries()].sort(
          (a, b) => Math.abs(parseInt(b[0]) - parseInt(a[0])),
        ),
      );
      let ta = new Array<Diary>();
      let values = Array.from(data.values());
      for (var l = 0; l < dayRange; l++) {
        if (values[l] != undefined) ta.push(values[l]);
      }
      ret.push(ta);
    }
    return ret;
  }

  public getYearlyDataAll(year: number): Map<string, Diary> | null {
    const key = "diary" + year.toString();
    const mapString: string | null = localStorage.getItem(key);
    if (mapString == null) return null;
    if (mapString == "{}") return null;
    let json = JSON.parse(mapString);
    console.log(json);
    let dataObject: Map<string, Diary> = new Map<string, Diary>(
      Object.entries(json["body"]),
    ) as Map<string, Diary>;
    let data = new Map<string, Diary>();
    dataObject.forEach((value, key) => {
      let tempDiary = new Diary(value.id, value.dateTimeString, value.text);
      data.set(key, tempDiary);
    });
    //型変換が必要ということがわかった。
    // console.log("from json");
    // data.forEach((v,k)=>{
    //     console.log(typeof(v));
    // })
    return data;
  }
  public getDiaryToday(): Diary {
    let d = this.getDiary(this.baseDate);
    // console.log(d);
    if (d == null) {
      return new Diary(null, DateUtil.getDateTime(this.baseDate), "");
    } else {
      return d;
    }
  }

  override getYearlyData(
    year: number,
    baseDate: Date,
    getRange: number,
  ): Array<Diary> | null {
    const key: string = "diary" + year;
    let data = this.getYearlyDataAll(year);
    if (data == null) {
      return null;
    } else {
      let array = Array.from(data.values());
      //HACK 
      array=array.sort((a:Diary)=>Math.abs(baseDate.getTime()-a.date.getTime()));
      array=array.slice(0,getRange);
      array=array.sort((a:Diary,b:Diary)=>Math.abs(b.date.getTime()-a.date.getTime()));
      console.log(array);
      return array;
    }
  }

  public getDiary(date: Date): Diary | null {
    this.data.get(date.getFullYear())?.forEach((v: Diary, time: string) => {
      if (
        // time==this.getDateTime(date)
        time == DateUtil.getDateTime(date)
      ) {
        return v;
      }
    });
    return null;
  }

  //this is dangerous method.
  public setDiaryYearly(year: number, map: Map<string, Diary>) {
    const key: string = "diary" + year;
    localStorage.setItem(
      key,
      JSON.stringify({ body: Object.fromEntries(map) }),
    );
  }

  public setDiary(diary: Diary) {
    const key: string = "diary" + diary.date.getFullYear();
    let data: Map<string, Diary> = this.getYearlyDataAll(
      diary.date.getFullYear(),
    );
    console.log(data);
    // data.set(this.getDateTime(diary.date),diary);
    data.set(DateUtil.getDateTime(diary.date), diary);
    // https://moznion.hatenadiary.com/entry/2019/11/12/160614
    localStorage.setItem(
      key,
      JSON.stringify({ body: Object.fromEntries(data) }),
    );
  }
}
