import { useDeno } from "aleph/react";
import React, { useState,useEffect,useRef,useLayoutEffect } from "react";

import Card from "~/components/card.tsx";
import CardArray from "~/components/cardArray.tsx";

function get2dKeys(lenRow: number, lenCol: number) {
  var array = new Array<Array<String>>();
  var count = 0;
  for (var r = 0; r < lenRow; r++) {
    var line = new Array<String>();
    for (var c = 0; c < lenCol; c++) {
      line.push(count.toString());
      count++;
    }
    array.push(line);
  }
  return array;
}

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
    const posX=ev.currentTarget.scrollLeft+w/2;
    const posY=ev.currentTarget.scrollTop+h/2;
    setRefX(posX);
    setRefY(posY);

    // newCard(Math.floor(Math.random() * 500),Math.floor(Math.random() * 500));


    newCard(posX,posY);
  }
  
  function newCard(posX:number,posY:number){
    // //HACK -> unnecessary
    // var temp=dataArray;
    // temp.push(nc);
    // setDataArray(temp);
    dataArray.push(createCard(posX,posY));
    setDataArray(dataArray);
  }
  function createCard(posX:number,posY:number){
    const nc=<Card testKey={posX.toString()+":"+posY.toString()} posX={posX} posY={posY} />;
    return nc;
  }
  function cardInitialize(){
    var ar:Array<JSX.Element>=[
      createCard(0,0),
      createCard(100,0),
      createCard(0,100),
      createCard(100,100)
    ];
    return ar;
  }
  
  // const[cards , setCards]=useState<JSX.Element[]>(cardsTemp);
  
  return (
    <div className="page">
      {
        /* <table>
        <tr>
          <th><Card testKey="a" key="a"/></th>
          <th><Card testKey="b" key="b"/></th>
          <th><Card testKey="c" key="c"/></th>
        </tr>
      </table> */
      }
      <div className="scrollBox" onScroll={onScrollInBox} ref={myRef}>
        {/* <CardArray keyArray={dataArray} key="unique" /> */}
        {/* <Card testKey="a"/> */}
        <div className="scrollPanel">
          {dataArray}
        </div>
      </div>
      <div className="sideBox">
        <label>box width : {boxX}</label>
        <label>box height x : {boxY}</label>
        <label>scroll x : {catchX}</label>
        <label>scroll y : {catchY}</label>
        <label>size x : {refX}</label>
        <label>size y : {refY}</label>
        </div>
    </div>
  );

}

function componentDidMount() {
throw new Error("Function not implemented.");
}
