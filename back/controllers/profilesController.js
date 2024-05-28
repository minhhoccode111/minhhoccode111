const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc get a user's profile
// @route GET /api/profiles/:username
// @access Private
// @return User's profile info
const getProfile = asyncHandler(async (req, res) => {
  // extract the username param
  const { username } = req.params;
  // extract logged in state, either true or false
  const loggedin = req.loggedin;

  // console.log(`print out username ${username}`)
  // find user with that name
  const user = await User.findOne({ username }).exec();

  // a 404 if not found user
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  if (!loggedin) {
    // if not logged in
    return res.status(200).json({
      // return profile without connection with current user (since anonymouse)
      profile: user.toProfileJSON(false),
    });
  } else {
    // manually find current user in db because the auth step not query in db
    const loginUser = await User.findOne({ email: req.userEmail }).exec();

    return res.status(200).json({
      // return profile and connection with current user
      profile: user.toProfileJSON(loginUser),
    });
  }
});

// @desc follow a user's profile
// @route POST /api/profiles/:username/follow
// @access Private
// @return profile user's info
const followUser = asyncHandler(async (req, res) => {
  // extract :username param
  const { username } = req.params;

  // manually find current user in db because the auth step not query in db
  const loginUser = await User.findOne({ email: req.userEmail }).exec();
  // find user param
  const user = await User.findOne({ username }).exec();

  // return 404 if not both existed
  if (!user || !loginUser) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  // else call follow method with profile user's id
  await loginUser.follow(user._id);

  return res.status(200).json({
    // return profile and connection with current user
    profile: user.toProfileJSON(loginUser),
  });
});

// @desc unfollow a user's profile
// @route DELETE /api/profiles/:username/follow
// @access Private
// @return profile user's info
const unFollowUser = asyncHandler(async (req, res) => {
  // extract :username param
  const { username } = req.params;

  // manually find current user in db because the auth step not query in db
  const loginUser = await User.findOne({ email: req.userEmail }).exec();
  // find user param
  const user = await User.findOne({ username }).exec();

  // return 404 if not both existed
  if (!user || !loginUser) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  // else call unfollow method with profile user's id
  await loginUser.unfollow(user._id);

  return res.status(200).json({
    // return profile and connection with current user
    profile: user.toProfileJSON(loginUser),
  });
});

module.exports = {
  getProfile,
  followUser,
  unFollowUser,
};
