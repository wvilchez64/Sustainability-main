const sql = require("mssql"); 
const setup = require('../../config/setup');
class UserGoalDao {

    constructor(db) {
        this._db = db;
    }

    getGoalsByCampaign(userId, campaignId){
        const cmd = "select id = a.id, "
                  +        "a.goalId, "
                  +        "b.code, "
                  +        "b.shortName, "
                  +        "b.name, " 
                  +        "b.urlDetail, "
                  +        "b.urlLogo, "
                  +        "b.campaignId, "
                  +        "a.notes, " 
                  +        "a.percentageOfCompletion "
                  + "from userGoal a "
                  + "inner join goal b "
                  + "on  a.goalId = b.id "
                  + "where a.userId = " + userId + " "
                  + "and   a.campaignId = " + campaignId + " "
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

    setGoalsPercentById(id, percent) {
        const cmd = "update a set percentageOfCompletion = " + percent + " "
                  + "from userGoal a "
                  + "where a.goalId = " + id + "; "
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve("userGoal Updated");
            });
        });
    }
}    
module.exports = UserGoalDao;