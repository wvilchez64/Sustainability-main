const UserDao = require('../infra/UserDao');
const db = require('../../config/database');
const token = require('../common/token/token')
const sendEmail = require('../common/email/email')
const emailHtml = require('../common/email/emailHtml');
class BaseController {
  
    authLocal() {
        return function(req, res) {
            const email = req.body.email
            const password = req.body.password
            const userDao = new UserDao(db);
            userDao.ckeckSignInUser(email, password)
            .then(user => {
                if (!user) {
                    throw new error ('User name not found or Incorrect password!');
                }
                if (!user.id) {
                    throw new error ('User name not found or Incorrect password!');
                }
                return user
            }).then((user) => {
                return token.signJWT(user)
            }).then((jwToken) => {
                res.set('x-access-token', jwToken);
                return res.status(200).send({message: 'authenticated'})
            })
            .catch(error => {
                return res.status(500).send({message: error});
            });
        }
    }   
   
    authProvider() {
        return function(req, res) {
            const userName = req.body.id
            const providerType = String(req.body.provider).toLowerCase()
            const email = req.body.email
            const fullName = req.body.name 
            const userDao = new UserDao(db);
            userDao.ckeckSignInProvider(userName, providerType, email, fullName)
            .then((user) => {
                if (!user.id) {
                    throw new error ('User name not found!');
                }
                if (!user) {
                    throw new error ('User name not found!');
                }
                return user
            }).then((user) => {
                return token.signJWT(user)
            }).then((jwToken) => {
                res.set('x-access-token', jwToken);
                return res.status(200).send({message: 'authenticated'})
            })
            .catch(error => {
                return res.status(500).send({message: error});
            });
        }
    }    

    checkEmailTaken() {
        return function(req, resp) { 
            const email = req.params.email; 
            const userDao = new UserDao(db);
            userDao.checkEmailTaken(email)
            .then(result => {
                if (result.isTaken == 0) {
                    return resp.status(200).send(null)
                }
                return resp.status(200).send(result)
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }

    checkUserNameTaken() {
        return function(req, resp) { 
            const email = req.params.userName; 
            const userDao = new UserDao(db);
            userDao.checkUserNameTaken(email)
            .then(result => {
                if (result.isTaken == 0) {
                    return resp.status(200).send(null)
                }
                return resp.status(200).send(result)
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }

    signUp() {
        return function(req, resp) { 
            const userProfile = {
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                providerType: 'local',
            }
            const userDao = new UserDao(db);
            userDao.addUser(userProfile)
            .then(result => {
                if (!result.id) {
                    throw new Error('Internal error!')
                }
                return resp.status(200).send({message: 'User inserted'});
            })
            .catch(error => {
                return resp.status(500).send({message: error});
            })
        }
    }

    requestReset() {
        return function(req, resp) { 
            const email = req.body.email
            const userDao = new UserDao(db);
            userDao.requestReset(email)
            .then(result => {
                if (!result) {
                    throw new Error('Internal error!')
                }
                if (result.id == 0) {
                    throw new Error('Email does not exist')
                }
                if (!result.resetKeySent) {
                    throw new Error('You have an active reset password link, please check your email')
                }

                return token.signJWT(result)
            })
            .then(jwToken => {

                return emailHtml.requestReset(jwToken)
            })
            .then(html => {
                return sendEmail.sendEmail([email], 
                                           'Sustainability - Password Reset',
                                           html)
            })
            .then(()     => {
                return resp.status(200).send({message: 'Reset Password successfully.'})
            })
            .catch(error => {
                return resp.status(500).send({message: error.message});
            })
        }
    }

    validPasswordToken() {
        return function(req, resp) { 
            const jwToken = req.params.jwToken
            const userDao = new UserDao(db);
            token.getPayLoad(jwToken)
            .then(result => {
                if (!result) {
                    throw new Error('Unauthorized request')
                }
                return result
            })
            .then(user => { 
                return userDao.resetKeyCheck(user.id)
            })
            .then(result => {
                if (!result.resetKeySent) {
                    throw new Error('Reset your password again')
                }              
                return resp.status(200).send({message: 'Password Reset'})
            })
            .catch(error => {
                return resp.status(500).send({message: error.message});
            })
        }
    }

    newPassword() {
        return function(req, resp) { 
            const jwToken = req.body.jwToken
            const password = req.body.password
            const userDao = new UserDao(db);
            token.getPayLoad(jwToken)
            .then(result => {
                if (!result) {
                    throw new Error('Unauthorized request')
                }
                return result
            })
            .then(user => { 
                return userDao.newPassword(user.id, password)
            })
            .then(result => {
                if (!result.resetKeySent) {
                    throw new Error('Reset your password again')
                }              
                return resp.status(200).send({message: 'Password Reset'})
            })
            .catch(error => {
                return resp.status(500).json({message: error.message});
            })
        }
    }
}

module.exports = BaseController;
    
