import { useDeno } from "aleph/react";
import React, { useState,useEffect,useRef,useLayoutEffect } from "react";

// import Card from "~/components/card.tsx";
// import CardArray from "~/components/cardArray.tsx";

export default function Home() {


  const [dataArray, setDataArray] = useState(cardInitialize());
  
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
    setRefX(w);
    setRefY(h);
  }
  
  function cardInitialize(){
    let a:JSX.Element[][]= [[]];
    return a;
  }
  const cardBox=<div className="scrollPanel">{dataArray}</div>
  
  return (
    <div className="page">
      <div className="scrollBox" onScroll={onScrollInBox} ref={myRef}>
       {cardBox}
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
