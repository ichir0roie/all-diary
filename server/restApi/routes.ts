import { Router } from "./deps.ts";

import {selectTest}from "../getData.ts"

const env = Deno.env.toObject()
const PORT = env.PORT || 3000;
const HOST = env.HOST || 'localhost';

const router = new Router();

router.get("/api/v1/hello", async (context) => {
    var res=await selectTest()
    context.response.body = res.rows;
});

export default router;