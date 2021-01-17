const UploadFileDao = require('../infra/UploadFileDao');
const file = require('../common/file/file')
const db = require('../../config/database');
class UserCampaignController {

    uploadFile() {
        return function(req, resp) { 
            const uploadFileDao = new UploadFileDao(db);
            file.uploadFile(req, resp)
            .then(result => {
                return uploadFileDao
                    .uploadFile(result.campaignId, result.goalId, result.file, 
                                result.description, result.linkName)
            })
            .catch(error => {
                return resp.status(500).send({message: error.message});
            })
        }
    }

    downloadFile() {
        return function(req, res) { 
            const uploadFileDao = new UploadFileDao(db);
            const fileId = req.body.fileId;
            uploadFileDao.downloadFile(fileId)
            .then(result => {
                if (!result) {
                    throw new Error('Internal error!')
                } 
                let path = 'upload/' 
                         + result.campaignId.toString() + '/' 
                         + result.goalId.toString() + '/' 
                         + result.linkFile
                        
                return res.download(path)
            })
            .catch(error => {
                return res.status(500).send({message: error.message});
            })
        }
    }

    filesByUser() {
        return function(req, resp) { 
            const campaignId = req.params.campaignId; 
            const goalId = req.params.goalId; 
            const uploadFileDao = new UploadFileDao(db);
            uploadFileDao.filesByUser(campaignId, goalId)
            .then(result => {
                return resp.status(200).send(result);
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }

    setInactiveFiles() {
        return function(req, resp) { 
            const id = req.body.params.id; 
            let idList = ''
            let sep = ' '
            id.forEach(function(obj) {
               if (obj.inactiveInd === true) {
                  idList = String(idList + (sep + String(obj.id).toString())).trim()
                  sep = ', '
               }
            });
            const uploadFileDao = new UploadFileDao(db);
            uploadFileDao.setInactiveFiles(idList)
            .then(result => {
                if (!result) {
                    throw new Error('Internal error!')
                }
                if (result.rCount == 0) {
                    throw new Error('Internal error!')
                }
                return resp.status(200).send(result);
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }
}    
module.exports = UserCampaignController;