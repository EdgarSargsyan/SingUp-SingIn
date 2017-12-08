const db = require('../db.js');
const getHash = require('../getPasswordHash.js');
const UsersSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z ]+/
    },
    surname: {
        type: String,
        required: true,
        match: /^[a-zA-Z ]+/
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    gender: {
        type: String,
        required: true,
        enem: ['male', 'female', 'other']
    },
    hash: {
        type: String,
        required: true
    },
    cerated: {
        type:Date,
        default:Date.now()
    }

});
UsersSchema.virtual('password')
    .set(function (pass) {
        this.hash = this.getHashPass(pass);
    })
    .get(function () {
        return this.hash;
    });

UsersSchema.methods.getHashPass = getHash;

UsersSchema.methods.checkPassword = function(pass){
    return this.getHashPass(pass) === this.hash;
}
const users = db.model('user', UsersSchema);

module.exports = users;