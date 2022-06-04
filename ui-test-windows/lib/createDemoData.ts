import {Diary} from "./classes/Diary.ts"

export class CreateDemoData{
    array:Array<Array<Diary>>=[];
    constructor(size:number,years:number) {
        const today:Date=new Date(new Date().toLocaleString("jp",{timeZone:"Asia/Tokyo"}));
        let id=0;
        for(let  cy=0;cy<years;cy++){
            let ta:Array<Diary>=[];
            for(let cd=0;cd<size;cd++){
                let y=today.getFullYear()-cy;
                let m=getRandomInt(0,11);
                let d=getRandomInt(1,31);
                //HACK
                if(cy==0){
                    m=getRandomInt(0,today.getMonth()-1);
                    d=getRandomInt(1,today.getDate()-1);
                }
                
                const nDate=new Date(y,m,d);
    
                const diary:Diary=new Diary(id.toString(),nDate,cd.toString()+" : "+nDate.toDateString());
                ta.push(diary);
                id+=1;
                
        
            }
            ta=ta.sort(function(a:Diary,b:Diary){
                return b.date.getTime() - a.date.getTime();
            });
            this.array.push(ta);
        }
    }
}

function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }