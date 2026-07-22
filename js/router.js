const Router = {
  current: null,
  history: [],

  init() {
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.route) {
        this.go(e.state.route, false);
      }
    });
  },

  go(route, pushState = true) {
    if (this.current === route) return;
    this.current = route;

    if (pushState) {
      history.pushState({ route }, '', '#' + route);
    }

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const screen = document.getElementById('screen-' + route);
    if (screen) {
      screen.classList.add('active');
    }

    const navItem = document.querySelector(`.nav-item[data-route="${route}"]`);
    if (navItem) navItem.classList.add('active');

    document.getElementById('app-content').scrollTop = 0;
  }
};
