import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";

const client = await new Client().connect({
    hostname: "all-diary-2.cluster-cjldne3vgion.us-east-2.rds.amazonaws.com",
    username: "admin",
    db: "sys",
    password: "rOotpWlbdLW1UCb4itdV",
  });
  
// console.log(client);

// const res=await client.execute("select * from testTable;");
// console.log(res);

export async function selectTest(){
    const res=await client.execute("select * from test;");
    // console.log(res);
    return res;
}

// やはり、フロントからはうまく動かないので、rest apiを実装するほうが先か…？

selectTest();