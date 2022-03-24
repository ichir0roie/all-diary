import type { APIHandler } from 'aleph/types.d.ts'

import{selectTest}from "~/api/db/methods.ts"

export const handler: APIHandler = async ({ response }) => {
  var res=await selectTest();
  response.json(res);
}
