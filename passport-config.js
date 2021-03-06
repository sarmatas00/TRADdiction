// configuration της βιβλιοθηκης passport, η οποια αναλαμβανει το validation της συνδεσης ενος χρηστη στην εφαρμογη
// και στην πλοηγηση του στις διαφορες σελιδες της εφαρμογης. Η βιβλιοθηκη χρησιμοποιειται εκτενως σε ολα σχεδον τα requests
// που μπορουν να γινουν στη σελιδα

const { authenticate } = require("passport/lib")
const bcrypt=require("bcrypt")
const LocalStrategy=require("passport-local").Strategy



function initialize(passport,getUserByEmail,getUserById){
    const authenticateUser=async (email,password,done)=>{
        const user=await getUserByEmail(email)
        if(user==null){
            return done(null,false,{message:"No user with that email!"})
        }

        try{
            if(await bcrypt.compare(password,user.password) ){
                return done(null,user)
            }else{
                return done(null,false,{message:"Password incorrect!"})
            }
        }catch(e){
            return done(e)
        }
    }
    
    

    passport.use("local",new LocalStrategy({usernameField:"email"},authenticateUser))
    // passport.use("admin-local",new LocalStrategy({usernameField:"email"},authenticateAdmin))
    passport.serializeUser((user,done)=>done(null,user.id))
    passport.deserializeUser(async (id,done)=>done(null,await getUserById(id)))

}


module.exports=initialize