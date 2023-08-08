/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class PieceBar extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume6", "./PieceBar/costumes/costume6.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume5", "./PieceBar/costumes/costume5.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume4", "./PieceBar/costumes/costume4.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("costume3", "./PieceBar/costumes/costume3.svg", {
        x: 22.388890000000004,
        y: 40.77385000000001
      }),
      new Costume("costume2", "./PieceBar/costumes/costume2.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      }),
      new Costume("0", "./PieceBar/costumes/0.svg", {
        x: 22.388888888888744,
        y: 40.773849954020136
      })
    ];

    this.sounds = [new Sound("pop", "./PieceBar/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.PieceShown = "";
    while (true) {
      if (!(this.toNumber(this.stage.vars.PieceShown) === 0)) {
        this.costume = this.stage.vars.PieceShown;
        this.visible = true;
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
