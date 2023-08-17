import fastify from "fastify";
import admRoutes from "./routes/admRoutes"
import empRoutes from "./routes/empRoutes";
import fichaRoutes from "./routes/fichaRoutes";

const app = fastify();

app.register(require("@fastify/formbody"));

admRoutes(app);
empRoutes(app);
fichaRoutes(app);

app.listen({
    host: "0.0.0.0",
    port: 3333
}).then(() => {
    console.log("Server running on http://localhost:3333");
})

