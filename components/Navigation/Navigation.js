class Navigation {
  constructor() {
    this.activePage = "resume";
    this.controlBar = new ControlBar();
    this.listMagazine = new Magazine();
  }

  handleOpenResume() {
    mapPage.clear();
    timerPage.clear();
    mainPage.render(this.controlBar, this.listMagazine);
    mapPage.stopTimer();
    this.setActivePage("resume");
  }

  handleOpenMap() {
    mapPage.render();
    mainPage.clear();
    timerPage.clear();
    this.setActivePage("map");
  }

  handleOpenTimer() {
    mainPage.clear();
    mapPage.clear();
    timerPage.render();
    mapPage.stopTimer();
    this.setActivePage("timer");
  }

  setActivePage(page) {
    this.activePage = page;
    this.updateActiveButton();
  }

  updateActiveButton() {
    // Удаление класса active-btn со всех кнопок
    document.querySelectorAll(".nav-container button").forEach((button) => {
      button.classList.remove("active-btn");
    });

    // Добавление класса active-btn к активной кнопке
    const activeButtonId = this.activePage + "-btn";
    document.getElementById(activeButtonId)?.classList.add("active-btn");
  }

  render() {
    const htmlNavigation = `
        ${headerNavBar.create()}
        <div class="nav-container d-flex flex-wrap justify-content-between align-items-center">
          <div class="btn-group mb-2 mb-lg-0">
              <button id="resume-btn" onClick='navigationComponent.handleOpenResume()' class="btn btn-outline-primary ${
                this.activePage === "resume" ? "active-btn" : ""
              }">Resume</button>
              <button id="map-btn" onClick='navigationComponent.handleOpenMap()' class="btn btn-outline-primary ${
                this.activePage === "map" ? "active-btn" : ""
              }">Map</button>
              <button id="timer-btn" onClick='navigationComponent.handleOpenTimer()' class="btn btn-outline-primary ${
                this.activePage === "timer" ? "active-btn" : ""
              }">Timer</button>
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
  }
}

const navigationComponent = new Navigation();
navigationComponent.render();
