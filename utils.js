const jwt = require('jsonwebtoken');

module.exports={
    createToken :function(payload){
        const token = jwt.sign({payload},process.env.JWT_TOKEN,{expiresIn:"1h"});
        return token;
    }
}
    // verifyToken:function(token){
    //     const decoded=jwt.verify(token,process.env.JWT_TOKEN);
    //     return decoded;
    // },