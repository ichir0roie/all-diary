import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState,Ref ,useImperativeHandle} from "react";

import{Diary}from "~/lib/classes/diary.ts";

//なんと！"key"は予約語かなんかなのか！？
export interface Prop{
    diary:Diary
}

export const DiaryCard=forwardRef( (prop:Prop)=> { 
    const diary=prop.diary;
    return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
      <div className="DiaryCard">
          <p>{diary.id} : {diary.date.toLocaleString()}</p>
          <br/>
          <p>{diary.text}</p><br/>
      </div>
  );
});
