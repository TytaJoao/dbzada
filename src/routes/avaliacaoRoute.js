import avaliacaoController from "../controllers/avaliacaoController.js";

export default(app) => {
    app.get('/avaliacao/:id', avaliacaoController.get);
    app.post('/avaliacao', avaliacaoController.persist);
    app.patch('/avaliacao/:id', avaliacaoController.persist);
    app.delete('/avaliacao/:id', avaliacaoController.destroy);
    app.get('/avaliacao', avaliacaoController.get);
}