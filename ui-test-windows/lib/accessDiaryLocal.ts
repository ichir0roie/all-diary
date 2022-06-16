import { Diary } from "~/lib/classes/models.ts";
import { AccessDiaryBase } from "~/lib/accessDiaryBase.ts";

import { DateUtil } from "~/lib/util/date.ts";

export class AccessDiaryLocal extends AccessDiaryBase {
  override setDataMap() {
    super.setDataMap();
    console.log("set data map local.");
    for (let y = 0; y < this.dataSizeYearly - 1; y++) {
      const ty = this.baseDate.getFullYear() - y;
      this.setYearlyMap(ty);
    }
  }
  // this have bug.
  override moveYearlyData(
    future: boolean,
  ): boolean {
    super.moveYearlyData(future);

    const years = Array.from(this.dataMap.keys()).sort();
    const beforeYear = future ? years[years.length - 1] : years[0];
    const newYear = future ? beforeYear + 1 : beforeYear - 1;

    const success = this.setYearlyMap(newYear);
    if (success) {
      this.dataMap.delete(beforeYear);
    }
    return true;
  }

  override moveDailyData( //TODO return ResultPackDaily
    future: boolean,
  ): boolean {
    super.moveDailyData(future);

    return false;
  }

  override setYearlyMap(year: number): boolean {
    const key = "diary" + year.toString();
    const mapString: string | null = localStorage.getItem(key);
    if (mapString == null) return false;
    if (mapString == "{}") return false;

    let json = JSON.parse(mapString);
    //Date型は文字列になっている。
    let dataObject: Map<string, Diary> = new Map<string, Diary>(
      Object.entries(json["body"]),
    ) as Map<string, Diary>;

    let keys = Array.from(dataObject.keys());
    let basePosition = 0;
    for (let c = 0; c < keys.length; c++) {
      let keyDate = DateUtil.getDate(parseInt(keys[c]));
      keyDate.setFullYear(this.baseDate.getFullYear());
      if (
        DateUtil.getDayCount(keyDate) == DateUtil.getDayCount(this.baseDate)
      ) {
        basePosition = c;
        break;
      }
    }
    const from = basePosition - this.dataSizeDaily / 2 < 0
      ? 0
      : basePosition - this.dataSizeDaily / 2;
    const to = basePosition + this.dataSizeDaily / 2 >= keys.length
      ? 0
      : basePosition + this.dataSizeDaily / 2;
    keys = keys.slice(from, to);
    let data = new Map<number, Diary>();
    keys.forEach((key) => {
      if (dataObject.has(key)) {
        let t: Diary | undefined = dataObject.get(key); //this is bare object.
        if (t === undefined) return;
        let diary: Diary = new Diary(t.id, t.dateTimeNumber, t.text);
        data.set(parseInt(key), diary);
      }
    });
    this.dataMap.set(year, data);
    return true;
  }

  public getDiaryToday(): Diary {
    let d = this.getDiary(this.baseDate);
    if (d == null) {
      return new Diary(null, DateUtil.getDayCount(this.baseDate), "");
    } else {
      return d;
    }
  }

  private getDiary(date: Date): Diary | null {
    if (!this.dataMap.has(date.getFullYear())) {
      this.setYearlyMap(date.getFullYear());
    }
    const ret = this.dataMap.get(date.getFullYear())?.get(
      DateUtil.getDayCount(date),
    );
    if (ret == undefined) return null;
    return ret;
  }

  //this is dangerous method.
  public setDiaryYearly(year: number, map: Map<number, Diary>) {
    const key: string = "diary" + year;
    localStorage.setItem(
      key,
      JSON.stringify({ body: Object.fromEntries(map) }),
    );
  }

  override setDiary(diary: Diary) {
    const key: string = "diary" + diary.date.getFullYear();
    if (!this.dataMap.has(diary.date.getFullYear())) {
      this.setYearlyMap(diary.date.getFullYear());
    }
    this.dataMap.get(diary.date.getFullYear())?.set(
      DateUtil.getDayCount(diary.date),
      diary,
    );
    const setData = this.dataMap.get(diary.date.getFullYear());
    if (setData != undefined) {
      localStorage.setItem(
        key,
        JSON.stringify({ body: Object.fromEntries(setData) }),
      );
    }
  }
}
