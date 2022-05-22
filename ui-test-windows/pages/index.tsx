import { useDeno } from "aleph/react";
import React, { useState } from "react";

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
  const [dataArray, setDataArray] = useState(get2dKeys(20, 20));
  
  const[boxX,setBoxX]=useState(0);
  const[boxY,setBoxY]=useState(0);
  const[catchX,setCatchX]=useState(0);
  const[catchY,setCatchY]=useState(0);

  var cardsTemp:JSX.Element[]=[]
  
  console.log(dataArray);

  function onScrollInBox(ev:React.UIEvent<HTMLDivElement>){
    setBoxX(ev.currentTarget.clientWidth);
    setBoxY(ev.currentTarget.clientHeight);
    setCatchX(ev.currentTarget.scrollLeft);
    setCatchY(ev.currentTarget.scrollTop);
    // console.log(ev);
    newCard(Math.floor(Math.random() * 500),Math.floor(Math.random() * 500));
  }
  
  function newCard(posX:number,posY:number){
    const nc=<Card testKey={posX.toString()+":"+posY.toString()} posX={posX} posY={posY} />;
    cardsTemp.push(nc);
    return nc;
  }
  newCard(0,0);
  newCard(50,0);
  newCard(0,50);
  newCard(100,100);
  
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
      <div className="scrollBox" onScroll={onScrollInBox}>
        {/* <CardArray keyArray={dataArray} key="unique" /> */}
        {/* <Card testKey="a"/> */}
        {cardsTemp}
      </div>
      <div className="sideBox">
        <label>box width : {boxX}</label>
        <label>box height x : {boxY}</label>
        <label>scroll x : {catchX}</label>
        <label>scroll y : {catchY}</label>
        </div>
    </div>
  );

}
