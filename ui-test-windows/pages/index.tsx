import { useDeno } from "aleph/react";
import React, { useState,useEffect,useRef,useLayoutEffect } from "react";

import {Diary} from "~/lib/classes/models.ts";
import {ViewDiary} from "~/components/viewDiary.tsx";
import {ViewInput} from "~/components/viewInput.tsx";
import {SetTestData}from "~/components/test/setTestData.tsx";

export default function Home() {
  console.log("Home!")
    
  return (
    <div className="page">
      <ViewDiary/>
      {
        /*todo menu*/
        /*https://www.google.com/search?q=react+%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC&rlz=1C1FQRR_enJP940JP940&oq=react+%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC&aqs=chrome..69i57j0i512l3j0i30j0i8i30l5.37383j0j7&sourceid=chrome&ie=UTF-8 */
      }
      {/* <ViewInput/> */}
      {/* <SetTestData  yearFrom={2010} yearTo={2022} dataRange={20}/> */}
    </div>
  );

}
