import avaliacaoRoute from "./avaliacaoRoute.js";
import desenvolvedoraRoute from "./desenvolvedoraRoute.js";
import distribuidoraRoute from "./distribuidoraRoute.js";
import generoRoute from "./generoRoute.js";
import jogoRoute from "./jogoRoute.js";

function Routes(app){
    desenvolvedoraRoute(app)
    distribuidoraRoute(app)
    generoRoute(app)
    jogoRoute(app)
    avaliacaoRoute(app)
}

export default Routes;