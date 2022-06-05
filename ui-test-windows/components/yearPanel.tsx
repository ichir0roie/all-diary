
/**
 * Array<Diary>を受け取って、子要素までまとめて生成する。
 * 後で追加する機能も必要やな。
 */

 import React from 'react'
 import {useState} from 'react'

 import{Diary}from "~/lib/classes/Diary.ts";
 import{DiaryCard}from"~/components/diaryCard.tsx";

 //なんと！"key"は予約語かなんかなのか！？
 export interface Prop{
     diaryArray:Array<Diary>
 };
 
 export function YearPanel(props:Prop) {
    let arrayDiaryCard:Array<JSX.Element>=[];
    const arrayDiary=props.diaryArray;
    //TODO need map?
    arrayDiary.forEach(diary=>{
      const diaryCard=<DiaryCard  diary={diary}/>
      arrayDiaryCard.push(diaryCard);
    });

     return (
     // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
     // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
       <div className="YearPanel">
         {arrayDiary}
       </div>
   )
 }
 