import { Diary } from "./classes/models.ts";

export class AccessDiaryBase {

  protected dataMap = new Map<number, Map<number, Diary>>();
  protected dataArray = new Array<Array<Diary>>();

  dataSizeYearly = 5;
  dataSizeDaily = 10;
  dataPushSize = 1;

  protected moved = false;
  protected arrayInitialized = false;
  
  protected baseDate = new Date(
    new Date().toLocaleString("jp", { timeZone: "Asia/Tokyo" }),
  );
  constructor(sizeYearly: number, sizeDaily: number, pushSize: number) {
    this.dataSizeDaily = sizeYearly;
    this.dataSizeYearly = sizeDaily;
    this.dataPushSize = pushSize;
    
  }

  // for initialize.
  public setDataMap() {

    public getDataArray(): Array<Array<Diary>> {
    console.log("get data array");

    if (!this.moved && this.arrayInitialized) return this.dataArray;

    this.dataArray = new Array<Array<Diary>>();
    console.log(Array.from(this.dataMap.values()));
    this.dataMap.forEach((value, key) => {
      let yearly = new Array<Diary>();
      value.forEach((value, key) => {
        yearly.push(value);
      });
      this.dataArray.push(yearly);
    });

    if (!this.arrayInitialized) this.arrayInitialized = true;
    return this.dataArray;
  }

  public moveYearlyData(
    future: boolean,
  ): boolean {
    this.moved = true;
    return false;
  }

  protected setYearlyMap(year: number): boolean {
    return false;
  }

  public moveDailyData( //TODO return ResultPackDaily
    future: boolean,
  ): boolean {
    this.moved = true;
    return false;
  }

  public setDiary(diary: Diary) {
  }
}
