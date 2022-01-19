/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
 class Account extends Entity {
	static url = '/account';

	 /**
   * Получает информацию о счёте
   * */
  static get(id = "", callback, data){
  	let options = {
      method: 'GET',
      url: this.url + '/' + id,
      responseType: 'json',
      data: '',
      callback,
    }
    createRequest(options);
  }
}

