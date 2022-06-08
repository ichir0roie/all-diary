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

import { AccessDiary } from "~/lib/accessDiary.ts";

export function ViewDiary() {
  const refViewDiary = useRef<HTMLHeadingElement>(null);
  // const refOfP=useRef<RefObjOverflowPanel>(null);

  const ad = new AccessDiary();

  const [diaryData,setDiaryData] =useState(ad.getRange(10,5)) ;
  
  function onScroll(ev: React.UIEvent<HTMLDivElement>) {

    const d=new Date()
    console.log("Log : "+ d.toTimeString());
    
    const scrollMaxY=ev.currentTarget.scrollHeight-ev.currentTarget.clientHeight;
    const scrollMaxX=ev.currentTarget.scrollWidth-ev.currentTarget.clientWidth;
    
    let dirX=0;
    let dirY=0;
    const marginSizeX =100;
    const cardSizeX=200;
    const marginSizeY =100;
    const cardSizeY=200;
    
    if (ev.currentTarget.scrollLeft<marginSizeX){
      ev.currentTarget.scrollLeft=marginSizeX+cardSizeX;
      dirX=-1;
    }else if(ev.currentTarget.scrollLeft>scrollMaxX-marginSizeX){
      ev.currentTarget.scrollLeft=scrollMaxX-marginSizeX-cardSizeX;
      dirX=+1;
    }
    if (ev.currentTarget.scrollTop<marginSizeY){
      ev.currentTarget.scrollTop=marginSizeY +cardSizeY;
      dirY=-1;
    }else if(ev.currentTarget.scrollTop>scrollMaxY-marginSizeY){
      ev.currentTarget.scrollTop  =scrollMaxY-marginSizeY-cardSizeY;
      dirY=+1;
    }
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
    // refOfP.current?.addYear(isFuture);
    let tgtYear = 0;
      if (isFuture) {
        tgtYear = diaryData[0][0].date.getFullYear() + 1;
      } else {
        tgtYear = diaryData[diaryData.length-1][0].date.getFullYear() - 1;
      }
    const diaryArray = ad.getYearlyData(tgtYear, new Date(), 10);
    // diaryData.push(diaryArray);
      if (isFuture)  {
        diaryData.splice(-1);
        diaryData.unshift(diaryArray);
      } else {
        diaryData.shift();
        diaryData.push(diaryArray);
      }
    setDiaryData([...diaryData]); 
    // console.log(diaryData);
    console.log(diaryData.length);
  }
  function addDay(isFuture:boolean){ 
    // refOfP.current?.addDays(isFuture);
  }

  // useEffect(()=>{
  //   refViewDiary.current?.scrollTo(100,100);
  // });
  
  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="ViewDiary" onScroll={onScroll} ref={refViewDiary}>
      <PanelOverflow data={diaryData}/> 
    </div>
  );
}
