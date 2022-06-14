export class Diary{
    id:string;
    date:Date;
    text:string;
    constructor(id:string|null,dateTimeString:string|null,text:string|null){
        this.id =id==null? "":id;
        if(dateTimeString==null||dateTimeString==undefined||dateTimeString.length<=0){
            this.date=new Date(1997,5,12);
        }else{
            this.date=new Date(dateTimeString);
        }
        // this.date=date==null?new Date(2000,1,1):date;
        this.text=text==null?"":text;
    }   
}
