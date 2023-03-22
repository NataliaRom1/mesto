class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    // объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    this._name = document.querySelector(nameSelector)
    this._info = document.querySelector(infoSelector)
  }

  // Возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const profileInfo = {
      name: this._name.textContent,
      info: this._info.textContent,
    }
    return profileInfo;
  }

  // Принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ newName, newInfo }) {
    this._name.textContent = newName;
    this._info.textContent = newInfo;
  }
}

export default UserInfo;