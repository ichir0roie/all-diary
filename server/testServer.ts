import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const addr = ":8085";
console.log(`HTTP server listening on http://localhost${addr}`)

serve((request: Request) => {
  const { pathname } = new URL(request.url);

  return new Response(`Hello world from ${pathname}`);
}, { addr });