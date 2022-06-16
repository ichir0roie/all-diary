/**
 * 日記ビューのルート要素
 */

import React, {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { PanelOverflow } from "~/components/panelOverflow.tsx";

//コンポーネントはその機能を内部で完結する？ので、
//日記関連の表示機能はここがルートになる？

// import { AccessDiary } from "~/lib/accessDiary.ts";
import { AccessDiaryLocal } from "~/lib/accessDiaryLocal.ts";

import{setTestData}from "~/lib/test/setTestData.ts";

// setTestData(2010,2025,365);

// const ad=new AccessDiary();
let ad = new AccessDiaryLocal(10,10,1);
ad.setDataMap();
// const initData = ad.getRange();

export function ViewDiary() {
  console.log("view diary");

  const refViewDiary = useRef<HTMLHeadingElement>(null);
  // const refOfP=useRef<RefObjOverflowPanel>(null);

  let viewPosition = 0;
  const [init, setInit] = useState(false);

  // const [diaryData,setDiaryData] =useState(ad.getRange(viewLengthYear,viewLengthDay)) ;// this is calc anytime.
  const [diaryData, setDiaryData] = useState(ad.getDataArray());
  console.log(diaryData);

  const baseDate = new Date();

  //todo スクロールポジションとデータ管理はすべてここでできる。

  function onScroll(ev: React.UIEvent<HTMLDivElement>) {
    const d = new Date();

    const scrollMaxY = ev.currentTarget.scrollHeight -
      ev.currentTarget.clientHeight;
    const scrollMaxX = ev.currentTarget.scrollWidth -
      ev.currentTarget.clientWidth;

    const marginSizeX = 100;
    const cardSizeX = 200;
    const marginSizeY = 100;
    const cardSizeY = 200;

    if (ev.currentTarget.scrollLeft < marginSizeX) {
      const added = ad.moveYearlyData(true);
      if (added) ev.currentTarget.scrollLeft = marginSizeX + cardSizeX;
    } else if (ev.currentTarget.scrollLeft > scrollMaxX - marginSizeX) {
      const added = ad.moveYearlyData(false);
      if (added) ev.currentTarget.scrollLeft = scrollMaxX - marginSizeX - cardSizeX;
    }
    if (ev.currentTarget.scrollTop < marginSizeY) {
      const added = ad.moveDailyData(true);
      if (added) ev.currentTarget.scrollTop = marginSizeY + cardSizeY;
    } else if (ev.currentTarget.scrollTop > scrollMaxY - marginSizeY) {
      const added = ad.moveDailyData(false);
      if (added) ev.currentTarget.scrollTop = scrollMaxY - marginSizeY - cardSizeY;
    }
    setDiaryData(ad.getDataArray());
  }

  useEffect(() => {
    if (!init) {
      refViewDiary.current?.scrollTo(100, 100);
      setInit(true);
    }
  });


  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="ViewDiary" onScroll={onScroll} ref={refViewDiary}>
      <PanelOverflow data={diaryData} />
    </div>
  );
}
