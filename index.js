const express=require('express')
const  logger=require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose');
const cors= require('cors');
const passport = require('passport');
const fs=require('fs')
const https=require('https')
const path=require('path')
const {ExtractJwt,Strategy }=require('passport-jwt');
require('dotenv/config');
const api = process.env.API_URL;
mongoose.connect(process.env.CONNECTION_STRING,{
    dbName:'melodyHarmony'
})
.then(()=>{
    console.log('database connection is ready')
})
.catch((err) => { 
    console.log(err);
})
const app = express();
app.use(logger(process.env.LOGGER))
app.use(helmet())
app.use(cors({
    origin:"*"
}))
app.use(express.json({
    limit:"1mb"
}));
app.use(express.urlencoded({extended:true}))



passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((id,done)=>{
    console.log(id)
    done(null,id)
})
const jwtOpts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.SECRET_KEY
}
passport.use(
    new Strategy(
        jwtOpts,
        async(jwtPayload,done)=>{
            try{
                console.log('jwtPayload',jwtPayload.id)
                const user=await Infolog.findOne({_id:jwtPayload.id})
                console.log('user',user)
                express.request.decoded=user
                if(user){
                    done(null,user)
                }else{
                    done(errorHandling.authorizationNotValid)
                }
            }catch(err){
                return done(err,false)
            }
        }
    )
)
// app.use(`${api}`,router)
const key=fs.readFileSync(path.join(__dirname,"./certs/key.pem")).toString()
const cert= fs.readFileSync(path.join(__dirname,"./certs/cert.pem")).toString()
const server = https.createServer({key:key,cert:cert},app)
server.listen(process.env.PORT,()=>{console.log("Listen "+process.env.PORT)})
