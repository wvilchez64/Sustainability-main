const UserCampaignDao = require('../infra/UserCampaignDao');
const db = require('../../config/database');
class UserCampaignController {

    getCampaignsByUser() {
        return function(req, resp) { 
            const userId = req.params.userId; 
            const userCampaignDao = new UserCampaignDao(db);
            userCampaignDao.getCampaignsByUser(userId)
            .then(result => {
                return resp.status(200).send(result);
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }
}    
module.exports = UserCampaignController;
