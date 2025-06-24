import Avaliacao from "./avaliacaoModel.js";
import Desenvolvedora from "./desenvolvedoraModel.js";
import Distribuidora from "./distribuidoraModel.js";
import Genero from "./generoModel.js";
import Jogo from "./jogoModel.js";
import JogoGenero from "./jogoGeneroModel.js";

// Definir relacionamentos N:M entre Jogo e Genero
Jogo.belongsToMany(Genero, {
    through: JogoGenero,
    foreignKey: 'id_jogo',
    otherKey: 'id_genero',
    as: 'generos'
});

Genero.belongsToMany(Jogo, {
    through: JogoGenero,
    foreignKey: 'id_genero',
    otherKey: 'id_jogo',
    as: 'jogos'
});

// Comentado para evitar recriar as tabelas e perder dados
// (async () => {
//     await Distribuidora.sync({ force: true })
//     await Desenvolvedora.sync({ force: true })
//     await Genero.sync({ force: true });
//     await Jogo.sync({ force: true })
//     await JogoGenero.sync({ force: true })
//     await Avaliacao.sync({ force: true })
// })();