const mongoose = require('mongoose');

const {Schema} = mongoose;
const BlogPostSchema = new Schema({
    title: String,
    author: Number,
    tags: Array,
    content: String,
    comment:Array,
    deleted:Boolean,
},{ timestamps: {createdAt:'created',updatedAt:'updated'} });

BlogPostSchema.methods.toJSON = function () {
    return {
        _id:this._id,
        title: this.title,
        tags:this.tags,
        author:this.author,
        content:this.content,
        comment:this.comment,
        created: this.created,
        updated: this.updated,
        deleted:this.deleted,
    };
};
mongoose.model('BlogPost', BlogPostSchema);