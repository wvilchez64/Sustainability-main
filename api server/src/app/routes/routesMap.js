const setup = require('../../config/setup')

module.exports = {
  project: { 
    /*user_campaign*/
    'getCampaignsByUser':'/api/campaignsByUser/:userId',
    
    /*user_goal*/
    'setGoalsPercentById':'/api/setGoalsPercentById',
    'getGoalsByCampaign':'/api/goalsByCampaign/:userId/:campaignId',
  
    /*upload_file*/
    'uploadFile': '/api/uploadFile',
    'filesByUser': '/api/filesByUser/:campaignId/:goalId',
    'setInactiveFiles': '/api/setInactiveFiles', 
    'downloadFile': '/api/downloadFile' 

  },

  base: { 
    'authLocal':'/auth/local',
    'authProvider':'/auth/socialSignIn',
    'signUp':'/user/signup',
    'checkEmailTaken':'/user/email/:email',
    'checkUserNameTaken':'/user/userName/:userName',
    'requestReset':'/auth/requestReset',
    'validPasswordToken': '/auth/validPasswordToken/:jwToken',
    'newPassword': '/auth/newPassword',
  },
}


 
