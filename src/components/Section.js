// отвечает за отрисовку элементов на странице
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;  // Массив данных, которые нужно добавить на страницу при инициализации класса.
    this._renderer = renderer;  // Функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = document.querySelector(containerSelector);  // Селектор контейнера, в который нужно добавлять созданные элементы.
  }

  // Отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  // Принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
