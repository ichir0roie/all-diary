import { useCallback, useEffect, useState } from 'react'

import Card from '~/components/card.tsx'



/*
第1段階として、固定のマップ済みの2次元テーブルを出力する。

最終的な機能として、データを受け取る、もしくは取得したデータ配列に従って、テーブルを生成して出力する必要がある。
*/

/*
そういえば、tsでjsx記述はできないんだったか？
*/

// export default function useCounter(){

//   const CardArray=[
//     [Card("1"),Card("2"),Card("3"),Card("4")]
//    ]

//    const CardArrayComp=CardArray.map((number) =>
//    <li >
//      {number}
//    </li>
//    );

//   return []
// }
