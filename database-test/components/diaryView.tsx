// support jsx on deno deploy
/** @jsxImportSource https://esm.sh/react@18.2.0 */

import{Diary} from "~/classes/DataBaseModels.ts";

export default function Header(d:Diary) {
  return (
    <div>
      <tbody>
        <tr>
          <td>{d.id}</td>
          <td>{d.diary_date?.toDateString()}</td>
          <td>{d.diary_text}</td>
          <td>{d.comment_position}</td>
          <td>{d.is_comment}</td>
        </tr>
      </tbody>
    </div>
  );
}
