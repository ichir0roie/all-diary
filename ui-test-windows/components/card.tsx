import React from 'react'
import {useState} from 'react'

//なんと！"key"は予約語かなんかなのか！？
export interface CardProps{
  testKey:String;
  posX:number;
  posY:number;
}

export default function Card(props:CardProps) {
  // console.log(props.key);
  const [value,setValue]=useState("a");
  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
      <div className="card" style={{top:props.posX ,left:props.posY} }>
          <p>title</p>
          <p>text area</p>
          <p>{props.testKey}</p>
      </div>
  )
}
