/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("costume3", "./Sprite1/costumes/costume3.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("costume4", "./Sprite1/costumes/costume4.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("costume5", "./Sprite1/costumes/costume5.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("costume6", "./Sprite1/costumes/costume6.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("costume7", "./Sprite1/costumes/costume7.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("costume8", "./Sprite1/costumes/costume8.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("costume9", "./Sprite1/costumes/costume9.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("0", "./Sprite1/costumes/0.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      }),
      new Costume("", "./Sprite1/costumes/.svg", {
        x: 5.719997406005859,
        y: 15.481250000000017
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *whenGreenFlagClicked() {
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    this.visible = false;
    this.direction = 1;
    this.moveAhead();
    this.goto(199, 137);
    this.createClone();
    this.direction = 2;
    this.goto(213, 137);
    this.createClone();
  }

  *startAsClone() {
    this.visible = true;
    this.moveAhead();
    while (true) {
      if (!(this.toNumber(this.stage.vars.HpShown) === 0)) {
        this.visible = true;
        this.costume = this.letterOf(
          this.stage.vars.HpShown,
          this.direction - 1
        );
      } else {
        this.visible = false;
        this.stage.watchers.HpShown.visible = false;
      }
      yield;
    }
  }
}
