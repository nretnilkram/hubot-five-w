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
    // Extract the question part after the command word (who/what/when/where/why/how)
    const questionWord = msg.match[1]; // The command word (who, what, etc.)
    const questionText = msg.match[2]; // The actual question text
    const searchQuery = `${questionWord} ${questionText}`;
    
    const q = {
      q: searchQuery,
      safe: process.env.HUBOT_GOOGLE_SAFE_SEARCH || 'high',
      fields: 'items(snippet,link)',
      cx: googleCseId,
      key: googleApiKey
    };
    const url = 'https://www.googleapis.com/customsearch/v1';
    msg.http(url)
      .query(q)
      .get()((err, res, body) => {
        if (err) {
          msg.robot.logger.error("HTTP request error:", err);
          msg.send("Sorry, there was an error connecting to Google search.");
          return;
        }
        
        if (res.statusCode !== 200) {
          msg.robot.logger.error(`HTTP ${res.statusCode} error:`, body);
          msg.send(`Sorry, Google search returned an error (${res.statusCode}).`);
          return;
        }

        let response;
        try {
          response = JSON.parse(body);
        } catch (parseErr) {
          msg.robot.logger.error("Failed to parse JSON response:", parseErr, "Body:", body);
          msg.send("Sorry, received an invalid response from Google search.");
          return;
        }

        if (response.error) {
          msg.robot.logger.error("Google API error:", response.error);
          msg.send(`Sorry, Google API error: ${response.error.message || 'Unknown error'}`);
          return;
        }

        if (!response.items || response.items.length === 0) {
          msg.robot.logger.info("No search results found for query:", q.q);
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
  robot.respond(/(who|what|when|where|why|how) (.+)/i, (msg) => {
    googleQuestion(msg);
  });

  if (process.env.HUBOT_FIVE_W_HEAR === "true") {
    robot.hear(/^(who|what|when|where|why|how) (.+)/i, (msg) => {
      googleQuestion(msg);
    });
  }
};