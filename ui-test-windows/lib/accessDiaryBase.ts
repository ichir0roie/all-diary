import { Diary } from "./classes/models.ts";

export class AccessDiaryBase {
  protected dataMap = new Map<number, Map<number, Diary>>();

  protected dataArray = new Array<Array<Diary>>();

  baseDate: Date;
  dataSizeYearly = 5;
  dataSizeDaily = 5;
  dataPushSize = 1;

  protected positionDaily = 0;
  protected positionYearly = 0;

  protected moved = false;
  protected arrayInitialized = false;

  constructor(sizeYearly: number, sizeDaily: number, pushSize: number) {
    this.dataSizeDaily = sizeYearly;
    this.dataSizeYearly = sizeDaily;
    this.dataPushSize = pushSize;
    this.baseDate = new Date(
      new Date().toLocaleString("jp", { timeZone: "Asia/Tokyo" }),
    );
  }

  // for initialize.
  public setDataMap() {

  }

  
  public getDataArray(): Array<Array<Diary>> {  
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
