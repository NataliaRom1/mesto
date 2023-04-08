class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    // объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // Возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const profileInfo = {
      name: this._name.textContent,
      info: this._info.textContent,
    }
    return profileInfo;
  }

  // Принимает данные пользователя и добавляет их на страницу.
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}

export default UserInfo;