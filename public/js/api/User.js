/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
 class User {
  static url = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( callback ) {
    let options = {
      data: '',
      method: 'GET',
      url: this.url + '/current',
      responseType: 'json',
      callback: (err, response) => {
        if (err === null) {
          if (response.success) {
            this.setCurrent(response.user);
          } else {
            this.unsetCurrent();
          }
        }
        callback();
      }
    };
    createRequest(options);
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let options = {
      data: data,
      method: 'POST',
      url: this.url + '/login',
      responseType: 'json',
      callback: (err, response) => {
        if (err === null) {
          if (response.success) {
            this.setCurrent(response.user)
          }} else {
            console.error(err);
          }
        callback(err, response)
      }
    }
    createRequest(options);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) {
    let options = {
      data: data,
      method: 'POST',
      url: this.url + '/register',
      responseType: 'json',
      callback: (err, response) => {
        if (err === null) {
          if (response.success) {
            this.setCurrent(response.user)
          }} else {
            console.error(err);
          }
        callback(err, response)
      }
    }
    createRequest(options);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f ) {
    let options = {
      data: data,
      method: 'POST',
      url: this.url + '/logout',
      responseType: 'json',
      callback: (err, response) => {
        if (err === null) {
          if (response.success) {
            this.unsetCurrent(response.user)
          }} else {
            console.error(err);
          }
        callback(err, response)
      }
    }
    createRequest(options);
  }
}