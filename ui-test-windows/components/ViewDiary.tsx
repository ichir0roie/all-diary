/**
 * 日記ビューのルート要素
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Diary } from "~/lib/classes/Diary.ts";
//  import{DiaryCard}from"~/components/diaryCard.tsx";
import { PanelYearly } from "~/components/PanelYearly.tsx";
import { PanelOverflow } from "~/components/PanelOverflow.tsx";

//コンポーネントはその機能を内部で完結する？ので、
//日記関連の表示機能はここがルートになる？

import { CreateDemoData } from "~/lib/createDemoData.ts";

export function ViewDiary() {
  const myRef = useRef<HTMLHeadingElement>(null);

  let PanelYearlyArray: Array<JSX.Element> = [];
  //TODO need map?

  const cda = new CreateDemoData(10, 5);
  const diaryData = cda.array;
  diaryData.forEach((diaryArray) => {
    const diaryCard = <PanelYearly diaryArray={diaryArray} />;
    PanelYearlyArray.push(diaryCard);
  });

  const [viewData, setViewData] = useState(PanelYearlyArray);

  //TODO change to "onKeyPress of window?"
  function onScroll(ev: React.UIEvent<HTMLDivElement>) {
    const d=new Date()
    console.log("Log : "+ d.toTimeString());
    const scrollRateX:number=ev.currentTarget.scrollTop/(ev.currentTarget.scrollHeight-ev.currentTarget.clientHeight);
    const scrollRateY:number=ev.currentTarget.scrollLeft/(ev.currentTarget.scrollWidth-ev.currentTarget.clientWidth);
    console.log(scrollRateX);    
    console.log(scrollRateY);    
    console.log("-----------------");
    
    const scrollMaxY=ev.currentTarget.scrollHeight-ev.currentTarget.clientHeight;
    const scrollMaxX=ev.currentTarget.scrollWidth-ev.currentTarget.clientWidth;
    
    let dirX=0;
    let dirY=0;
    if (ev.currentTarget.scrollLeft<100){
      dirX=-1;
    }else if(ev.currentTarget.scrollLeft>scrollMaxX-100){
      dirX=+1;
    }
    if (ev.currentTarget.scrollTop<100){
      dirY=-1;
    }else if(ev.currentTarget.scrollTop>scrollMaxY-100){
      dirY=+1;
    }
    console.log(dirX);
    console.log(dirY);
    console.log("-------------------------------\n");
    //check dir y

    if(dirX!=0){
      const isFuture:boolean=dirX>0?true:false;
      deleteYear(isFuture);
      addYear(isFuture);
    }
    if(dirY!=0){
      const isFuture:boolean=dirX>0?true:false;
      deleteDay(isFuture);
      addDay(isFuture);
    }
  }

  function addYear(isFuture:boolean){
  }
  function addDay(isFuture:boolean){
  }
  function deleteYear(isFuture:boolean){
  }
  function deleteDay(isFuture:boolean){
  }


  useEffect(()=>{
    myRef.current?.scrollTo(100,100);
  });
  
  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="ViewDiary" onScroll={onScroll} ref={myRef}>
      <PanelOverflow yearArray={viewData} />
    </div>
  );
}
