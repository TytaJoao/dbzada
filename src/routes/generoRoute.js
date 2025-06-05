import generoController from "../controllers/generoController.js";

export default(app) => {
    app.get('/genero/:id', generoController.get);
    app.post('/genero', generoController.persist);
    app.patch('/genero/:id', generoController.persist);
    app.delete('/genero/:id', generoController.destroy);
    app.get('/genero', generoController.get);
}