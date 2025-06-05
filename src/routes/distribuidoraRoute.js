import distribuidoraController from "../controllers/distribuidoraController.js";

export default(app) => {
    app.get('/distribuidora/:id', distribuidoraController.get);
    app.post('/distribuidora', distribuidoraController.persist);
    app.patch('/distribuidora/:id', distribuidoraController.persist);
    app.delete('/distribuidora/:id', distribuidoraController.destroy);
    app.get('/distribuidora', distribuidoraController.get);
}