const setup = require('../../../config/setup')
const jwt = require('jsonwebtoken')

function signJWT(user) {
    return new Promise((resolve, reject) => {
        var name = user.providerType == 'local' 
                 ? user.userName 
                 : String(user.fullName).substring(0, 19)
                 
        var expires = (Math.floor(Date.now() / 1000))
                    + (24        //24 horas / 1 dia
                     * 60        //60 minutos / 1 hora
                     * 60)       //60 segundo / 1 minuto

        if (user.process == 'reset') {
            expires = (Math.floor(Date.now() / 1000))
                    + (setup.resetMinutes   //Minutes      
                    *  60)                  //60 segundo 
        }
        
        const jwToken = jwt.sign({id: user.id,
                                  email: user.email,
                                  name: name,
                                  type : user.providerType,
                                  exp: expires
                                 }, 
                                 setup.token.secret, 
                                 
                                )                               
        return resolve(jwToken)
    })
    .catch((error) => console.log("Token Error: " + error))
}

function verifyToken(req, res, next) {

    if(!req.headers['x-access-token']){
        return res.status(401).send('Unauthorized request')
    }
    let payLoad = jwt.verify(req.headers['x-access-token'], req.app.get('secret')) 
    if(!payLoad){
        return res.status(401).send('Unauthorized request')
    }
    var current_time = Math.round(new Date() / 1000);

    
    if(payLoad.exp < current_time){
        return res.status(401).send('Unathorized request')
    }
    return next()
}

function getPayLoad(jwToken) {
    return new Promise((resolve, reject) => {      
        let payLoad = jwt.verify(jwToken, setup.token.secret)      
        if(!payLoad){
            reject('Unauthorized request')
        }      
        return resolve(payLoad)
    })        
}

module.exports = {
    signJWT,
    verifyToken,
    getPayLoad,
}

