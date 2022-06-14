import React, {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Diary } from "~/lib/classes/models.ts";
import { AccessDiaryLocal } from "~/lib/accessDiaryLocal.ts";
import{DateUtil}from "~/lib/util/date.ts";

interface Props {
  yearFrom: number;
  yearTo: number;
  dataRange: number;
}

let ad = new AccessDiaryLocal();

export function SetTestData(props: Props) {
  let data = new Map<string, Map<string, Diary>>();
  const dist=Math.floor(365/props.dataRange);
  console.log(dist);
    
    let count=0;
  for(let year=props.yearFrom;year<=props.yearTo;year++){
    const baseDate=new Date(year,0,1);
    let yearMap=new Map<string,Diary>();
    for(let range=0;range<props.dataRange;range++){
        console.log("dist!!");
        const date:string=(baseDate.getTime()+1000*60*60*24*dist*range).toString();
        console.log(date);
        let diary=new Diary(count.toString(),date,"this is id: "+count.toString()+" and time is "+date);
        count++;
        yearMap.set(date,diary);
    }
    data.set(year.toString(),yearMap);
    ad.setDiaryYearly(year,yearMap);
  }
  console.log(data);
  return (
    <div>
      {JSON.stringify({body:Object.fromEntries(data)})}
    </div>
  );
}
