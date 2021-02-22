export class Api {
  constructor(url) {
      this.url = url;
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

  getInitialCards() {
      return fetch(this.url, {
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          })
          .then((resj) => {
              this.responseCheck(resj);
              return resj.json();
          })
          .catch((err) => {
              console.log(err);
          });
  }

  postInfo(json) {
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

  reCard() {
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
              body: this.json,
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

  addAvatar(json) {
      this.json = json;
      return fetch(this.url, {

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
