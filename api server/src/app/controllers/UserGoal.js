const UserGoalDao = require('../infra/UserGoalDao');
const db = require('../../config/database');
class UserGoalController {
    
    getCampaignsByUser() {
        return function(req, resp) { 
            const userId = req.params.userId; 
            const userGoalDao = new UserGoalDao(db);
            userGoalDao.getCampaignsByUser(userId)
            .then(result => {
                return resp.status(200).send(result);
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }

    getGoalsByCampaign() {
        return function(req, resp) { 
            const userId = req.params.userId; 
            const campaignId = req.params.campaignId; 
            const userGoalDao = new UserGoalDao(db);
            userGoalDao.getGoalsByCampaign(userId, campaignId)
            .then(result => {
                return resp.status(200).send(result);
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }

    setGoalsPercentById() {
        return function(req, resp) { 
            const id = req.body.params.id;
            const percent = req.body.params.percent;
            const userGoalDao = new UserGoalDao(db);
            userGoalDao.setGoalsPercentById(id, percent)
            .then(result => {
                return resp.status(200).send({message: result});
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }
}    
module.exports = UserGoalController;
