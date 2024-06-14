const mongoose = require("mongoose");
const User = require("./User");

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      maxLength: 30000,
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      index: true, // comments are usually found using this field
    },
  },

  {
    timestamps: true,
  },
);

commentSchema.methods.toCommentResponse = async function (author) {
  const result = {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };

  if (author) {
    result.author = author.toProfileJSON();
    return result;
  } else {
    const commentAuthor = await User.findById(this.author).exec();
    result.author = commentAuthor.toProfileJSON();
    return result;
  }
};

module.exports = mongoose.model("Comment", commentSchema);
