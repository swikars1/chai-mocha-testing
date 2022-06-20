const axios = require('axios');

class User {
  constructor(username, viewRepos = false) {
    this.username = username;
    this.canViewRepos = viewRepos;
  }

  getUserId() {
    return axios.get(`https://api.github.com/users/${this.username}`)
      .then(response => response.data.id);
  }

  getUserRepo(repoIndex) {
    if (this.canViewRepos) {
      return axios.get(`https://api.github.com/users/${this.username}/repos`)
        .then(response => response.data[repoIndex])
    }

    return Promise.reject('Cannot view repos');
  }

}

module.exports = {
  User,
};