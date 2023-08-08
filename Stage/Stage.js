/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 179.99999833333334
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 240,
        y: 180
      }),
      new Costume("backdrop3", "./Stage/costumes/backdrop3.svg", {
        x: 240,
        y: 180
      }),
      new Costume("backdrop4", "./Stage/costumes/backdrop4.svg", {
        x: 360.4765625000001,
        y: 200.5
      }),
      new Costume("backdrop5", "./Stage/costumes/backdrop5.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.KEY_PRESSED, { key: "m" }, this.whenKeyMPressed)
    ];

    this.vars.pieceSelectingX = 0;
    this.vars.pieceName = 0;
    this.vars.pieceColour = 0;
    this.vars.pieceSelectingY = 0;
    this.vars.movePieceTo = 0;
    this.vars.takePieceInThePosittion = 0;
    this.vars.turn = 0;
    this.vars.castleLeftSideW = 1;
    this.vars.castleRightSideW = 1;
    this.vars.castleLeftSideB = 1;
    this.vars.castleRightSideB = 1;
    this.vars.moves = 1;
    this.vars.aSquareGetAGun = 0;
    this.vars.aWhatType = 0;
    this.vars.aAmmoGiving = 0;
    this.vars.shareGun = 0;
    this.vars.shooting = 0;
    this.vars.aim = 1;
    this.vars.HpShown = 20;
    this.vars.WeaponShowned = 0;
    this.vars.PieceShown = 3;
    this.vars.ammoGivingForEachGuns = [5, 10, 2, 3, 20, 1, 2, 1];
    this.vars.originalHp = [40, 30, 20, 15, 17, 10];
    this.vars.nukeX = [];
    this.vars.nukeY = [];
    this.watchers.HpShown = new Watcher({
      label: "/HP SHOWN",
      style: "large",
      visible: false,
      value: () => this.vars.HpShown,
      x: 661,
      y: 124
    });
  }

  *whenKeyMPressed() {
    this.costumeNumber++;
  }
}
