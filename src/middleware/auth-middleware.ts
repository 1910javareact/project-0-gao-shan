export function authorization(authRoles:string[]){
    //modify user module to include role as some type of value to make sure that some type of value exits in our user model
    return (req,res,next)=>{
        let isAuth = false
        if(!req.session.user){
            res.status(401).send('Please Login')
            return
        }
        for(let userRole of req.session.user.roles){
            if(authRoles.includes(userRole)){
                isAuth = true
            }
        }
        if(isAuth){
            next()
        }else{
            res.status(403).send('You are unauthorized for this endpoint') 
        }
    }
}