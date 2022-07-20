import { serve } from "aleph/server";
import ssr from "aleph/react-ssr";

// pre-import route modules
import routes from "./routes/_export.ts";

serve({
  baseUrl: import.meta.url,
  router: {
    glob: "./routes/**/*.{tsx,ts}",
    routes,
  },
  unocss: "preset",
  ssr,
});


// TODO とりあえず、rest apiチックに実装して画面にデータを表示できるようにする。