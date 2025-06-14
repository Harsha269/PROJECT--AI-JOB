const authorizeRoles=(...allowedRoles)=>{
    return (req ,res ,next)=>{
        if(!allowedRoles.includes(req.userRole)){
            return res.status(403).send({
                message : "Forbidden: access denied"
            })
        }
        next()
    }

}
module.exports =authorizeRoles