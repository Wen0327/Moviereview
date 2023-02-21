const crypto = require('crypto');

exports.sendError = (res,error, statuscode = 401)=>{
    res.status(statuscode).json({error});
}

exports.generateRandomByte = ()=>{
    return new Promise((resolve,reject)=>{
        crypto.randomBytes(30,(err,buff)=>{
            if(err) reject(err)
            const buffString = buff.toString('hex');

            console.log(buffString)
            resolve(buffString)
          })
    })
}

exports.handleNotFound = (req,res) =>{
    this.sendError(res,'Not found!',404)
}