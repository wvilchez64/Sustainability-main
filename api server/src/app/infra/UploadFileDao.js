const sql = require("mssql"); 
const setup = require('../../config/setup');
class UploadFileDao {

    constructor(db) {
        this._db = db;
    }

    uploadFile(campaignId, goalId, file, description, linkFile){
        const cmd = "insert into uploadFile (campaignId, goalId, fileName, description, linkFile) "
                  + "values (" + campaignId + ", " 
                               + goalId + ", " 
                         + "'" + file + "', " 
                         + "'" + description + "', " 
                         + "'" + linkFile + "'); "
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve('File upload');
            });
        });
    }

    downloadFile(fileId){
        const cmd = "select campaignId, goalId, fileName, linkFile "
                  + "from uploadFile "
                  + "where id = " + fileId
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

    filesByUser(campaignId, goalId) {
        const cmd = "select a.id, "
                  + "       a.campaignId, "
                  + "       a.goalId, "        
                  + "       a.fileName, "
                  + "       a.description, "
                  + "       dateCreated = convert(varchar(30), a.dateCreated, 120), "
                  + "       a.inactiveInd "
                  + "from uploadFile a with (index(ndx_uploadFile)) "
                  + "where a.campaignId = " + campaignId + " "
                  + "and   a.goalId = " + goalId + " "
                  + "and   a.inactiveInd = 0; "; 
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
            if (error) {
                return reject(error);
            }
                return resolve(result.recordset) 
            });
        });
    };

    setInactiveFiles(id) {
        const cmd = "declare @w_rowCount integer = 0; "
                  + "update a set inactiveInd = 1 "
                  + "from uploadFile a "
                  + "where a.id in (" + id + ") "
                  + "and   a.inactiveInd = 0; "
                  + "select rCount = @@rowcount"; 
        return new Promise((resolve, reject) => {
            new sql.Request(this._db)
            .query(cmd, (error, result) => {
            if (error) {
                return reject(error);
            }
                return resolve(result.recordset) 
            });
        });
    };
}  
module.exports = UploadFileDao;  