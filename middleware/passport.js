const JwtStrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const mongoose=require('mongoose')
const User=mongoose.model('user')

const options={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.secretkey
}

module.exports=passport=>{
    passport.use(
        new JwtStrategy(options,async(payload,done)=>{
        
            try{
                const user=await User.findById(payload.userId).select('name id');
                if(user){
                    return done(null, user,{ message: 'Logged in Successfully' })
                }
                else{
                    return done(null, false)
                }
            }
            catch(e){
                    console.log(e);
                    
            }
           
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.userId);
    })
}
