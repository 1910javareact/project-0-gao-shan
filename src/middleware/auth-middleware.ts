//we are going to leverage the factory design pattern
//we are going to build a middleware factory
//we will give some config
//it will 'build' a middleware function using that config

export function auth(authRoles: string[]) {//authRoles, is our config
//I want to return a middleware function
//generated using these authoRoles

    return (req, res, next) => {
        let isAuth = false;
        // lets check for being logged in
        if (!req.session.user) {
            res.status(401).send('Please Login');
            return;
        }
        const rolesResponse:string[] = req.session.user.role
        console.log(rolesResponse)
        for (const userRole of rolesResponse) {
            if (authRoles.includes(userRole)) {
                isAuth = true;
            }
        }
        if (isAuth) {
            next();
        } else {
            res.status(403).send('You are unauthorized for this endpoint');
        }
    };
}