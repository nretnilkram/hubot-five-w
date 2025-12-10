const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const expect = chai.expect;

describe('hubot-five-w', () => {
  beforeEach(function() {
    this.robot = {
      respond: sinon.spy(),
      hear: sinon.spy()
    };
    require('../src/five-w')(this.robot);
  });

  it('responds to "who *"', function() {
    expect(this.robot.respond).to.have.been.calledWith(sinon.match((val) => {
      return val.test('who is john snow');
    }));
  });

  it('responds to "what *"', function() {
    expect(this.robot.respond).to.have.been.calledWith(sinon.match((val) => {
      return val.test('what is john snow');
    }));
  });

  it('responds to "when *"', function() {
    expect(this.robot.respond).to.have.been.calledWith(sinon.match((val) => {
      return val.test('when is john snow');
    }));
  });

  it('responds to "where *"', function() {
    expect(this.robot.respond).to.have.been.calledWith(sinon.match((val) => {
      return val.test('where is john snow');
    }));
  });

  it('responds to "why *"', function() {
    expect(this.robot.respond).to.have.been.calledWith(sinon.match((val) => {
      return val.test('why is john snow');
    }));
  });

  it('responds to "how *"', function() {
    expect(this.robot.respond).to.have.been.calledWith(sinon.match((val) => {
      return val.test('how is john snow');
    }));
  });
});