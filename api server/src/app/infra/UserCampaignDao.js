const sql = require("mssql"); 
const setup = require('../../config/setup');
class UserCampaignDao {

    constructor(db) {
        this._db = db;
    }

    getCampaignsByUser(userId){
        const cmd = "select b.id, "
                  +        "description = b.name "
                  + "from userCampaign a "
                  + "inner join campaign b "
                  + "on  a.campaignId = b.id "
                  + "where a.userid = " + userId + " "
                  + "and   a.inactiveInd = 0 "
                  + "and   b.inactiveInd = 0; "
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset);
            });
        });

    }
}  
module.exports = UserCampaignDao;  