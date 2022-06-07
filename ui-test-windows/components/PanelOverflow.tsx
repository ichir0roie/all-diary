/**
 * スクロールイベントを取得するように子要素のサイズを拡大するための要素。
 */

import { Diary } from "~/lib/classes/diary.ts";
import { DiaryCard } from "~/components/diaryCard.tsx";
import { PanelYearly } from "~/components/PanelYearly.tsx";
import {RefObjectOfP}from "~/lib/classes/viewDiaryInterfaces.ts";

import {  AccessDiary} from "~/lib/accessDiary.ts";


import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState,Ref ,useImperativeHandle} from "react";
//https://stackoverflow.com/questions/60554808/react-useref-with-typescript-and-functional-component 

export interface Prop {
  yearlyArray: Array<JSX.Element>; 
}

//https://stackoverflow.com/questions/37949981/call-child-method-from-parent
export const  PanelOverflow  =forwardRef((props: Prop,ref:Ref<RefObjectOfP>) =>{
  
  useImperativeHandle(ref, () => ({ addYear }));
  console.log( "print ref");
  // console.log(props.ref);
  let arrayDiaryCard: Array<JSX.Element> = [];
  const [yearlyArray, setYearlyArray] = useState(props.yearlyArray);

  const myRef = useRef<HTMLHeadingElement>(null);
  
  function addYear(isFuture:boolean){
 
    const ad = new  AccessDiary();
    const diaryArray=ad.getYearlyData(2000,new Date(),10);
    const yearlyPanel = <PanelYearly diaryArray={diaryArray} />;
    setYearlyArray([...yearlyArray,yearlyPanel]);
  }

  // useEffect(()=>{
  //   myRef.current?.scrollTo(100,100);
  //   console.log(myRef.current);
  // });
  

  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="PanelOverflow" ref={myRef}>
      {yearlyArray}
    </div>
  );
}
);

export function PanelOverflowBK (props: Prop,ref:Ref<RefObjectOfP>) {
  
  useImperativeHandle(ref, () => ({ addYear }));
  console.log( "print ref");
  // console.log(props.ref);
  let arrayDiaryCard: Array<JSX.Element> = [];
  const [yearArray, setYearArray] = useState(props.yearlyArray);

  const myRef = useRef<HTMLHeadingElement>(null);
  
  function addYear(isFuture:boolean){
    console.log("add year : "+isFuture);
  }

  // useEffect(()=>{
  //   myRef.current?.scrollTo(100,100);
  //   console.log(myRef.current);
  // });
  

  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="PanelOverflow" ref={myRef}>
      {yearArray}
    </div>
  );
}
