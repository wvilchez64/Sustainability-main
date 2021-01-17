const sql = require("mssql"); 
var crypto = require('md5')
const setup = require('../../config/setup');
const token = require('../common/token/token');
class UserDao {

    constructor(db) {
        this._db = db;
    }

    getUserProviderById(userName, providerType) {
        const cmd = "select a.id, "
                  +        "a.fullName, "
                  +        "a.email, "
                  +        "a.userName, "
                  +        "a.providerType "
                  + "from dbo.[user] a "
                  + "where a.userName = '" + userName + "' "
                  + "and   a.providerType = '" + providerType + "' "
                  + "and   a.inactiveInd = 0";   
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]);
            });
        });
    }

    ckeckSignInUser(email, password) {
        const pw = crypto(password)
        const cmd = "select a.id, "
                  +        "a.fullName, "
                  +        "a.email, "
                  +        "a.userName, "
                  +        "a.providerType, "
                  +        "process = 'signin'"
                  + "from dbo.[user] a "
                  + "where a.email = '" + email + "' "
                  + "and   a.password = '" + pw + "' " 
                  + "and   a.inactiveInd = 0";  
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]);
            });
        });
    }

    ckeckSignInProvider(userName, providerType, email, fullName) {
        const cmd = "begin try "
                    + "begin tran; "
                    + "declare @w_id integer; "
                    + "if not exists(select null " 
                                  + "from [user] "
                                  + "where userName = '" + userName + "' " 
                                  + "and   providerType = '" + providerType + "' " 
                                  + "and   inactiveInd = 0) "
                    + "begin "                                      
                        + "insert into [user] (fullName, userName, email, password, providerType, inactiveInd) "
                        + "values ('" + fullName + "', " 
                                + "'" + userName + "', " 
                                + "'" + email + "', " 
                                + "'" + userName + "', " 
                                + "'" + providerType + "', " 
                                + "0); "
                        + "select @w_id = (select SCOPE_IDENTITY()); "
                        + "insert into userCampaign (userId, campaignId) "
                        + "values (@w_id, 0); "
                        + "insert into userGoal (userId, campaignId, goalId, percentageOfCompletion, notes) "
                        + "select @w_id, 0, Id, 0, '' "
                        + "from goal where campaignId = 0; "
                    + "end "
                    + "select id, "
                    +        "fullName, "
                    +        "userName, "
                    +        "email, "
                    +        "providerType, "
                    +        "process = 'signin'"
                    + "from [user] "
                    + "where userName = '" + userName + "' " 
                    + "and   providerType = '" + providerType + "' " 
                    + "and   inactiveInd = 0 "
                    + "commit tran; "
                  + "end try "
                  + "begin catch "
                    + "if (@@trancount > 0) rollback tran; "
                    + "select id = null, message = error_message(); "
                  + "end catch" 
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]);
            });
        });
    }

    addUser(userProfile) {
        const pw = crypto(userProfile.password)
        const cmd = "begin try "
                     + "begin tran; "
                     + "insert into [user] (fullName, userName, email, password, providerType, inactiveInd) "
                     + "values ('" + userProfile.fullName + "', " 
                             + "'" + userProfile.userName + "', " 
                             + "'" + userProfile.email + "', " 
                             + "'" + pw + "', " 
                             + "'" + userProfile.providerType + "', " 
                             + "0); "
                     + "declare @w_id integer = (select SCOPE_IDENTITY()); "
                     + "insert into userCampaign (userId, campaignId) "
                     + "values (@w_id, 0); "
                     + "insert into userGoal (userId, campaignId, goalId, percentageOfCompletion, notes) "
                     + "select @w_id, 0, Id, 0, '' "
                     + "from goal where campaignId = 0; "
                     + "select id = @w_id, "
                     +        "fullName = '" + userProfile.fullName + "', "
                     +        "userName = '" + userProfile.userName + "', "
                     +        "email = '" + userProfile.email + "', "
                     +        "providerType = '" + userProfile.providerType + "'; "
                     + "commit tran; "
                  + "end try "
                  + "begin catch "
                     + "if (@@trancount > 0) rollback tran; "
                     + "select id = null, message = error_message(); "
                  + "end catch"             
            return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]);
            });
        });
    }

    checkEmailTaken(email) {
        const cmd = "select isTaken = count(*), "
                  + "       userId = max(id) "
                  + "from dbo.[user] a "
                  + "where a.email = '" + email + "' "
                  + "and   a.providerType = 'local' "
                  + "and   a.inactiveInd = 0; ";   
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]) 
            });
        });
    }

    checkUserNameTaken(userName) {
        const cmd = "select isTaken = count(*), "
                  + "       userId = max(id) "
                  + "from dbo.[user] a "
                  + "where a.userName = '" + userName + "' "
                  + "and   a.providerType = 'local' "
                  + "and   a.inactiveInd = 0; ";   
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]) 
            });
        });
    }

    requestReset(email) {
        const cmd = 
          "declare @w_id integer = 0; "
        + "declare @w_email varchar(128); "
        + "declare @w_userName varchar(128); "
        + "declare @w_providerType varchar(15); "
        + "declare @w_resetKeySent datetime; "
        + "select @w_resetKeySent = case when (a.resetKeySent is null "
                                      + "or    a.resetKeySent <= getdate()) "
                                      + "then dateadd(mi, " 
                                                    + setup.resetMinutes.toString() 
                                                    + ", getdate()) "
                                      + "else null "      
                                 + "end, "
               + "@w_id = a.id, "
               + "@w_email = a.email, "
               + "@w_userName = a.userName, "
               + "@w_providerType = a.providerType "
               + "from [user] a "
               + "where a.email = '" + email + "' "
               + "and   a.providerType = 'local' "
               + "and   a.inactiveInd = 0 "
        + "if  @@rowcount > 0 "
        + "and @w_resetKeySent is not null "
        + "begin "
           + "update a set resetKeySent = @w_resetKeySent "
           + "from [user] a "
           + "where a.id = @w_id "
        + "end "
        + "select id = @w_id, "
               + "userName = @w_userName, "
               + "email = @w_email, "
               + "providerType = @w_providerType, "
               + "resetKeySent = @w_resetKeySent, "
               + "process = 'reset';"
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]);
            });
        });
    }

    resetKeyCheck(userId) {
       
        const cmd = "declare @w_resetKeySent datetime; "
                  + "select @w_resetKeySent = a.resetKeySent "
                  + "from [user] a "
                  + "where a.id = " +userId + " "
                  + "and   a.inactiveInd = 0 "  
                  + "and   a.resetKeySent is not null "
                  + "and   a.resetKeySent <= getdate(); "
                  + "select resetKeySent = @w_resetKeySent; "  
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]) 
            });
        });
    }

    newPassword(userId, password) {
        const pw = crypto(password)
        
        const cmd = "declare @w_resetKeySent datetime; "
                  + "update a set password = '" + pw + "', "
                               + "resetKeySent = null, "
                               + "@w_resetKeySent = a.resetKeySent "
                  + "from [user] a "
                  + "where a.id = " +userId + " "
                  + "and   a.inactiveInd = 0 "  
                  + "and   a.resetKeySent is not null "
                  + "and   a.resetKeySent > getdate(); "
                  + "select resetKeySent = @w_resetKeySent; "  

            return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.recordset[0]) 
            });
        });
    }
}    
module.exports = UserDao;