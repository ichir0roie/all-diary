export interface  RefObjOverflowPanel{
  addYear:(isFuture:boolean)=>void;
  addDays:(isFuture:boolean)=>void;
}

export interface RefObjPanelYearly{
  year:number
  addDay:(isFuture:boolean)=>void;
}
