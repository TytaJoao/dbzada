import jogoController from "../controllers/jogoController.js";

export default(app) => {
    app.get('/jogo/:id', jogoController.get);
    app.post('/jogo', jogoController.persist);
    app.patch('/jogo/:id', jogoController.persist);
    app.delete('/jogo/:id', jogoController.destroy);
    app.get('/jogo', jogoController.get);
}