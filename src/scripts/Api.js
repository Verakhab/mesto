export class Api {
  constructor(url) {
      this.url = url;
  }

  getAppInfo() {
      return Promise.all([this.getInitialInfo(), this.getInitialCards()]);
  }

  signup(formData) {
      return fetch(this.url + 'signup', {
            method: 'POST',
            body: formData,
        })
        .then((res) => {
            this.responseCheck(res);
            return res.json();
        })
        .catch((err) => {
                console.log(err);
        });
  }

  logIn(formData) {
    return fetch(this.url + 'signin', {
          method: 'POST',
          body: formData,
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
      return fetch(this.url + 'user', {
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

  getInitialCards() {
      return fetch(this.url, {
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  upUser(formData) {
      return fetch(this.url + 'users/me', {
              method: 'PATCH',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: formData,
          })
          .then((res) => {
              this.responseCheck(res);
              return res.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  postCard(formData) {
      return fetch(this.url, {
              method: 'POST',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: formData,
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

  upAvatar(formData) {
      return fetch(this.url + 'users/me/avatar', {
              method: 'PATCH',
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: formData,
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
