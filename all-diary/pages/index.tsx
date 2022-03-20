import { useDeno } from 'aleph/react'
import React,{useState} from 'react'
import Logo from '~/components/logo.tsx'
import {selectTest} from '~/lib/myDb.ts'

export default function Home() {
  
  

  function clickButton(){
    selectTest();
  }

  return (
    <div className="page">
      <button className="btn btn-primary m-3 p-3" onClick={clickButton}>check</button>
    </div>
  )
}
