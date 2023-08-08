/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class WeaponBar extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./WeaponBar/costumes/costume1.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume2", "./WeaponBar/costumes/costume2.svg", {
        x: 22.388890000000004,
        y: 40.77385000000001
      }),
      new Costume("costume3", "./WeaponBar/costumes/costume3.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume4", "./WeaponBar/costumes/costume4.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume5", "./WeaponBar/costumes/costume5.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume6", "./WeaponBar/costumes/costume6.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume7", "./WeaponBar/costumes/costume7.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume8", "./WeaponBar/costumes/costume8.svg", {
        x: 22.388890000000004,
        y: 40.77385000000001
      })
    ];

    this.sounds = [new Sound("pop", "./WeaponBar/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.WeaponShowned = "";
    while (true) {
      if (!(this.toNumber(this.stage.vars.WeaponShowned) === 0)) {
        this.costume = this.stage.vars.WeaponShowned;
        this.visible = true;
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
