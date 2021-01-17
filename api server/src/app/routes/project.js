const UserGoalController = require('../controllers/UserGoal');
const userGoalController = new UserGoalController();

const UserCampaignController = require('../controllers/UserCampaign');
const userCampaignController = new UserCampaignController();

const UploadFilesController = require('../controllers/UploadFiles');
const uploadFilesController = new UploadFilesController();

const token = require('../common/token/token')
module.exports = (app) => { 
    const routes = require('./routesMap');
    const projectRoutes = routes.project;

    /*user_campaign*/
    app.get(projectRoutes.getGoalsByCampaign, token.verifyToken, userGoalController.getGoalsByCampaign())
    app.put(projectRoutes.setGoalsPercentById, token.verifyToken, userGoalController.setGoalsPercentById())

    /*user_goal*/
    app.get(projectRoutes.getCampaignsByUser, token.verifyToken, userCampaignController.getCampaignsByUser())
    
    /*upload_file*/
    app.post(projectRoutes.uploadFile, token.verifyToken, uploadFilesController.uploadFile());
    app.get(projectRoutes.filesByUser, token.verifyToken, uploadFilesController.filesByUser())
    app.put(projectRoutes.setInactiveFiles, token.verifyToken, uploadFilesController.setInactiveFiles())
    app.post(projectRoutes.downloadFile, token.verifyToken, uploadFilesController.downloadFile());
};