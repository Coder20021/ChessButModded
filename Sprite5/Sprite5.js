/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite5 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite5/costumes/costume1.svg", {
        x: 19.583330000000018,
        y: 19.58332999999999
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite5/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenthisspriteclicked() {
    if (this.toNumber(this.stage.vars.shooting) === 1) {
      this.stage.vars.shooting = 0;
    } else {
      this.stage.vars.shooting = 1;
    }
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.toNumber(this.stage.vars.shooting) === 1) {
        this.effects.ghost = 30;
      } else {
        this.effects.ghost = 0;
      }
      yield;
    }
  }
}
