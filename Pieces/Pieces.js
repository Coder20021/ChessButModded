/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Pieces extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("k", "./Pieces/costumes/k.png", { x: 31, y: 55 }),
      new Costume("q", "./Pieces/costumes/q.png", { x: 36, y: 50 }),
      new Costume("r", "./Pieces/costumes/r.png", { x: 35, y: 46 }),
      new Costume("n", "./Pieces/costumes/n.png", { x: 28, y: 51 }),
      new Costume("b", "./Pieces/costumes/b.png", { x: 23, y: 49 }),
      new Costume("p", "./Pieces/costumes/p.png", { x: 19, y: 48 }),
      new Costume("wk", "./Pieces/costumes/wk.png", { x: 31, y: 55 }),
      new Costume("wq", "./Pieces/costumes/wq.png", { x: 36, y: 50 }),
      new Costume("wr", "./Pieces/costumes/wr.png", { x: 35, y: 46 }),
      new Costume("wh", "./Pieces/costumes/wh.png", { x: 28, y: 51 }),
      new Costume("wb", "./Pieces/costumes/wb.png", { x: 23, y: 49 }),
      new Costume("wp", "./Pieces/costumes/wp.png", { x: 19, y: 48 })
    ];

    this.sounds = [
      new Sound("Afro String", "./Pieces/sounds/Afro String.wav"),
      new Sound("Croak", "./Pieces/sounds/Croak.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "SHOOT" }, this.whenIReceiveShoot),
      new Trigger(
        Trigger.BROADCAST,
        { name: "castle left side" },
        this.whenIReceiveCastleLeftSide
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Black left side" },
        this.whenIReceiveBlackLeftSide
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Black Right Side" },
        this.whenIReceiveBlackRightSide
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "castle right side" },
        this.whenIReceiveCastleRightSide
      )
    ];

    this.vars.itemHolding = 0;
    this.vars.aAmmoIAmHaving = 0;
    this.vars.hp = 10;
    this.vars.speed = 0;
    this.vars.diCtion = 0;
    this.vars.diretion2 = -10;
  }

  *resetMovesSelections() {
    this.stage.vars.movePieceTo = 0;
    this.stage.vars.pieceSelectingX = 0;
    this.stage.vars.pieceSelectingY = 0;
    this.stage.vars.pieceColour = 0;
    this.stage.vars.pieceName = 0;
    this.stage.vars.shareGun = "";
  }

  *whenGreenFlagClicked() {
    this.stage.vars.moves = 0;
    this.stage.vars.movePieceTo = 0;
    this.stage.vars.pieceSelectingX = 0;
    this.stage.vars.pieceSelectingY = 0;
    this.stage.vars.pieceName = 0;
    this.stage.vars.pieceColour = 0;
    this.stage.vars.turn = 1;
    this.stage.vars.takePieceInThePosittion = 0;
    this.stage.vars.castleLeftSideB = 1;
    this.stage.vars.castleLeftSideW = 1;
    this.stage.vars.castleRightSideB = 1;
    this.stage.vars.castleRightSideW = 1;
    this.stage.vars.aWhatType = 0;
    this.stage.vars.aSquareGetAGun = 0;
    this.stage.vars.shareGun = "";
    this.goto(-156, 149);
    this.costume = "r";
    this.createClone();
    this.x += 44;
    this.costume = "n";
    this.createClone();
    this.x += 44;
    this.costume = "b";
    this.createClone();
    this.x += 44;
    this.costume = "q";
    this.createClone();
    this.x += 44;
    this.costume = "k";
    this.createClone();
    this.x += 44;
    this.costume = "b";
    this.createClone();
    this.x += 44;
    this.costume = "n";
    this.createClone();
    this.x += 44;
    this.costume = "r";
    this.createClone();
    this.x += 44;
    this.goto(-156, 149);
    this.y -= 44;
    for (let i = 0; i < 8; i++) {
      this.costume = "p";
      this.createClone();
      this.x += 44;
      yield;
    }
    this.goto(-156, 149);
    this.y -= 44;
    this.y -= 44;
    this.y -= 44;
    this.y -= 44;
    this.y -= 44;
    this.y -= 44;
    this.y -= 44;
    this.costume = "wr";
    this.createClone();
    this.x += 44;
    this.costume = "wh";
    this.createClone();
    this.x += 44;
    this.costume = "wb";
    this.createClone();
    this.x += 44;
    this.costume = "wq";
    this.createClone();
    this.x += 44;
    this.costume = "wk";
    this.createClone();
    this.x += 44;
    this.costume = "wb";
    this.createClone();
    this.x += 44;
    this.costume = "wh";
    this.createClone();
    this.x += 44;
    this.costume = "wr";
    this.createClone();
    this.y += 44;
    for (let i = 0; i < 8; i++) {
      this.costume = "wp";
      this.createClone();
      this.x -= 44;
      yield;
    }
  }

  *startAsClone() {
    this.vars.hp = this.itemOf(
      this.stage.vars.originalHp,
      (this.costumeNumber % 6) - 1
    );
    if (this.costumeNumber % 6 === 0) {
      this.vars.hp = this.itemOf(this.stage.vars.originalHp, 5);
    }
    this.vars.itemHolding = "";
    this.visible = true;
    while (true) {
      this.effects.pixelate = 0;
      if (this.touching("mouse")) {
        if (this.keyPressed("r")) {
          this.deleteThisClone();
        }
        this.stage.vars.HpShown = this.vars.hp;
        this.stage.vars.WeaponShowned = this.vars.itemHolding;
        this.stage.vars.PieceShown = this.costumeNumber % 6;
      } else {
        this.say("");
      }
      if (
        this.compare(
          Math.round(this.costumeNumber / 12 + -0.05),
          this.stage.vars.turn
        ) === 0
      ) {
        if (this.touching("mouse")) {
          if (this.mouse.down) {
            this.stage.vars.shooting = 0;
            this.stage.vars.pieceSelectingX = (this.x + 156) / 44 + 1;
            this.stage.vars.pieceSelectingY = (this.y + 159) / 44 + 1;
            this.stage.vars.pieceName = this.costumeNumber % 6;
            this.stage.vars.pieceColour = Math.round(
              this.costumeNumber / 12 + -0.05
            );
            this.stage.vars.shareGun = this.vars.itemHolding;
            this.stage.vars.aim = 0;
          }
        } else {
          this.say("");
        }
      }
      if (!(this.toNumber(this.stage.vars.movePieceTo) === 0)) {
        if (
          this.compare(
            this.stage.vars.pieceSelectingX,
            (this.x + 156) / 44 + 1
          ) === 0 &&
          this.compare(
            this.stage.vars.pieceSelectingY,
            (this.y + 159) / 44 + 1
          ) === 0
        ) {
          this.goto(
            (this.toNumber(this.letterOf(this.stage.vars.movePieceTo, 0)) - 1) *
              44 -
              156,
            (this.toNumber(this.letterOf(this.stage.vars.movePieceTo, 1)) - 1) *
              44 -
              159
          );
          yield* this.startSound("Afro String");
          yield* this.resetMovesSelections();
          if (
            this.costumeNumber === 12 &&
            this.compare(this.y, (8 - 1) * 44 - 159) === 0
          ) {
            this.costume = "wq";
            this.vars.hp += 15;
          }
          if (
            this.costumeNumber === 6 &&
            this.compare(this.y, (1 - 1) * 44 - 159) === 0
          ) {
            this.costume = "q";
            this.vars.hp += 15;
          }
          if (Math.round(this.costumeNumber / 12 + -0.05) === 1) {
            this.stage.vars.turn = 0;
          } else {
            this.stage.vars.turn = 1;
          }
          this.stage.vars.moves++;
        }
      }
      if (!(this.toNumber(this.stage.vars.takePieceInThePosittion) === 0)) {
        if (
          this.compare(
            this.letterOf(this.stage.vars.takePieceInThePosittion, 0),
            (this.x + 156) / 44 + 1
          ) === 0 &&
          this.compare(
            this.letterOf(this.stage.vars.takePieceInThePosittion, 1),
            (this.y + 159) / 44 + 1
          ) === 0 &&
            !(
              this.compare(
                Math.round(this.costumeNumber / 12 + -0.05),
                this.letterOf(this.stage.vars.takePieceInThePosittion, 2)
              ) === 0
            )
        ) {
          this.stage.vars.takePieceInThePosittion = 0;
          this.stage.vars.pieceName = "vkonwaeoigmawkel;";
          this.deleteThisClone();
        }
      }
      if (
        this.compare(
          this.stage.vars.aSquareGetAGun,
          this.toString((this.x + 156) / 44 + 1) +
            this.toString((this.y + 159) / 44 + 1)
        ) === 0
      ) {
        if (this.compare(this.vars.itemHolding, 0.5) > 0) {
          this.vars.aAmmoIAmHaving += this.toNumber(
            this.stage.vars.aAmmoGiving
          );
          this.stage.vars.aSquareGetAGun = 0;
          this.stage.vars.aAmmoGiving = 0;
        } else {
          this.vars.itemHolding = this.stage.vars.aWhatType;
          this.stage.vars.aSquareGetAGun = 0;
          this.vars.aAmmoIAmHaving = this.stage.vars.aAmmoGiving;
          this.stage.vars.aAmmoGiving = 0;
        }
      }
      if (this.touching(Color.rgb(255, 231, 0))) {
        this.vars.hp--;
        this.effects.pixelate = 25;
        yield* this.startSound("Croak");
        if (this.compare(this.vars.hp, 1) < 0) {
          yield* this.death();
        }
      }
      if (this.touching(Color.rgb(255, 110, 0))) {
        this.vars.hp -= 5;
        this.effects.pixelate = 25;
        yield* this.startSound("Croak");
        if (this.compare(this.vars.hp, 1) < 0) {
          yield* this.death();
        }
      }
      if (this.touching(Color.rgb(90, 92, 0))) {
        this.vars.hp -= 1.5;
        this.effects.pixelate = 25;
        yield* this.startSound("Croak");
        if (this.compare(this.vars.hp, 1) < 0) {
          yield* this.death();
        }
      }
      if (this.touching(Color.rgb(59, 255, 70))) {
        this.vars.hp -= 10;
        this.effects.pixelate = 25;
        yield* this.startSound("Croak");
        if (this.compare(this.vars.hp, 1) < 0) {
          yield* this.death();
        }
      }
      if (this.touching(Color.rgb(102, 59, 87))) {
        this.vars.hp -= 10;
        this.effects.pixelate = 25;
        yield* this.startSound("Croak");
        if (this.compare(this.vars.hp, 1) < 0) {
          yield* this.death();
        }
      }
      yield;
    }
  }

  *whenIReceiveShoot() {
    if (
      this.compare(this.stage.vars.pieceSelectingX, (this.x + 156) / 44 + 1) ===
        0 &&
      this.compare(this.stage.vars.pieceSelectingY, (this.y + 159) / 44 + 1) ===
        0
    ) {
      this.vars.aAmmoIAmHaving--;
      if (this.compare(this.vars.aAmmoIAmHaving, 1) < 0) {
        this.vars.aAmmoIAmHaving = 0;
        this.stage.vars.shareGun = "";
        this.vars.itemHolding = "";
      }
    }
  }

  *whenIReceiveCastleLeftSide() {
    if (1 === (this.x + 156) / 44 + 1 && 1 === (this.y + 159) / 44 + 1) {
      this.goto((4 - 1) * 44 - 156, (1 - 1) * 44 - 159);
    }
  }

  *whenIReceiveBlackLeftSide() {
    if (1 === (this.x + 156) / 44 + 1 && 8 === (this.y + 159) / 44 + 1) {
      this.goto((4 - 1) * 44 - 156, (8 - 1) * 44 - 159);
    }
  }

  *whenIReceiveBlackRightSide() {
    if (8 === (this.x + 156) / 44 + 1 && 8 === (this.y + 159) / 44 + 1) {
      this.goto((6 - 1) * 44 - 156, (8 - 1) * 44 - 159);
    }
  }

  *whenIReceiveCastleRightSide() {
    if (8 === (this.x + 156) / 44 + 1 && 1 === (this.y + 159) / 44 + 1) {
      this.goto((6 - 1) * 44 - 156, (1 - 1) * 44 - 159);
    }
  }

  *death() {
    this.moveBehind();
    this.vars.speed = 100;
    this.vars.diCtion = this.sprites["GunHolding"].direction;
    this.vars.diretion2 = this.random(-180, 180);
    while (!(this.compare(this.vars.speed, 0.4) < 0)) {
      this.direction = this.toNumber(this.vars.diCtion);
      this.move(this.toNumber(this.vars.speed));
      /* TODO: Implement motion_ifonedgebounce */ null;
      this.vars.diCtion = this.direction;
      this.vars.speed = this.toNumber(this.vars.speed) / 1.1;
      this.direction = this.toNumber(this.vars.diretion2);
      this.direction -= 10;
      this.vars.diretion2 -= 10;
      this.effects.ghost = 20;
      this.effects.brightness = -35;
      this.effects.pixelate = 0;
      yield;
    }
    yield* this.wait(1);
    this.visible = false;
    this.createClone();
  }
}
