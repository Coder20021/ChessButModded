/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite4 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite4/costumes/costume1.svg", {
        x: 19.58332999999999,
        y: 19.583330000000046
      }),
      new Costume("costume2", "./Sprite4/costumes/costume2.svg", {
        x: 19.58332999999999,
        y: 19.58333000000019
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite4/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenthisspriteclicked() {
    if (this.toNumber(this.stage.vars.aim) === 1) {
      this.stage.vars.aim = 0;
    } else {
      this.stage.vars.aim = 1;
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.aim = 0;
    while (true) {
      if (this.toNumber(this.stage.vars.aim) === 1) {
        this.costume = "costume2";
      } else {
        this.costume = "costume1";
      }
      yield;
    }
  }
}
