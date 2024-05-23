class Map {
  constructor() {
    this.timerId = null;
  }

  clear() {
    ROOT_MAP.innerHTML = "";
  }
  render() {
    ROOT_MAP.innerHTML = elementLoading.create();

    this.timerId = setTimeout(() => {
      const html = `
        <div class="map-container border rounded">
          
            <span class="map-name d-block p-2 bg-primary text-white text-center"">Base map</span>
            
            <div class="map-container__button d-flex justify-content-end p-2">
              <button class="map-btn__one btn btn-light m-1"><img src='img/hide.svg' alt='' class=""/></button>
              <button class="map-btn__two btn btn-light m-1"><img src='img/reload.svg' alt='' class=""/></button>
              <button class="map-btn__three btn btn-light m-1"><img src='img/close.svg' alt='' class=""/></button>
            </div>
          <div id='map-test' class="map-screen"></div>
        </div>
    `;
      ROOT_MAP.innerHTML = html;

      // Карта
      ymaps.ready(init);
    }, 1000);

    function init() {
      let myMap = new ymaps.Map("map-test", {
        center: [54.73884135775275, 20.57989564872752],
        zoom: 16,
      });
      // Создание маркера
      let myPlacemark = new ymaps.Placemark(
        [54.73884135775275, 20.57989564872752], // Координаты места проживания
        {
          hintContent: "Место проживания", // Подсказка при наведении на маркер
          balloonContent: "Здесь я живу", // Содержимое балуна
        },
        {
          iconLayout: "default#image",
          iconImageHref: "img/home.svg", // Путь к изображению маркера
          iconImageSize: [60, 60], // Размеры изображения маркера
          iconImageOffset: [-15, -42], // Смещение относительно точки координат
        }
      );
      // Добавление маркера на карту
      myMap.geoObjects.add(myPlacemark);
    }
  }

  stopTimer() {
    clearTimeout(this.timerId);
  }
}

const mapPage = new Map();
