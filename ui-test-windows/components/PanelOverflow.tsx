/**
 * スクロールイベントを取得するように子要素のサイズを拡大するための要素。
 */

import { Diary } from "~/lib/classes/diary.ts";
import { DiaryCard } from "~/components/diaryCard.tsx";
import { PanelYearly } from "~/components/PanelYearly.tsx";
import { RefObjOverflowPanel } from "~/lib/classes/viewDiaryInterfaces.ts";

import { AccessDiary } from "~/lib/accessDiary.ts";

import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
//https://stackoverflow.com/questions/60554808/react-useref-with-typescript-and-functional-component

export interface Prop {
  yearlyArray: Array<JSX.Element>;
}

//https://stackoverflow.com/questions/37949981/call-child-method-from-parent
export const PanelOverflow = forwardRef(
  (props: Prop, ref: Ref<RefObjOverflowPanel>) => {
    useImperativeHandle(ref, () => ({ addYear }));
    console.log("print ref");
    // console.log(props.ref);
    let arrayDiaryCard: Array<JSX.Element> = [];
    const [yearlyArray, setYearlyArray] = useState(props.yearlyArray);

    const myRef = useRef<HTMLHeadingElement>(null);

    function addYear(isFuture: boolean) {
      const ad = new AccessDiary();
      let tgtYear = 0;
      console.log(yearlyArray);
      if (isFuture) {
        tgtYear = yearlyArray[0].props.year + 1;
      } else {
        tgtYear = yearlyArray[yearlyArray.length - 1].props.year - 1;
      }
      const diaryArray = ad.getYearlyData(tgtYear, new Date(), 10);
      const yearlyPanel = (
        <PanelYearly
          diaryArray={diaryArray}
          year={diaryArray[0].date.getFullYear()}
        />
      );
      if (isFuture) {
        yearlyArray.unshift(yearlyPanel);
      } else {
        yearlyArray.shift();
        // yearlyArray.slice(1);
        yearlyArray.push(yearlyPanel);
      }
      setYearlyArray([...yearlyArray]);
    }

    // useEffect(()=>{
    //   myRef.current?.scrollTo(100,100);
    //   console.log(myRef.current);
    // });

    return (
      // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
      // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
      <div className="PanelOverflow" ref={myRef}>
        {yearlyArray}
      </div>
    );
  },
);

export function PanelOverflowBK(props: Prop, ref: Ref<RefObjOverflowPanel>) {
  useImperativeHandle(ref, () => ({ addYear }));
  // console.log( "print ref");
  // console.log(props.ref);
  let arrayDiaryCard: Array<JSX.Element> = [];
  const [yearArray, setYearArray] = useState(props.yearlyArray);

  const myRef = useRef<HTMLHeadingElement>(null);

  function addYear(isFuture: boolean) {
    console.log("add year : " + isFuture);
  }

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
