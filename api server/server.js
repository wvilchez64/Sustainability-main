const app = require('./src/config/init.js');

const host = app.get('host');
const port = app.get('port');

app.listen(port, host, function(){
    console.log('Server is running on ' + host + ':' + port)
}) 

