const mongoose = require('mongoose');

const {Schema} = mongoose;
const UserSchema = new Schema({
    username: String,
    password: String,
},{ timestamps: true });

UserSchema.methods.toJSON = function () {
    return {
        _id:this._id,
        username: this.title,
        password:this.tags,
    };
};
mongoose.model('User', UserSchema);