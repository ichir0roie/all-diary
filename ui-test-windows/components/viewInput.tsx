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

export function ViewInput() {
  console.log("call ViewInput");
  
  function submit(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("submit");
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
    let savedText =localStorage.getItem("todayDiaryText");
    if(savedText==null)savedText="";
    setText(savedText);
    setInit(true);
  },[init]);

  function changeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value.toString());
    localStorage.setItem("todayDiaryText",event.target.value.toString());
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
