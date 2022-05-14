import React from 'react'


import Card from '~/components/card.tsx'

// https://www.w3schools.com/html/html_tables.asp

function createTable(dataArray2d:Array<Array<String>>){
  var res=new Array();
  dataArray2d.forEach(element => {
    var col=createTr(element);
    res.push(col);
  });
  return (
    <table>
      <tbody>
      {res}
      </tbody>
      
    </table>
  );
}

function createTr(dataArray:Array<String>){
  var res=new Array();
  dataArray.forEach(element => {
    var line=<th><Card testKey={element}/></th>;
    res.push(line);
  });
  return (<tr>{res}</tr>);
}

// interface CardArrayProps{
//   keyArray:Array<Array<String>>
// }
export default function CardArray(props:{keyArray:Array<Array<String>>}) {
   
  const cardArray=createTable(props.keyArray);

  return (
    <div>
      {cardArray}
    </div>
  );
}
