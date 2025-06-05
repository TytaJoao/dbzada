import Avaliacao from "./avaliacaoModel.js";
import Desenvolvedora from "./desenvolvedoraModel.js";
import Distribuidora from "./distribuidoraModel.js";
import Genero from "./generoModel.js";
import Jogo from "./jogoModel.js";


(async () => {
    await Distribuidora.sync({ force:true })
    await Desenvolvedora.sync({ force:true })
    await Genero.sync({ force: true });
    await Jogo.sync({force:true})
    await Avaliacao.sync({force:true})
})();