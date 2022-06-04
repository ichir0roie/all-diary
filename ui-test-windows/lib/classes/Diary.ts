export class Diary{
    id:string;
    date:Date;
    text:string;
    constructor(id:string|null,date:Date|null,text:string|null){
        this.id =id==null? "":id;
        this.date=date==null?new Date(2000,1,1):date;
        this.text=text==null?"":text;
    }   
}