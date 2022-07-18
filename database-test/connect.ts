// import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

// serve(async (req) => {
//   return new Response("Not Found", { status: 404 });
// });

import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.16.1/query/query.ts";

function printResult(result:QueryObjectResult<unknown>):void{
    const body = JSON.stringify(result.rows, null, 2);
    console.log(body)
}

async function loadSql(path:string):Promise<string>{
    let text=""
    text=await Deno.readTextFile('./sql/'+path+'.sql')
    return text
}

const client = new Client({
    user: "user",
    password:'password',
    database: "postgres",
    hostname: "localhost",
    port: 15432,
  });
  await client.connect();
  
  {
    const result = await client.queryObject(await loadSql('selectTest'));
    // console.log(result.rows); // [{id: 1, name: 'Carlos'}, {id: 2, name: 'Johnru'}, ...]
    printResult(result)
    
  }
  
  await client.end();

  Deno.exit();
