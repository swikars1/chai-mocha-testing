const { User } = require('../src/app');
const axios = require('axios');
const chai = require('chai');
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const expect = chai.expect;
chai.use(sinonChai)

describe('the user class', function () {
  const sandbox = sinon.createSandbox();
  let user;
  const GITHUB_TEST_USERNAME = 'swikars1'

  beforeEach(function () {
    user = new User(GITHUB_TEST_USERNAME)
  })

  afterEach(function () {
    sandbox.restore();
  })

  it('should constructor work set values required values', function () {
    expect(user.username).to.be.eq(GITHUB_TEST_USERNAME)
    expect(user.canViewRepos).to.eq(false)
  })

  it('should get user id', function (done) {
    const getStub = sandbox.stub(axios, 'get').resolves({ data: { id: 123 } })
    user.getUserId().then(result => {
      expect(result).to.be.a('number')
      expect(result).to.be.eq(123)
      expect(getStub).to.have.been.calledOnce
      expect(getStub).to.have.been.calledWith(`https://api.github.com/users/${GITHUB_TEST_USERNAME}`)
      done()
    })
      .catch(done)
  })

  it('should return a repo if user can view repos', function (done) {
    const getStub = sandbox.stub(axios, 'get').resolves({ data: ['repo1', 'repo2', 'repo3'] })
    sandbox.stub(user, 'canViewRepos').value(true)
    user.getUserRepo(2).then(response => {
      expect(response).to.be.eq('repo3')
      expect(getStub).to.have.been.calledOnceWith(`https://api.github.com/users/${GITHUB_TEST_USERNAME}/repos`)
      done()
    }).catch(done)
  })

  it('should return an error if user cant view the repo', function (done) {
    const getStub = sandbox.stub(axios, 'get')
    sandbox.stub(user, 'canViewRepos').value(false)

    user.getUserRepo(2).catch(e => {
      expect(e).to.be.eq('Cannot view repos')
      expect(getStub).to.not.have.been.called
      done()
    })

  })
})