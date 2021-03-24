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
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return err;
    });
  }

  logIn(formData) {
    return fetch(this.url + 'signin', {
        method: 'POST',
        body: formData,
    })
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err)
        return err;
    })
}

  getInitialInfo() {
    return fetch(this.url + 'user', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return err;
    });
  }

  getInitialAllInfo() {
    return fetch(this.url + 'users', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return err;
    });
}

  getInitialCards() {
    return fetch(this.url + 'cards', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return err;
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
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return err;
    });
  }

  postCard(formData, form) {
    return fetch(this.url + 'cards', {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
    })
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err)
        return err;
    });
  }

  removeCard(cardId) {
    return fetch(this.url + `cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            // 'Content-Type': 'application/json',
        },
    })
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return err;
    });
  }

  changelikeCard(cardId, like) {
    return fetch(this.url + `cards/${cardId}/likes`, {
        method: like ? 'PUT' : 'DELETE',
        headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        // 'Content-Type': 'application/json',
        },
        body: this.json,
    })
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return err;
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
    .then(res => {
        // this.responseCheck(res);
        return res.json();
    })
    .catch(err => {
        console.log(err);
        return err;
    });
  }

  responseCheck(res) {
    if (res.ok) {
        return res;
    }
    return Promise.reject(res.status);
  }
}
