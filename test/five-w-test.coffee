chai = require 'chai'
sinon = require 'sinon'
chai.use require 'sinon-chai'

expect = chai.expect

describe 'hubot-five-w', ->
	beforeEach ->
		@robot =
			respond: sinon.spy()
			hear: sinon.spy()
		require('../src/five-w')(@robot)

	it 'responds to "who *"', ->
		expect(@robot.respond).to.have.been.calledWith sinon.match( (val) ->
			val.test /who is john snow/
		)

	it 'responds to "what *"', ->
		expect(@robot.respond).to.have.been.calledWith sinon.match( (val) ->
			val.test /what is john snow/
		)

	it 'responds to "when *"', ->
		expect(@robot.respond).to.have.been.calledWith sinon.match( (val) ->
			val.test /when is john snow/
		)

	it 'responds to "where *"', ->
		expect(@robot.respond).to.have.been.calledWith sinon.match( (val) ->
			val.test /when is john snow/
		)

	it 'responds to "why *"', ->
		expect(@robot.respond).to.have.been.calledWith sinon.match( (val) ->
			val.test /why is john snow/
		)

	it 'responds to "how *"', ->
		expect(@robot.respond).to.have.been.calledWith sinon.match( (val) ->
			val.test /how is john snow/
		)
