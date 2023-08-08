/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GunHolding extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Da Gun", "./GunHolding/costumes/Da Gun.svg", {
        x: 9.301413333333386,
        y: 8.03295474502383
      }),
      new Costume("Da Gun2", "./GunHolding/costumes/Da Gun2.svg", {
        x: 19.611304999999987,
        y: 9.407954999999987
      }),
      new Costume("Da Gun3", "./GunHolding/costumes/Da Gun3.svg", {
        x: 26.3316839885496,
        y: 5.231002424242462
      }),
      new Costume("Da Gun4", "./GunHolding/costumes/Da Gun4.svg", {
        x: 24.0119393784029,
        y: 6.552553816364593
      }),
      new Costume("Da Gun5", "./GunHolding/costumes/Da Gun5.svg", {
        x: 22.41250000000005,
        y: 7.817075158053228
      }),
      new Costume("Da Gun6", "./GunHolding/costumes/Da Gun6.svg", {
        x: -7,
        y: 4.8125
      }),
      new Costume("Da Gun7", "./GunHolding/costumes/Da Gun7.svg", {
        x: -7,
        y: 4.8125
      }),
      new Costume("Da Gun8", "./GunHolding/costumes/Da Gun8.svg", {
        x: 16.482884999999953,
        y: 3.5911250000000052
      }),
      new Costume("8", "./GunHolding/costumes/8.svg", {
        x: 11.134525000000025,
        y: 3.2798408902858682
      }),
      new Costume("12", "./GunHolding/costumes/12.svg", {
        x: 11.676201666666685,
        y: 2.5240361442038477
      }),
      new Costume("9", "./GunHolding/costumes/9.svg", {
        x: 11.134525000000025,
        y: 3.2798408902858682
      }),
      new Costume("10", "./GunHolding/costumes/10.svg", {
        x: 4.576920000000001,
        y: 4.576920000000001
      })
    ];

    this.sounds = [new Sound("pop", "./GunHolding/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];

    this.vars.recoil = 0;
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.visible = false;
    while (true) {
      if (!(this.toNumber(this.stage.vars.shareGun) === 0)) {
        this.costume = this.stage.vars.shareGun;
        this.visible = true;
        this.goto(
          (this.toNumber(this.stage.vars.pieceSelectingX) - 1) * 44 + -156,
          (this.toNumber(this.stage.vars.pieceSelectingY) - 1) * 44 + -159
        );
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Target"].y - this.y,
            this.sprites["Target"].x - this.x
          )
        );
        this.move(this.toNumber(this.vars.recoil) * -1);
      } else {
        this.visible = false;
      }
      this.vars.recoil = this.toNumber(this.vars.recoil) / 3;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (!(this.toNumber(this.stage.vars.shareGun) === 0)) {
        if (this.toNumber(this.stage.vars.shooting) === 1) {
          yield* this.cloning();
          yield* this.wait(0.15);
        }
      }
      yield;
    }
  }

  *startAsClone() {
    if (this.toNumber(this.stage.vars.shareGun) === 3) {
      this.direction += this.random(-15, 15);
    } else {
      this.direction += this.random(-8, 8);
    }
    this.costume = 8;
    if (this.toNumber(this.stage.vars.shareGun) === 4) {
      this.costume = 12;
    }
    if (this.compare(this.stage.vars.shareGun, 4) > 0) {
      this.costume = 9;
    }
    if (this.toNumber(this.stage.vars.shareGun) === 8) {
      this.costume = 10;
    }
    this.move(45);
    while (
      !(
        this.touching(this.sprites["Pieces"].andClones()) ||
        this.touching("edge")
      )
    ) {
      this.move(this.toNumber(this.costume.name));
      yield;
    }
    yield* this.wait(0.04);
    this.deleteThisClone();
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (!(this.toNumber(this.stage.vars.shareGun) === 0)) {
        if (this.keyPressed("space")) {
          yield* this.cloning();
          yield* this.wait(0.15);
        }
      }
      yield;
    }
  }

  *cloning() {
    this.vars.recoil = 15;
    if (this.toNumber(this.stage.vars.shareGun) === 3) {
      this.createClone();
      this.createClone();
      this.createClone();
      this.createClone();
      this.createClone();
      this.createClone();
      this.createClone();
      this.createClone();
    } else {
      if (
        this.toNumber(this.stage.vars.shareGun) === 6 ||
        this.toNumber(this.stage.vars.shareGun) === 7
      ) {
        this.stage.vars.nukeX.push(this.sprites["Target"].x);
        this.stage.vars.nukeY.push(this.sprites["Target"].y);
      } else {
        this.createClone();
      }
    }
    this.broadcast("SHOOT");
  }
}
