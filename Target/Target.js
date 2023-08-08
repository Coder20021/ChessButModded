/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Target extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Target/costumes/costume1.svg", {
        x: 495,
        y: 13.5
      })
    ];

    this.sounds = [new Sound("pop", "./Target/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (!(this.toNumber(this.stage.vars.shareGun) === 0)) {
        this.visible = true;
        if (this.mouse.down && !(this.compare(this.mouse.x, -176) < 0)) {
          this.goto(this.mouse.x, this.mouse.y);
        }
        this.direction = this.sprites["GunHolding"].direction;
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
