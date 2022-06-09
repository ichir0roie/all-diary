
/**
 * Array<Diary>を受け取って、子要素までまとめて生成する。
 * 後で追加する機能も必要やな。
 */

 import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState,Ref ,useImperativeHandle} from "react";


 import{Diary}from "~/lib/classes/models.ts";
 import{DiaryCard}from"~/components/diaryCard.tsx";

 //なんと！"key"は予約語かなんかなのか！？
 export interface Prop{
     diaryArray:Array<Diary>
    };
 
 export const PanelYearly =(props:Prop)  =>{
   let diaryCardArray:Array<JSX.Element>=[]; 
   const diaryArray=props.diaryArray;
  //  const year=diaryArray[0].date.getFullYear();

    //TODO need map? -> don't need map.
    diaryArray.forEach(diary=>{
      const diaryCard=<DiaryCard  diary={diary}/>
      diaryCardArray.push(diaryCard);
    });

     return (
     // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
     // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
       <div className="PanelYearly">
         {diaryCardArray}
       </div>
   )
 };
 