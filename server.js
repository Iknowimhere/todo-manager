import http from 'http'
import app from './app.js';
let PORT=process.env.PORT
let server=http.createServer(app)

server.listen(PORT,(err)=>{
    if(err)console.log(err);
    console.log(`Server is on port ${PORT}...`);
})