import { useDeno } from 'aleph/react'
import React,{useState} from 'react'


import Card from  "~/components/card.tsx"
import CardArray from '~/components/cardArray.tsx'

function get2dKeys(lenRow:number,lenCol:number){
  var array=new Array<Array<String>>();
  var count=0;
  for(var r=0;r<lenRow;r++){
    var line=new Array<String>();
    for(var c=0;c<lenCol;c++){
      line.push(count.toString());
      count++;
    }
    array.push(line);
  } 
return array;
}

export default function Home() {
  const [dataArray,setDataArray]=useState(get2dKeys(5,5));

  console.log(dataArray);

  return (

    <div className="page">
      {/* <table>
        <tr>
          <th><Card testKey="a" key="a"/></th>
          <th><Card testKey="b" key="b"/></th>
          <th><Card testKey="c" key="c"/></th>
        </tr>
      </table> */}
      <div className="scrollBox">
        <CardArray keyArray={dataArray} key="unique"/>
      </div>
    </div>
  );
}
