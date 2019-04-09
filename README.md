# hubot-five-w

A hubot script that googles if you ask a who, what, when, where, why or how question.

See [`src/five-w.coffee`](src/five-w.coffee) for full documentation.

## Installation

In hubot project repo, run:

`npm install https://github.com/nretnilkram/hubot-five-w.git --save`

Then add **hubot-five-w** to your `external-scripts.json`:

```json
["hubot-five-w"]
```

## Heroku Configuration

```
heroku config:set HUBOT_GOOGLE_CSE_ID=<google_id>
heroku config:set HUBOT_GOOGLE_CSE_KEY=<google_key>
heroku config:set HUBOT_FIVE_W_HEAR=true
```

## Sample Interaction

```
user1>> hubot roll di
hubot>> 6
```
