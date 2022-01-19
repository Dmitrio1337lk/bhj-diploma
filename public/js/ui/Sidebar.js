/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
 class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
      this.initAuthLinks();
      this.initToggleButton();
    }
  
    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
      document.querySelector('.sidebar-toggle').addEventListener('click', () => {
        document.querySelector('.sidebar-mini').classList.toggle('sidebar-open');
        document.querySelector('.sidebar-mini').classList.toggle('sidebar-collapse');
      })
    }
  
    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {
      for(let item of  document.querySelectorAll('.menu-item')) {
        item.addEventListener('click', (e) => {
        let name = String(e.target.closest('.menu-item').classList).split('_');
        let nameMod = name[name.length-1];
        if(nameMod == 'logout') {
          function callbackEntre(err, response) {
            if(response.success) {
              App.setState('init');
            }
          }
          User.logout(callbackEntre);
        }else{
          const mod = App.getModal(nameMod);
          mod.open(); 
        }  
        })
      }
    }
  }