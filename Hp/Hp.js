/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hp extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume10", "./Hp/costumes/costume10.svg", {
        x: 21.858720000000005,
        y: 37.58941999999999
      }),
      new Costume("costume9", "./Hp/costumes/costume9.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("costume8", "./Hp/costumes/costume8.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("costume7", "./Hp/costumes/costume7.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("costume6", "./Hp/costumes/costume6.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("costume5", "./Hp/costumes/costume5.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("costume4", "./Hp/costumes/costume4.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("costume3", "./Hp/costumes/costume3.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("costume2", "./Hp/costumes/costume2.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("costume1", "./Hp/costumes/costume1.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      }),
      new Costume("0", "./Hp/costumes/0.svg", {
        x: 21.85871905062305,
        y: 37.58941959687726
      })
    ];

    this.sounds = [new Sound("pop", "./Hp/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.HpShown = "";
    while (true) {
      if (!(this.toNumber(this.stage.vars.HpShown) === 0)) {
        this.visible = true;
        if (this.toNumber(this.stage.vars.PieceShown) === 0) {
          this.costume = Math.round(
            (this.toNumber(this.stage.vars.HpShown) /
              this.toNumber(this.itemOf(this.stage.vars.originalHp, 5))) *
              10
          );
        } else {
          this.costume = Math.round(
            (this.toNumber(this.stage.vars.HpShown) /
              this.toNumber(
                this.itemOf(
                  this.stage.vars.originalHp,
                  this.stage.vars.PieceShown - 1
                )
              )) *
              10
          );
        }
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
