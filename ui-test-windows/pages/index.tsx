import { useDeno } from "aleph/react";
import React, { useState,useEffect,useRef,useLayoutEffect } from "react";

import {CreateDemoData} from "~/lib/createDemoData.ts";
import {Diary} from "~/lib/classes/Diary.ts";

export default function Home() {
  console.log("Home!")

  function getDiaryData(){
    const cdd=new CreateDemoData(5,5);
    return cdd.array;
  }
  const[diaryData,setDiaryData]=useState(new Array<Array<Diary>>());
  console.log(diaryData);

  function setDiaryView(){
    
    const diaryData=getDiaryData();
    diaryData.forEach(array=>{
      array.forEach(diary=>{

      });
    });
  }

  function addDiaryView(dirX:number,dirY:number){

  }
  
  //test values
  const[boxX,setBoxX]=useState(0);
  const[boxY,setBoxY]=useState(0);
  const[catchX,setCatchX]=useState(0);
  const[catchY,setCatchY]=useState(0);
  const[refX,setRefX]=useState(0);
  const[refY,setRefY]=useState(0);
  
  const myRef=useRef<HTMLHeadingElement>(null);

  function onScrollInBox(ev:React.UIEvent<HTMLDivElement>){
    setBoxX(ev.currentTarget.clientWidth);
    setBoxY(ev.currentTarget.clientHeight);
    setCatchX(ev.currentTarget.scrollLeft);
    setCatchY(ev.currentTarget.scrollTop);
    if(myRef.current!=null)setRefX(myRef.current.offsetWidth);    
    if(myRef.current!=null)setRefY(myRef.current.offsetWidth);    
    const w= myRef.current!=null ?myRef.current.offsetWidth : 0;
    const h= myRef.current!=null ?myRef.current.offsetHeight : 0;
    const posX=ev.currentTarget.scrollLeft+w/2;
    const posY=ev.currentTarget.scrollTop+h/2;
    setRefX(w);
    setRefY(h);

  }
  
  function newCard(posX:number,posY:number){
  }
  function createCard(posX:number,posY:number){
  }
    
  return (
    <div className="page">
      <div className="scrollBox" onScroll={onScrollInBox} ref={myRef}>
      </div>
      <div className="sideBox">
        <label>box w : {boxX}</label>
        <label>box h : {boxY}</label>
        <label>scroll x : {catchX}</label>
        <label>scroll y : {catchY}</label>
        <label>size x : {refX}</label>
        <label>size y : {refY}</label>
        </div>
    </div>
  );

}
