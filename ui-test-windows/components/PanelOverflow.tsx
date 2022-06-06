/**
 * スクロールイベントを取得するように子要素のサイズを拡大するための要素。
 */

import { Diary } from "~/lib/classes/Diary.ts";
import { DiaryCard } from "~/components/diaryCard.tsx";
import { PanelYearly } from "~/components/PanelYearly.tsx";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface Prop {
  yearArray: Array<JSX.Element>;
}

export function PanelOverflow(props: Prop) {
  let arrayDiaryCard: Array<JSX.Element> = [];
  const [yearArray, setYearArray] = useState(props.yearArray);

  const myRef = useRef<HTMLHeadingElement>(null);

  
  // useEffect(()=>{
  //   myRef.current?.scrollTo(100,100);
  //   console.log(myRef.current);
  // });
  

  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="PanelOverflow" ref={myRef}>
      {yearArray}
    </div>
  );
}
