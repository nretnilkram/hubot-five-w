// Description:
//   Get google search results from hubot
//
// Dependencies:
//   None
//
// Commands:
//   hubot who <> - Googles and return content for question
//   hubot what <> - Googles and return content for question
//   hubot when <> - Googles and return content for question
//   hubot where <> - Googles and return content for question
//   hubot why <> - Googles and return content for question
//   hubot how <> - Googles and return content for question
//
// Configuration:
//   HUBOT_GOOGLE_CSE_ID - Google API ID
//   HUBOT_GOOGLE_CSE_KEY - Google API Key
//   HUBOT_GOOGLE_SAFE_SEARCH - Optional.  Set google safe search level.  Defaults to 'High'.
//   HUBOT_FIVE_W_HEAR - Optional. If set, bot will respond to the above command without needing to address hubot first.
//
// Author:
//   nrentnilkram

const googleQuestion = (msg) => {
  // msg.send(msg.match.input);
  const googleCseId = process.env.HUBOT_GOOGLE_CSE_ID;
  if (googleCseId) {
    // Using Google Custom Search API
    const googleApiKey = process.env.HUBOT_GOOGLE_CSE_KEY;
    if (!googleApiKey) {
      msg.robot.logger.error("Missing environment variable HUBOT_GOOGLE_CSE_KEY");
      msg.send("Missing server environment variable HUBOT_GOOGLE_CSE_KEY.");
      return;
    }
    const q = {
      q: msg.match.input,
      safe: process.env.HUBOT_GOOGLE_SAFE_SEARCH || 'high',
      fields: 'items(snippet,link)',
      cx: googleCseId,
      key: googleApiKey
    };
    const url = 'https://www.googleapis.com/customsearch/v1';
    msg.http(url)
      .query(q)
      .get()((err, res, body) => {
        const response = JSON.parse(body);
        if (!response.items || response.items.length === 0) {
          msg.robot.logger.error("No search results found:", response);
          msg.send("Sorry, I couldn't find any results for that question.");
          return;
        }
        const answer = msg.random(response.items);
        msg.send(answer.snippet + ' ' + answer.link);
      });
  } else {
    msg.robot.logger.error("Missing environment variable HUBOT_GOOGLE_CSE_ID");
    msg.send("Missing server environment variable HUBOT_GOOGLE_CSE_ID.");
  }
};

export default (robot) => {
  robot.respond(/(who|what|when|where|why|how) .+/i, (msg) => {
    googleQuestion(msg);
  });

  if (process.env.HUBOT_FIVE_W_HEAR === "true") {
    robot.hear(/^(who|what|when|where|why|how) .+/i, (msg) => {
      googleQuestion(msg);
    });
  }
};