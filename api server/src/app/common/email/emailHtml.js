const setup = require('../../../config/setup')

function requestReset(jwToken) {
    link = setup.webServer.protocol
         + "://"
         + setup.webServer.host
         + ":"
         + setup.webServer.port
         + setup.commonRoutes.resetPassword
         + '/' 
         + jwToken

    html = '<!DOCTYPE html>'
         + '<html>'
            + '<head>'
                + '<style type="text/css">'
                    + 'body, p {'
                        + 'margin:0px;'
                        + 'padding: 0px;'
                    + '}'
                + '</style>'
            + '</head>'
            + '<body>'
                + '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>'
                + '<p>Please click <a href="' + link + '">here</a> to be directed to a page to reset your password.</p>'
                + '<p>This link is only valid for the next 5 minutes. Thanks!</p>'
                + '<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>'
            + '</body>'
         + '</html>'
    return html    
}

module.exports = {
    requestReset
}
 
