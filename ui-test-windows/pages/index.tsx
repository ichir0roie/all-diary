import { useDeno } from "aleph/react";
import React, { useState,useEffect,useRef,useLayoutEffect } from "react";

import {Diary} from "~/lib/classes/diary.ts";
import {ViewDiary} from "~/components/ViewDiary.tsx";

export default function Home() {
  console.log("Home!")
  
  const myRef=useRef<HTMLHeadingElement>(null);
  
  function newCard(posX:number,posY:number){
  }
  function createCard(posX:number,posY:number){
  }
    
  return (
    <div className="page">
      <ViewDiary/>
      <div className="sideBox">
      </div>
    </div>
  );

}
