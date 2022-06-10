/**
 * 日記ビューのルート要素
 */

import React, { useEffect, useLayoutEffect, useRef, useState,useImperativeHandle } from "react";

import { PanelOverflow } from "~/components/panelOverflow.tsx";




//コンポーネントはその機能を内部で完結する？ので、
//日記関連の表示機能はここがルートになる？

import { AccessDiary } from "~/lib/accessDiary.ts";

const viewLengthDay =10;
const viewLengthYear=10;
const ad=new AccessDiary();
const initData=ad.getRange(viewLengthYear,viewLengthDay);

export function ViewDiary() {
  console.log("call ViewDiary.")
  const refViewDiary = useRef<HTMLHeadingElement>(null);
  // const refOfP=useRef<RefObjOverflowPanel>(null);

  let viewPosition=0;
  const[init,setInit]=useState(false);

  // const [diaryData,setDiaryData] =useState(ad.getRange(viewLengthYear,viewLengthDay)) ;// this is calc anytime.
  const [diaryData,setDiaryData] =useState(initData) ;

  const baseDate=new Date();

//todo スクロールポジションとデータ管理はすべてここでできる。

  function onScroll(ev: React.UIEvent<HTMLDivElement>) {

    const d=new Date();
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
      addDays(isFuture);
    }
    setDiaryData([...diaryData]); 
    console.log(diaryData);
    console.log(diaryData.length);
  }

  function addYear(isFuture:boolean){
    console.log( "add year vd.");
    // refOfP.current?.addYear(isFuture);
    let tgtYear = 0;
      if (isFuture) {
        tgtYear = diaryData[0][0].date.getFullYear() + 1;
      } else {
        tgtYear = diaryData[diaryData.length-1][0].date.getFullYear() - 1;
      }
    const diaryArray = ad.getYearlyData(tgtYear,baseDate, viewLengthDay);
    // diaryData.push(diaryArray);
      if (isFuture)  {
        diaryData.splice(-1);
        diaryData.unshift(diaryArray);
      } else {
        diaryData.shift();
        diaryData.push(diaryArray);
      }
  }
  function addDays(isFuture:boolean){ 
    console.log( "add day vd.");
    if (isFuture){
      viewPosition+=1;
    }else{
      viewPosition-=1;
    }
    let years=new Array<number>();
    diaryData.forEach(year=>{years.push(year[0].date.getFullYear());});
    let daysYearly=ad.getDailyData(years,viewPosition,viewLengthDay,isFuture);
    for(let c=0;c<daysYearly.length;c++){
      if(isFuture){
        diaryData[c].splice(-1);
        diaryData[c]=[...daysYearly[c],...diaryData[c]];
      }else{
        diaryData[c].shift();
        diaryData[c]=[...diaryData[c],...daysYearly[c]];
      }
    };
    // refOfP.current?.addDays(isFuture);
  }

  useEffect(()=>{
    if(!init){
    console.log("init")
    refViewDiary.current?.scrollTo(100,100);
    setInit(true);
  }  
  
  });
  

  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="ViewDiary" onScroll={onScroll} ref={refViewDiary}>
      <PanelOverflow data={diaryData}/> 
    </div>
  );
}
