import { Application } from "./restApi/deps.ts";
import router from "./restApi/routes.ts";

const env = Deno.env.toObject()
const PORT = env.PORT || 8087;
const HOST = env.HOST || 'localhost'

const app = new Application();
// app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
// app.use(_404);

console.log(`http://localhost:${PORT}`);

app.listen(`${HOST}:${PORT}`);
