/**
 * Array<Diary>(同じ日付のもの)を受け取って、子要素までまとめて生成する。
 * なぜこのような改装が必要かというと、のちのちのどうてりき
 * あ！保留！！
 */

import React, {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {AccessDiaryLocal}from "~/lib/accessDiaryLocal.ts";

import{DateUtil}from"~/lib/util/date.ts";

const ad =new AccessDiaryLocal();

export function ViewInput() {
  console.log("call ViewInput");
  
  function submit(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("submit");
    let diary=ad.getDiaryToday();
    diary.text=text;
    ad.setDiary(diary);
    setNowDate();
  }
  const [date] = useState(new Date());
  function getDateText() {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" +
    date.getDate() ;
  }
  const [text, setText] = useState("");

  //TODO this is right?
  const[init,setInit]=useState(false);
  useEffect(()=>{
    if(!isNewDate()){
      loadText();
    }
    setInit(true);
  },[init]);

  function setNowDate(){
    localStorage.setItem("latestDate",DateUtil.getDateTime(ad.baseDate));
  }
  function isNewDate():boolean{
    const nowTime=DateUtil.getDateTime(ad.baseDate);
    const latestTime=localStorage.getItem("latestDate");
    if(latestTime==null)return true;
    if (nowTime==latestTime)return false;
    return  true
  }
  function loadText(){
    let savedText =localStorage.getItem("todayDiaryText");
    if(savedText==null)savedText="";
    setText(savedText);
  }
  function setTextStorage(t:string){
    setText(t);
    localStorage.setItem("todayDiaryText",t);
    setNowDate();
  }
  function changeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextStorage(event.target.value.toString());
  }
  return (
    <div className="ViewInput">
      <div>
        <p>date :&nbsp;</p>
        <p>{getDateText()}</p>
      </div>
        <textarea onChange={changeText} value={text} />
        <button onClick={submit}>submit</button>
    </div>
  );
}
