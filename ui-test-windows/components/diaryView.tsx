
/**
 * 日記ビューのルート要素
 * */

 import React from 'react'
 import {useState} from 'react'

 import{Diary}from "~/lib/classes/Diary.ts";
//  import{DiaryCard}from"~/components/diaryCard.tsx";
 import{YearPanel}from "~/components/yearPanel.tsx";
 import{OverFlowPanel}from "~/components/overflowPanel.tsx";

 //コンポーネントはその機能を内部で完結する？ので、
 //日記関連の表示機能はここがルートになる？

 //これはいらない？
 export interface Prop{
      diaryData:Array<Array<Diary>>
 };
 
 export function DiaryView(props:Prop) {
    let yearPanelArray:Array<JSX.Element>=[];
    //TODO need map?
    props.diaryData.forEach(diaryArray=>{
      const diaryCard=<YearPanel  diaryArray={diaryArray}/>
      yearPanelArray.push(diaryCard);
    });

    // get data

     return (
     // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
     // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
       <div className="DiaryView">
            <OverFlowPanel yearArray={yearPanelArray}/>
       </div>
       
       
   )
 }
 