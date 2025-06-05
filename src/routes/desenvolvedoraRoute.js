import desenvolvedoraController from "../controllers/desenvolvedoraController.js";

export default(app) => {
    app.get('/desenvolvedora/:id', desenvolvedoraController.get);
    app.post('/desenvolvedora', desenvolvedoraController.persist);
    app.patch('/desenvolvedora/:id', desenvolvedoraController.persist);
    app.delete('/desenvolvedora/:id', desenvolvedoraController.destroy);
    app.get('/desenvolvedora', desenvolvedoraController.get);
}