exports.sendError = (res,error, statuscode = 401)=>{
    res.status(statuscode).json({error});
}