var path = require('path');
var fs = require('fs');
var Busboy = require('busboy');
const PQueue = require("p-queue");

function uploadFile(req, resp) {
    return new Promise((resolve, reject) => {
        var campaignId = 0
        var goalId = 0
        var description = ''
        var realName = ''
        var linkName = ''
        var dir = 'upload'
        var busboy = new Busboy({ headers: req.headers });
        const workQueue = new PQueue({ concurrency: 1 });

        async function handleError(fn) {
            workQueue.add(async () => {
                try {
                    await fn();
                } catch (e) {
                    console.log('fstream error' + e.message);
                    resp.writeHead(500, { 'Connection': 'close' });
                    req.unpipe(busboy);
                    workQueue.pause();
                    next(e);
                }
            })
        }

        busboy.on('field', function(realName, value, mimeType) {
            handleError(() => {
                if (realName == 'campaignId') {
                    campaignId = value
                    dir = dir + '/' + campaignId 
                    !fs.existsSync(dir) && fs.mkdirSync(dir)
                }
                if (realName == 'goalId') {
                    goalId = value
                    dir = dir + '/' + goalId
                    !fs.existsSync(dir) && fs.mkdirSync(dir)
                }
                if (realName == 'description') {
                    description = value
                }
            });
        });

        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            handleError(() => {
                realName = filename
                linkName = new Date().getTime().toString() 
                         + filename.substr(filename.length - 4)
                var saveTo = path.join(dir, linkName);
                file.pipe(fs.createWriteStream(saveTo));
            })
        })

        busboy.on('finish', function() {
            handleError(() => {
                resp.writeHead(200, { 'Connection': 'close' });
                resp.end("That's all folks!");
                resolve({goalId: goalId,
                         campaignId: campaignId,
                         description: description,
                         file: realName,
                         linkName : linkName})
            });
        })

        return req.pipe(busboy);
    })
}

module.exports = {
    uploadFile,
}


