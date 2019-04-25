export default class {
  constructor(options) {
    this.state = {
      isCollapse: false,
      firstActiveNow: 0,
      firstHoverNow: 0,
      secondActiveNow: 0,
      secondNavTop: 0,
      secondNavASC: true,
    };

    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
  }

  setCollapse(i) {
    this.state.isCollapse = i;

  }

  setFirstActive(i) {
    this.state.firstActiveNow = i;

  }

  setFirstHover(i) {
    this.state.firstHoverNow = i;

  }

  setSecondActive(i) {
    this.state.secondActiveNow = i;
  }
}
