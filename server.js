const next = require('next');
const routes = require('./routes');
const env = require('./env');
const app = next({dev: process.env.NODE_ENV !== 'production'});
const handler = routes.getRequestHandler(app);


const PORT = env.PORT;

// Without express
const {createServer} = require('http');
app.prepare().then(() => {
    createServer(handler).listen(PORT, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:'+PORT)
    })
});