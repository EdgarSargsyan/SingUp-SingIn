const crypto = require('crypto');

function getHash(pass){
   
    let salt = 'I love cupcakes';
    
    let hash = crypto.createHmac('sha256', pass)
                        .update(salt)
                        .digest('hex');
    return hash;
}

module.exports= getHash;