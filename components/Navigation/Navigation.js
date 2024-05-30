class Navigation {
  constructor() {
    this.activePage = localStorage.getItem("activePage") || "resume"; // Загружаем сохраненную активную страницу или устанавливаем по умолчанию
    this.controlBar = new ControlBar();
    this.listMagazine = new Magazine();

    window.addEventListener("popstate", this.handleUrlChange.bind(this));
    window.onload = () => {
      this.handleUrlChange();
    };
  }

  // Функция, которая устанавливает страницу по умолчанию, когда приложение только открывается
  setInitialPage() {
    const path = window.location.pathname;
    if (path === "/" || path === "") {
      history.replaceState(null, "", "/activity");
      this.setActivePage("resume");
      mainPage.render(this.controlBar, this.listMagazine);
      mapPage.clear();
      timerPage.clear();
      mapPage.stopTimer();
      return true;
    }
    return false;
  }

  // Функция, которая открывает нужный компонент
  handleUrlChange() {
    const path = window.location.pathname;
    if (path === "/activity") {
      this.setActivePage("resume");
      mapPage.clear();
      timerPage.clear();
      mainPage.render(this.controlBar, this.listMagazine);
      mapPage.stopTimer();
    } else if (path === "/map") {
      this.setActivePage("map");
      mapPage.render();
      mainPage.clear();
      timerPage.clear();
    } else if (path === "/timer") {
      this.setActivePage("timer");
      mainPage.clear();
      mapPage.clear();
      timerPage.render();
      mapPage.stopTimer();
    } else {
      history.replaceState(null, "", "/activity");
      this.handleUrlChange();
    }
  }

  // Функция для обработки переходов
  handlePageChange(event, page, path) {
    event.preventDefault();
    if (this.isActivePage(page)) return; // Проверка текущей активной страницы
    history.pushState(null, "", path);
    this.handleUrlChange();
  }

  // Функция для проверки активной страницы
  isActivePage(page) {
    return this.activePage === page;
  }

  setActivePage(page) {
    this.activePage = page;
    localStorage.setItem("activePage", page);
    this.updateActiveButton();
  }

  updateActiveButton() {
    document.querySelectorAll(".nav-container button").forEach((button) => {
      button.classList.remove("active-btn");
    });

    const activeButtonId = this.activePage + "-btn";
    document.getElementById(activeButtonId)?.classList.add("active-btn");
  }

  render() {
    const htmlNavigation = `
      ${headerNavBar.create()}
      <div class="nav-container d-flex flex-wrap justify-content-between align-items-center">
        <div class="btn-group mb-2 mb-lg-0">
            <a href="/activity" onclick="event.preventDefault(); navigationComponent.handlePageChange(event, 'resume', '/activity');"><button id="resume-btn" class="btn btn-outline-primary ${
              this.activePage === "resume" ? "active-btn" : ""
            }">Resume</button></a>
            <a href="/map" onclick="event.preventDefault(); navigationComponent.handlePageChange(event, 'map', '/map');"><button id="map-btn" class="btn btn-outline-primary ${
              this.activePage === "map" ? "active-btn" : ""
            }">Map</button></a>
            <a href="/timer" onclick="event.preventDefault(); navigationComponent.handlePageChange(event, 'timer', '/timer');"><button id="timer-btn" class="btn btn-outline-primary ${
              this.activePage === "timer" ? "active-btn" : ""
            }">Timer</button></a>
        </div>
        <div class="btn-group mb-2 mb-lg-0">
            <button id="btn1" class="btn btn-outline-primary">Notes</button>
            <button id="btn2" class="btn btn-outline-primary">Friends</button>
            <button id="btn3" class="btn btn-outline-primary">Photos</button>
            <button id="btn4" class="btn btn-outline-primary">Settings</button>
        </div>
      </div>
      <hr class="nav-line">
    `;
    ROOT_NAVIGATION.innerHTML = htmlNavigation;
    if (!this.setInitialPage()) {
      this.handleUrlChange();
    }
  }
}

const navigationComponent = new Navigation();
navigationComponent.render();

// class Navigation {
//   constructor() {
//     this.activePage = "resume";
//     this.controlBar = new ControlBar();
//     this.listMagazine = new Magazine();

//     // window.addEventListener("hashchange", this.handleUrlChange.bind(this));
//     window.addEventListener("popstate", this.handleUrlChange.bind(this));
//   }

//   // handleUrlChange() {
//   //   const hash = location.hash;
//   //   if (hash === "#/activity") {
//   //     this.setActivePage("resume");
//   //     mapPage.clear();
//   //     timerPage.clear();
//   //     mainPage.render(this.controlBar, this.listMagazine);
//   //     mapPage.stopTimer();
//   //   } else if (hash === "#/map") {
//   //     this.setActivePage("map");
//   //     mapPage.render();
//   //     mainPage.clear();
//   //     timerPage.clear();
//   //   } else if (hash === "#/timer") {
//   //     this.setActivePage("timer");
//   //     mainPage.clear();
//   //     mapPage.clear();
//   //     timerPage.render();
//   //     mapPage.stopTimer();
//   //   } else {
//   //     // Default page
//   //     location.hash = "#/activity";
//   //   }
//   // }
//   handleUrlChange() {
//     const path = window.location.pathname;
//     if (path === "/activity") {
//       this.setActivePage("resume");
//       mapPage.clear();
//       timerPage.clear();
//       mainPage.render(this.controlBar, this.listMagazine);
//       mapPage.stopTimer();
//     } else if (path === "/map") {
//       this.setActivePage("map");
//       mapPage.render();
//       mainPage.clear();
//       timerPage.clear();
//     } else if (path === "/timer") {
//       this.setActivePage("timer");
//       mainPage.clear();
//       mapPage.clear();
//       timerPage.render();
//       mapPage.stopTimer();
//     } else {
//       // Default page
//       history.replaceState(null, "", "/activity");
//       this.handleUrlChange();
//     }
//   }

//   handleOpenResume() {
//     // location.hash = "#/activity";
//     // this.handleUrlChange();
//     history.pushState(null, "", "/activity");
//     this.handleUrlChange();

//     // mapPage.clear();
//     // timerPage.clear();
//     // mainPage.render(this.controlBar, this.listMagazine);
//     // mapPage.stopTimer();
//     // this.setActivePage("resume");
//   }

//   handleOpenMap() {
//     // location.hash = "#/map";
//     // this.handleUrlChange();
//     history.pushState(null, "", "/map");
//     this.handleUrlChange();

//     // mapPage.render();
//     // mainPage.clear();
//     // timerPage.clear();
//     // this.setActivePage("map");
//   }

//   handleOpenTimer() {
//     // location.hash = "#/timer";
//     // this.handleUrlChange();
//     history.pushState(null, "", "/timer");
//     this.handleUrlChange();

//     // mainPage.clear();
//     // mapPage.clear();
//     // timerPage.render();
//     // mapPage.stopTimer();
//     // this.setActivePage("timer");
//   }

//   setActivePage(page) {
//     this.activePage = page;
//     this.updateActiveButton();
//   }

//   updateActiveButton() {
//     // Удаление класса active-btn со всех кнопок
//     document.querySelectorAll(".nav-container button").forEach((button) => {
//       button.classList.remove("active-btn");
//     });

//     // Добавление класса active-btn к активной кнопке
//     const activeButtonId = this.activePage + "-btn";
//     document.getElementById(activeButtonId)?.classList.add("active-btn");
//   }

//   render() {
//     const htmlNavigation = `
//       ${headerNavBar.create()}
//       <div class="nav-container d-flex flex-wrap justify-content-between align-items-center">
//         <div class="btn-group mb-2 mb-lg-0">
//             <button id="resume-btn" onClick='navigationComponent.handleOpenResume()' class="btn btn-outline-primary ${
//               this.activePage === "resume" ? "active-btn" : ""
//             }">Resume</button>
//            <button id="map-btn" onClick='navigationComponent.handleOpenMap()' class="btn btn-outline-primary ${
//              this.activePage === "map" ? "active-btn" : ""
//            }">Map</button>
//             <button id="timer-btn" onClick='navigationComponent.handleOpenTimer()' class="btn btn-outline-primary ${
//               this.activePage === "timer" ? "active-btn" : ""
//             }">Timer</button>
//         </div>
//         <div class="btn-group mb-2 mb-lg-0">
//             <button id="btn1" class="btn btn-outline-primary">Notes</button>
//             <button id="btn2" class="btn btn-outline-primary">Friends</button>
//             <button id="btn3" class="btn btn-outline-primary">Photos</button>
//             <button id="btn4" class="btn btn-outline-primary">Settings</button>
//         </div>
//       </div>
//       <hr class="nav-line">
//     `;
//     ROOT_NAVIGATION.innerHTML = htmlNavigation;
//     this.handleUrlChange();
//   }
// }

// const navigationComponent = new Navigation();
// navigationComponent.render();
// // navigationComponent.handleUrlChange();
