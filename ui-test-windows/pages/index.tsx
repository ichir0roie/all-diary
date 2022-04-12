import { useDeno } from 'aleph/react'
import React from 'react'
import Logo from '~/components/logo.tsx'
import useCounter from '~/lib/useCounter.ts'

import Card from '~/components/card.tsx'
import CardArray from '~/components/cardArray.tsx'

export default function Home() {
  // const [count, isSyncing, increase, decrease] = useCounter()
  //  const CardArray=[
  //   [Card("1"),Card("2"),Card("3"),Card("4")]
  //  ]

  //  const CardArrayComp=CardArray.map((number) =>
  //  <li >
  //    {number}
  //  </li>
  //  );
  //  CardArray.map((c)=>
  //  <li>
  //  <p>test</p>  
  //  </li>
  //  );

  return (
    <div className="page">
      {/* <Card/> */}
      {/* {CardArray[0][0]} */}
      {/* <ul>
        {CardArrayComp}
        </ul> */}
        <CardArray/>
    </div>
  )
}
