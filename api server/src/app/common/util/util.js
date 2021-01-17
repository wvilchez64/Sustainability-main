var fs = require('fs');

//!fs.existsSync(dir) && fs.mkdirSync(dir);
function createDirectory(path, cb) {
    var mode = 0777; //This parameter holds the recursive boolean value. The mode option is used to set the directory permission, by default it is 0777.
    fs.mkdir(path, mode, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}

module.exports = {
    createDirectory,
}