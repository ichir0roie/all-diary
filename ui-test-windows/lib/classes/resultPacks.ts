
import {Diary}from "~/lib/classes/diary.ts";

export class ResultPackDaily{
    public past:Array<Diary>=[];
    public future:Array<Diary>=[];
    
}

export class ResultPackYearly{
    public future:Array<Diary>=[];
    public past:Array<Diary>=[];
    public baseDate:Diary|null=null;
    }
