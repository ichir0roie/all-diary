
import { Diary } from "~/lib/classes/models.ts";
import { AccessDiaryLocal } from "~/lib/accessDiaryLocal.ts";
import { DateUtil } from "~/lib/util/date.ts";

let ad = new AccessDiaryLocal(10, 10, 1);

export function setTestData(
  yearFrom: number,
  yearTo: number,
  dataSize: number,
) {


  let data = new Map<number, Map<number, Diary>>();
  const dist = Math.floor(365 / dataSize);
  let count = 0;
  for (let year = yearFrom; year <= yearTo; year++) {
    const baseDate = new Date(year, 0, 1);
    let yearMap = new Map<number, Diary>();
    for (let range = 0; range < dataSize&&365; range++) {
      const date: number = DateUtil.getDayCount(
        new Date(baseDate.getTime() + DateUtil.milliOfDay * dist * range)
      );
      let diary = new Diary(
        count.toString(),
        date,
        "this is id: " + count.toString() + " and time is " + date,
      );
      count++;
      yearMap.set(date, diary);
    }

    data.set(year, yearMap);
    ad.setDiaryYearly(year, yearMap);
  }
}
