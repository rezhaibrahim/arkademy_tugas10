const db = require("../config/db.js");
const Comment = db.comment;
const asyncMiddleware = require("express-async-handler");

//create comment
exports.addComment = asyncMiddleware(async (req, res) => {
    // Save comment to Database
    const comment = await Comment.create({
        bookId: req.params.id,
        userId: req.userId,
        comment: req.body.comment
    });
    res.status(201).send({
        status: "Comment create successfully!"
    });
});