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

const viewLengthDay = 10;
const viewLengthYear = 10;
// const ad=new AccessDiary();
const ad = new AccessDiaryLocal();
const initData = ad.getRange(viewLengthYear, viewLengthDay);


export function ViewDiary() {
  console.log("call ViewDiary.");
  const refViewDiary = useRef<HTMLHeadingElement>(null);
  // const refOfP=useRef<RefObjOverflowPanel>(null);

  let viewPosition = 0;
  const [init, setInit] = useState(false);

  // const [diaryData,setDiaryData] =useState(ad.getRange(viewLengthYear,viewLengthDay)) ;// this is calc anytime.
  const [diaryData, setDiaryData] = useState(initData);

  const baseDate = new Date();

  //todo スクロールポジションとデータ管理はすべてここでできる。

  function onScroll(ev: React.UIEvent<HTMLDivElement>) {
    const d = new Date();
    console.log("Log : " + d.toTimeString());

    const scrollMaxY = ev.currentTarget.scrollHeight -
      ev.currentTarget.clientHeight;
    const scrollMaxX = ev.currentTarget.scrollWidth -
      ev.currentTarget.clientWidth;

    const marginSizeX = 100;
    const cardSizeX = 200;
    const marginSizeY = 100;
    const cardSizeY = 200;

    if (ev.currentTarget.scrollLeft < marginSizeX) {
      const added = addYear(true);
      if (added) ev.currentTarget.scrollLeft = marginSizeX + cardSizeX;
    } else if (ev.currentTarget.scrollLeft > scrollMaxX - marginSizeX) {
      const added = addYear(false);
      if (added) {
        ev.currentTarget.scrollLeft = scrollMaxX - marginSizeX - cardSizeX;
      }
    }
    if (ev.currentTarget.scrollTop < marginSizeY) {
      const added = addDays(true);
      if (added) ev.currentTarget.scrollTop = marginSizeY + cardSizeY;
    } else if (ev.currentTarget.scrollTop > scrollMaxY - marginSizeY) {
      const added = addDays(false);
      if (added) {
        ev.currentTarget.scrollTop = scrollMaxY - marginSizeY - cardSizeY;
      }
    }
    setDiaryData([...diaryData]);
    // console.log(diaryData);
    // console.log(diaryData.length);
  }

  function addYear(isFuture: boolean): Boolean {
    console.log("add year vd.");
    // refOfP.current?.addYear(isFuture);
    let tgtYear = 0;
    if (isFuture) {
      tgtYear = diaryData[0][0].date.getFullYear() + 1;
    } else {
      tgtYear = diaryData[diaryData.length - 1][0].date.getFullYear() - 1;
    }
    const diaryArray = ad.getYearlyData(tgtYear, baseDate, viewLengthDay);
    if (diaryArray != null) {
      // diaryData.push(diaryArray);
      if (isFuture) {
        diaryData.splice(-1);
        diaryData.unshift(diaryArray);
      } else {
        diaryData.shift();
        diaryData.push(diaryArray);
      }
    } else {
      return false;
    }
    return true;
  }
  function addDays(isFuture: boolean): boolean {
    console.log("add day vd.");
    if (isFuture) {
      viewPosition += 1;
    } else {
      viewPosition -= 1;
    }
    let years = new Array<number>();
    diaryData.forEach((year) => {
      years.push(year[0].date.getFullYear());
    });
    let daysYearly = ad.getDailyData(
      years,
      viewPosition,
      viewLengthDay,
      isFuture,
    );
    if (daysYearly != null) {
      for (let c = 0; c < daysYearly.length; c++) {
        if (isFuture) {
          diaryData[c].splice(-1);
          diaryData[c] = [...daysYearly[c], ...diaryData[c]];
        } else {
          diaryData[c].shift();
          diaryData[c] = [...diaryData[c], ...daysYearly[c]];
        }
      }
    } else {
      return false;
    }
    return true;
    // refOfP.current?.addDays(isFuture);
  }

  useEffect(() => {
    if (!init) {
      console.log("init");
      refViewDiary.current?.scrollTo(100, 100);
      setInit(true);
    }
  });

  console.log(diaryData);

  return (
    // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
    // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
    <div className="ViewDiary" onScroll={onScroll} ref={refViewDiary}>
      <PanelOverflow data={diaryData} />
    </div>
  );
}
