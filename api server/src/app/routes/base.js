const BaseController = require('../controllers/Base.js');
const baseController = new BaseController();
module.exports = (app) => {
    const routes = require('./routesMap.js');
    const baseRoutes = routes.base;

    app.post(baseRoutes.authLocal, baseController.authLocal());
    app.post(baseRoutes.authProvider, baseController.authProvider());
    app.get(baseRoutes.checkEmailTaken, baseController.checkEmailTaken());
    app.get(baseRoutes.checkUserNameTaken, baseController.checkUserNameTaken());
    app.post(baseRoutes.signUp, baseController.signUp());
    app.post(baseRoutes.requestReset, baseController.requestReset());
    app.get(baseRoutes.validPasswordToken, baseController.validPasswordToken());
    app.post(baseRoutes.newPassword, baseController.newPassword());

    app.get('/Home', (req, res) => {
         res.send('Authenticated');
    });
};