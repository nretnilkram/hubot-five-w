import * as chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

describe('hubot-five-w', () => {
  beforeEach(async function() {
    this.robot = {
      respond: sinon.spy(),
      hear: sinon.spy()
    };
    const { default: fiveW } = await import('../src/five-w.js');
    fiveW(this.robot);
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