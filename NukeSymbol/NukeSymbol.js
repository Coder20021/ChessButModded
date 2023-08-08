/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class NukeSymbol extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./NukeSymbol/costumes/costume1.svg", {
        x: 18.918140000000022,
        y: 21.44628
      }),
      new Costume("costume4", "./NukeSymbol/costumes/costume4.svg", {
        x: 18.918140000000022,
        y: 21.44628
      }),
      new Costume("costume5", "./NukeSymbol/costumes/costume5.svg", {
        x: 18.918135000000035,
        y: 21.44628
      }),
      new Costume("costume6", "./NukeSymbol/costumes/costume6.svg", {
        x: 18.918135000000035,
        y: 21.44628
      }),
      new Costume("costume2", "./NukeSymbol/costumes/costume2.svg", {
        x: 52.264602461484486,
        y: 52.26460246148463
      }),
      new Costume("costume3", "./NukeSymbol/costumes/costume3.svg", {
        x: 42.12499,
        y: 42.159785
      })
    ];

    this.sounds = [new Sound("pop", "./NukeSymbol/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    yield* this.wait(0.2);
    while (true) {
      if (this.compare(this.stage.vars.nukeX.length, 0) > 0) {
        this.createClone();
        yield* this.wait(0.1);
      }
      yield;
    }
  }

  *startAsClone() {
    this.costume = "costume1";
    this.visible = true;
    this.moveAhead();
    this.goto(
      this.toNumber(this.itemOf(this.stage.vars.nukeX, 0)),
      this.toNumber(this.itemOf(this.stage.vars.nukeY, 0))
    );
    this.stage.vars.nukeX.splice(0, 1);
    this.stage.vars.nukeY.splice(0, 1);
    yield* this.moveCurrent(this.stage.vars.moves);
  }

  *moveCurrent(what) {
    while (
      !(this.compare(what, this.toNumber(this.stage.vars.moves) + -4) === 0)
    ) {
      this.costume =
        1 + (this.toNumber(this.stage.vars.moves) - this.toNumber(what));
      yield;
    }
    this.costume = "costume2";
    yield* this.wait(2);
    this.visible = false;
    while (
      !(this.compare(what, this.toNumber(this.stage.vars.moves) + -5) === 0)
    ) {
      yield;
    }
    while (
      !(this.compare(what, this.toNumber(this.stage.vars.moves) + -11) === 0)
    ) {
      this.visible = true;
      this.moveBehind();
      this.costume = "costume3";
      yield;
    }
    this.deleteThisClone();
  }
}
