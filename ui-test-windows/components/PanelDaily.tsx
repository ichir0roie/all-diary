
/**
 * Array<Diary>(同じ日付のもの)を受け取って、子要素までまとめて生成する。
 * なぜこのような改装が必要かというと、のちのちのどうてりき
 * あ！保留！！
 */

 import React from 'react'
 import {useState} from 'react'

 import{Diary}from "~/lib/classes/Diary.ts";

 export interface Props{
     arrayDiary:Array<Diary>
 };
 
 export function PanelDaily(props:Props) {
     
    const arrayDiary=props.arrayDiary;
    arrayDiary.forEach(diary=>{

    });

     return (
     // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
     // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
       <div className="PanelDaily"/>
   )
 }
 