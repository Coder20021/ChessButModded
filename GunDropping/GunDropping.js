/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GunDropping extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./GunDropping/costumes/costume1.svg", {
        x: 15.551410000000004,
        y: 12.414179999999988
      }),
      new Costume("costume2", "./GunDropping/costumes/costume2.svg", {
        x: 19.611310000000003,
        y: 15.213204999999988
      }),
      new Costume("costume3", "./GunDropping/costumes/costume3.svg", {
        x: 24.087500000000006,
        y: 15.213204999999988
      }),
      new Costume("costume4", "./GunDropping/costumes/costume4.svg", {
        x: 20.033690000000007,
        y: 15.213204999999988
      }),
      new Costume("costume5", "./GunDropping/costumes/costume5.svg", {
        x: 22.412499999999994,
        y: 15.213204999999988
      }),
      new Costume("NUKE", "./GunDropping/costumes/NUKE.svg", {
        x: 16.457528273310515,
        y: 16.081734566848525
      }),
      new Costume("NUKE2", "./GunDropping/costumes/NUKE2.svg", {
        x: 17.59024231030125,
        y: 14.64471555740326
      }),
      new Costume("NUKE3", "./GunDropping/costumes/NUKE3.svg", {
        x: 16.482875000000007,
        y: 15.213204999999988
      })
    ];

    this.sounds = [new Sound("pop", "./GunDropping/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.minePosX = 2;
    this.vars.minePosY = 5;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.nukeX = [];
    this.stage.vars.nukeY = [];
    this.visible = false;
    yield* this.wait(1.5);
    while (true) {
      yield* this.set(this.toNumber(this.stage.vars.moves) + this.random(1, 5));
      if (this.random(1, 3) === 2) {
        this.createClone();
        this.createClone();
      } else {
        this.createClone();
      }
      yield;
    }
  }

  *set(f) {
    while (!(this.compare(this.stage.vars.moves, f) === 0)) {
      yield;
    }
  }

  *startAsClone() {
    this.costume = this.random(1, 8);
    this.goto(-153, 154);
    this.x += 44 * this.random(0, 7);
    this.y += -44 * this.random(0, 7);
    while (
      !!(
        this.touching(Color.rgb(255, 231, 173)) ||
        this.touching(Color.rgb(0, 0, 0))
      )
    ) {
      this.goto(-153, 154);
      this.x += 44 * this.random(0, 7);
      this.y += -44 * this.random(0, 7);
      yield;
    }
    this.visible = true;
    while (true) {
      this.vars.minePosX = (this.x + 153) / 44 + 1;
      this.vars.minePosY = (this.y + 154) / 44 + 1;
      if (
        this.touching(Color.rgb(255, 231, 173)) ||
        this.touching(Color.rgb(0, 0, 0))
      ) {
        this.stage.vars.aSquareGetAGun =
          this.toString(this.vars.minePosX) + this.toString(this.vars.minePosY);
        this.stage.vars.aWhatType = this.costumeNumber;
        this.stage.vars.aAmmoGiving = this.itemOf(
          this.stage.vars.ammoGivingForEachGuns,
          this.costumeNumber - 1
        );
        this.deleteThisClone();
      }
      yield;
    }
  }
}
