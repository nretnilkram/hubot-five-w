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
#   HUBOT_FIVE_W_HEAR - Optional. If set, bot will respond to the above command without needing to address hubot first.
#
# Author:
#   nrentnilkram


googleQuestion = (msg) ->
  msg.send msg.match.input

module.exports = (robot) ->
  if !process.env.HUBOT_CHANCE_HEAR?
    robot.respond /who .+/i, (msg) ->
      googleQuestion msg

    robot.respond /what .+/i, (msg) ->
      googleQuestion msg

    robot.respond /when .+/i, (msg) ->
      googleQuestion msg

    robot.respond /where .+/i, (msg) ->
      googleQuestion msg

    robot.respond /why .+/i, (msg) ->
      googleQuestion msg

    robot.respond /how .+/i, (msg) ->
      googleQuestion msg

# feature, not added to docs since you can't conditionally document commands
  if process.env.HUBOT_CHANCE_HEAR?
    robot.hear /^who .+/i, (msg) ->
      googleQuestion msg

    robot.hear /^what .+/i, (msg) ->
      googleQuestion msg

    robot.hear /^when .+/i, (msg) ->
      googleQuestion msg

    robot.hear /^where .+/i, (msg) ->
      googleQuestion msg

    robot.hear /^why .+/i, (msg) ->
      googleQuestion msg

    robot.hear /^how .+/i, (msg) ->
      googleQuestion msg