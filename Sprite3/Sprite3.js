/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite3 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Sprite3/costumes/costume2.svg", {
        x: 32.626745746580724,
        y: 31.686589527546403
      }),
      new Costume("costume1", "./Sprite3/costumes/costume1.svg", {
        x: 32.626735000000025,
        y: 21.21028000000001
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite3/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.costume = this.toNumber(this.stage.vars.turn) + 1;
      yield;
    }
  }
}
