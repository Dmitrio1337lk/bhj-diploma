/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
 class Entity {

  static url = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback) {
    let options = {
      data: data,
      method: 'GET',
      url: this.url,
      responseType: 'json',
      callback,
    }
    createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    let extendedData = Object.assign(data, { _method: "PUT" })
    let options = {
      data: extendedData, 
      method: 'POST',
      url: this.url,
      responseType: 'json',
      callback,
    }
    createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback) {
    let extendedData = Object.assign({_method: "DELETE"}, {id: data});
    let options = {
      data: extendedData, 
      method: 'POST',
      url: this.url,
      responseType: 'json',
      callback,
    }
    createRequest(options);
  }
}
