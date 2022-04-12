import React from 'react'


import Card from '~/components/card.tsx'

// https://www.w3schools.com/html/html_tables.asp

function createComponentArray(array:Array<string>){
  return  array.map((data) =>
  <th>
    <Card/>
  </th>
  );
}

export default function CardArray( ) {
  const CardArray=[
    [Card("1"),Card("2"),Card("3"),Card("4")]
   ]

   const CardArrayComp=CardArray.map((number) =>
   <th>
     {number}
   </th>

   );

   const cardArray=[];

  return (
  <table>
    <tr>
    {CardArrayComp}
    </tr>
    
  </table>
  )
}
