export class Api {
  constructor(url) {
      this.url = url;
  }

  getAppInfo() {
      return Promise.all([this.getInitialInfo(), this.getInitialCards()]);
  }

  signup(json) {
      this.json = json;
      return fetch(this.url + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: this.json,
        })
        .then((res) => {
            this.responseCheck(res);
            return res.json();
        })
        .catch((err) => {
                console.log(err);
        });
  }

  logIn(json) {
    this.json = json;
    return fetch(this.url + 'signin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: this.json,
      })
      .then((res) => {
          this.responseCheck(res);
          return res.json();
      })
      .catch((err) => {
              console.log(err);
      });
}

  getInitialInfo() {
      return fetch(this.url, {
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  getInitialAllInfo() {
    return fetch(this.url + 'users', {
        })
        .then((res) => {
            this.responseCheck(res);
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
}

  getInitialCards() {
      return fetch(this.url, {
          })
          .then((resj) => {
              this.responseCheck(resj);
              return resj.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  upUser(json) {
      this.json = json;
      return fetch(this.url, {
              method: 'PATCH',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
              body: this.json,
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  postCard(json) {
      this.json = json;
      return fetch(this.url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: this.json,
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  removeCard() {
      return fetch(this.url, {
              method: 'DELETE',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  likeCard() {
      return fetch(this.url, {
              method: 'PUT',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
              body: this.json,
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  deleteLikeCard() {
      return fetch(this.url, {
              method: 'DELETE',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  upAvatar(json) {
      this.json = json;
      return fetch(this.url + 'users/me/avatar', {
              method: 'PATCH',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: this.json,
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  responseCheck(res) {
      if (res.ok) {
          return res;
      }
      return Promise.reject(res.status);
  }
}
