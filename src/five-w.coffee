# Description:
#   Get google search results from hubot
#
# Dependencies:
#   None
#
# Commands:
#   hubot who <> - Googles and return content for question
#   hubot what <> - Googles and return content for question
#   hubot when <> - Googles and return content for question
#   hubot where <> - Googles and return content for question
#   hubot why <> - Googles and return content for question
#   hubot how <> - Googles and return content for question
#
# Configuration:
#   HUBOT_GOOGLE_CSE_ID - Google API ID
#   HUBOT_GOOGLE_CSE_KEY - Google API Key
#   HUBOT_GOOGLE_SAFE_SEARCH - Optional.  Set google safe search level.  Defaults to 'High'.
#   HUBOT_FIVE_W_HEAR - Optional. If set, bot will respond to the above command without needing to address hubot first.
#
# Author:
#   nrentnilkram


googleQuestion = (msg) ->
  # msg.send msg.match.input
  googleCseId = process.env.HUBOT_GOOGLE_CSE_ID
  if googleCseId
    # Using Google Custom Search API
    googleApiKey = process.env.HUBOT_GOOGLE_CSE_KEY
    if !googleApiKey
      msg.robot.logger.error "Missing environment variable HUBOT_GOOGLE_CSE_KEY"
      msg.send "Missing server environment variable HUBOT_GOOGLE_CSE_KEY."
      return
    q =
      q: msg.match.input,
      safe: process.env.HUBOT_GOOGLE_SAFE_SEARCH || 'high',
      fields:'items(snippet,link)',
      cx: googleCseId,
      key: googleApiKey
    url = 'https://www.googleapis.com/customsearch/v1'
    msg.http(url)
      .query(q)
      .get() (err, res, body) ->
        response = JSON.parse(body)
        answer = msg.random response.items
        msg.send answer.snippet + ' ' + answer.link

module.exports = (robot) ->

    robot.respond /(who|what|when|where|why|how) .+/i, (msg) ->
      googleQuestion msg

    if process.env.HUBOT_FIVE_W_HEAR = "true"
      robot.hear /^(who|what|when|where|why|how) .+/i, (msg) ->
        googleQuestion msg
