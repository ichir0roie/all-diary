/**
 * スクロールイベントを取得するように子要素のサイズを拡大するための要素。
 */

import { Diary } from "~/lib/classes/models.ts";
import { DiaryCard } from "~/components/diaryCard.tsx";
import { PanelYearly } from "~/components/PanelYearly.tsx";
import { RefObjOverflowPanel,RefObjPanelYearly } from "~/lib/classes/viewDiaryInterfaces.ts";

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
  data: Array<Array<Diary>>;
}

//https://stackoverflow.com/questions/37949981/call-child-method-from-parent
export const PanelOverflow =  (props: Prop) => {
   
    let tempPanels=new Array<JSX.Element>();
    function initializePanelAndRef(){
      props.data.forEach(diaryArray=>{
        const year=diaryArray[0].date.getFullYear(); 
        const panel=<PanelYearly
          diaryArray={diaryArray}
        />
        tempPanels.push(panel);  
      });
    }
    initializePanelAndRef();
 
    return (
      // <div className="card-frame" key={props.testKey.toString()}>個々でやっても意味なかった。
      // https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/
      <div className="PanelOverflow">
        {tempPanels}
      </div>
    );
  }
