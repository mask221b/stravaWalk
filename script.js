var StravaApiV3 = require('strava_api_v3');
var defaultClient = StravaApiV3.ApiClient.instance;

// Configure OAuth2 access token for authorization: strava_oauth
var strava_oauth = defaultClient.authentications['strava_oauth'];
strava_oauth.accessToken = "4822f9667e6225b7b9c5a7f7549b82bad381476b"

var api = new StravaApiV3.StreamsApi()

var id = 109076; // {Long} The identifier of the activity.

var keys = ; // {array[String]} Desired stream types.

var keyByType = true; // {Boolean} Must be true.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.getActivityStreams(id, keys, keyByType, callback);