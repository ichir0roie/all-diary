/**
 * 日記ビューのルート要素
 */

import React, { useEffect, useLayoutEffect, useRef, useState,useImperativeHandle } from "react";
import {RefObjOverflowPanel}from "~/lib/classes/viewDiaryInterfaces.ts";

import { Diary } from "~/lib/classes/diary.ts";
//  import{DiaryCard}from"~/components/diaryCard.tsx";
import { PanelYearly } from "~/components/PanelYearly.tsx";
import { PanelOverflow } from "~/components/PanelOverflow.tsx";

//コンポーネントはその機能を内部で完結する？ので、
//日記関連の表示機能はここがルートになる？

import { CreateDemoData } from "~/lib/createDemoData.ts";

export function ViewDiary() {
  const refViewDiary = useRef<HTMLHeadingElement>(null);
  // const refOfP=useRef<RefObjOverflowPanel>(null);
  const refOfP=useRef<RefObjOverflowPanel>(null);
  console.log("print refOfP");
  console.log(refOfP);

  let panelYearlyArray: Array<JSX.Element> = [];
  //TODO need map?

  const cda = new CreateDemoData();

  const diaryData = cda.getRange(10,5);
  diaryData.forEach((diaryArray) => {
    const yearlyPanel = <PanelYearly diaryArray={diaryArray} year ={diaryArray[0].date.getFullYear()}/>;
    // const yearlyPanel =new PanelYearly(  {"diaryArray":diaryArray});
    panelYearlyArray.push(yearlyPanel);
  });

  const [viewData, setViewData] = useState(panelYearlyArray);

  //TODO change to "onKeyPress of window?"
  function onScroll(ev: React.UIEvent<HTMLDivElement>) {

    const d=new Date()
    console.log("Log : "+ d.toTimeString());
    // const scrollRateX:number=ev.currentTarget.scrollTop/(ev.currentTarget.scrollHeight-ev.currentTarget.clientHeight);
    // const scrollRateY:number=ev.currentTarget.scrollLeft/(ev.currentTarget.scrollWidth-ev.currentTarget.clientWidth);
    // console.log(scrollRateX);    
    // console.log(scrollRateY);    
    // console.log("-----------------");
    
    const scrollMaxY=ev.currentTarget.scrollHeight-ev.currentTarget.clientHeight;
    const scrollMaxX=ev.currentTarget.scrollWidth-ev.currentTarget.clientWidth;
    
    let dirX=0;
    let dirY=0;
    if (ev.currentTarget.scrollLeft<50){
      ev.currentTarget.scrollLeft=100;
      dirX=-1;
    }else if(ev.currentTarget.scrollLeft>scrollMaxX-50){
      ev.currentTarget.scrollLeft=scrollMaxX-100;
      dirX=+1;
    }
    if (ev.currentTarget.scrollTop<50){
      ev.currentTarget.scrollTop=100;
      dirY=-1;
    }else if(ev.currentTarget.scrollTop>scrollMaxY-50){
      ev.currentTarget.scrollTop  =scrollMaxY-100;
      dirY=+1;
    }
    // console.log(dirX);
    // console.log(dirY);
    //check dir y

    if(dirX!=0){
      const isFuture:boolean=dirX<0?true:false;
      addYear(isFuture);
    }
    if(dirY!=0){
      const isFuture:boolean=dirY<0?true:false;
      addDay(isFuture);
    }
  }

  function addYear(isFuture:boolean){
    deleteYear(isFuture);
    // console.log(refOfP.current); 
    // console.log(refViewDiary);
    refOfP.current?.addYear(isFuture);
  }
  function deleteYear(isFuture:boolean){

  }
  function addDay(isFuture:boolean){
    deleteDay(isFuture);
  }
  function deleteDay(isFuture:boolean){

  }


  useEffect(()=>{
    refViewDiary.current?.scrollTo(100,100);
  });
  
  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="ViewDiary" onScroll={onScroll} ref={refViewDiary}>
      <PanelOverflow yearlyArray={viewData} ref={refOfP}/> 
    </div>
  );
}
