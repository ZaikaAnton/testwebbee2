class Navigation {
  constructor() {
    this.activePage = localStorage.getItem("activePage") || "resume";
    this.controlBar = new ControlBar();
    this.listMagazine = new Magazine();

    window.addEventListener("popstate", this.handleUrlChange.bind(this));

    window.onload = () => {
      const savedPage = sessionStorage.getItem("savedPage");
      if (savedPage) {
        sessionStorage.removeItem("savedPage");
        this.navigateToPage(savedPage);
      } else {
        this.handleUrlChange();
      }
    };
  }

  // Функция для сохранения текущей страницы перед перезагрузкой
  saveCurrentPage() {
    sessionStorage.setItem("savedPage", this.activePage);
  }

  // Функция, которая устанавливает страницу по умолчанию
  setInitialPage() {
    const path = window.location.pathname;
    if (path === "/testwebbee2/" || path === "/testwebbee2") {
      history.replaceState(null, "", "/testwebbee2/activity");
      this.setActivePage("resume");
      mainPage.render(this.controlBar, this.listMagazine);
      mapPage.clear();
      timerPage.clear();
      mapPage.stopTimer();
      return true;
    }
    return false;
  }

  // Функция, которая обрабатывает изменение URL
  handleUrlChange() {
    const path = window.location.pathname;
    if (path === "/testwebbee2/activity") {
      this.setActivePage("resume");
      mapPage.clear();
      timerPage.clear();
      mainPage.render(this.controlBar, this.listMagazine);
      mapPage.stopTimer();
    } else if (path === "/testwebbee2/map") {
      this.setActivePage("map");
      mapPage.render();
      mainPage.clear();
      timerPage.clear();
    } else if (path === "/testwebbee2/timer") {
      this.setActivePage("timer");
      mainPage.clear();
      mapPage.clear();
      timerPage.render();
      mapPage.stopTimer();
    } else {
      history.replaceState(null, "", "/testwebbee2/activity");
      this.handleUrlChange();
    }
  }

  // Функция для навигации на определенную страницу
  navigateToPage(page) {
    switch (page) {
      case "resume":
        this.setActivePage("resume");
        mainPage.render(this.controlBar, this.listMagazine);
        mapPage.clear();
        timerPage.clear();
        mapPage.stopTimer();
        break;
      case "map":
        this.setActivePage("map");
        mapPage.render();
        mainPage.clear();
        timerPage.clear();
        break;
      case "timer":
        this.setActivePage("timer");
        timerPage.render();
        mainPage.clear();
        mapPage.clear();
        mapPage.stopTimer();
        break;
      default:
        this.setActivePage("resume");
        mainPage.render(this.controlBar, this.listMagazine);
        mapPage.clear();
        timerPage.clear();
        mapPage.stopTimer();
    }
  }

  // Функция для обработки переходов
  handlePageChange(event, page, path) {
    event.preventDefault();
    if (this.isActivePage(page)) return;
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
            <a href="/testwebbee2/activity" onclick="event.preventDefault(); navigationComponent.handlePageChange(event, 'resume', '/testwebbee2/activity');"><button id="resume-btn" class="btn btn-outline-primary ${
              this.activePage === "resume" ? "active-btn" : ""
            }">Resume</button></a>
            <a href="/testwebbee2/map" onclick="event.preventDefault(); navigationComponent.handlePageChange(event, 'map', '/testwebbee2/map');"><button id="map-btn" class="btn btn-outline-primary ${
              this.activePage === "map" ? "active-btn" : ""
            }">Map</button></a>
            <a href="/testwebbee2/timer" onclick="event.preventDefault(); navigationComponent.handlePageChange(event, 'timer', '/testwebbee2/timer');"><button id="timer-btn" class="btn btn-outline-primary ${
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

// Сохраняем текущую страницу перед перезагрузкой
window.onbeforeunload = () => {
  navigationComponent.saveCurrentPage();
};
