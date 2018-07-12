require("dotenv").config();
console.log('this is loaded');

// exports.twitterKeys = {
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// };

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};
// console.log(process.env.TWITTER_ACCESS_TOKEN_KEY);
// console.log(twitter);
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};