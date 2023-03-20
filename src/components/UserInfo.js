class UserInfo{
  constructor({nameSelector, infoSelector}) {
    // объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    this._nameSelector = document.querySelector(`.${nameSelector}`)
    this._infoSelector = document.querySelector(`.${infoSelector}`)
  }

  getUserInfo() {
    // Возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const profileInfo = {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent   
    }
    return profileInfo;
  }

  setUserInfo(newName, newInfo) {
    // принимает новые данные пользователя и добавляет их на страницу.
    profileInfo.name = newName;
    profileInfo.info = newInfo;
  }


}

export default UserInfo;