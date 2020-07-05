const app = require('./app');

app.listen(app.get('port'), (req, res) =>{
    console.log(`Server on port ${app.get('port')}`)
});