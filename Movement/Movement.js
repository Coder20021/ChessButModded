/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Movement extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Movement/costumes/costume1.svg", {
        x: 11.91667000000001,
        y: 11.91667000000001
      }),
      new Costume("costume2", "./Movement/costumes/costume2.svg", {
        x: 11.91667000000001,
        y: 11.91667000000001
      }),
      new Costume("costume4", "./Movement/costumes/costume4.svg", {
        x: 11.91667000000001,
        y: 11.91667000000001
      }),
      new Costume("costume5", "./Movement/costumes/costume5.svg", {
        x: 11.91667000000001,
        y: 11.91667000000001
      }),
      new Costume("costume6", "./Movement/costumes/costume6.svg", {
        x: 11.91667000000001,
        y: 11.91667000000001
      }),
      new Costume("costume7", "./Movement/costumes/costume7.svg", {
        x: 11.91667000000001,
        y: 11.91667000000001
      }),
      new Costume("Diagnal 8", "./Movement/costumes/Diagnal 8.svg", {
        x: -40.25,
        y: 267.5
      }),
      new Costume("Diagnal 7", "./Movement/costumes/Diagnal 7.svg", {
        x: -40.49999968750001,
        y: 224.33333833333336
      }),
      new Costume("Diagnal 6", "./Movement/costumes/Diagnal 6.svg", {
        x: -40.607147499999996,
        y: 179.95535214285718
      }),
      new Costume("Diagnal 5", "./Movement/costumes/Diagnal 5.png", {
        x: -80,
        y: 275
      }),
      new Costume("Diagnal 4", "./Movement/costumes/Diagnal 4.png", {
        x: -80,
        y: 184
      }),
      new Costume("Diagnal 3", "./Movement/costumes/Diagnal 3.png", {
        x: -80,
        y: 97
      }),
      new Costume("Horizontal 8", "./Movement/costumes/Horizontal 8.svg", {
        x: -41,
        y: 3.5
      }),
      new Costume("Horizontal 7", "./Movement/costumes/Horizontal 7.png", {
        x: -81,
        y: 6
      }),
      new Costume("Horizontal 6", "./Movement/costumes/Horizontal 6.png", {
        x: -81,
        y: 5
      }),
      new Costume("Horizontal 5", "./Movement/costumes/Horizontal 5.png", {
        x: -81,
        y: 5
      }),
      new Costume("Horizontal 4", "./Movement/costumes/Horizontal 4.png", {
        x: -81,
        y: 5
      }),
      new Costume("Horizontal 3", "./Movement/costumes/Horizontal 3.png", {
        x: -81,
        y: 5
      })
    ];

    this.sounds = [new Sound("pop", "./Movement/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];

    this.vars.minePosX = 0;
    this.vars.minePosY = 0;
    this.vars.amIShowed = 0;
    this.vars.TestChecked = 1;
  }

  *whenGreenFlagClicked() {
    this.costume = "costume1";
    this.goto(-153, 154);
    this.effects.ghost = 25;
    for (let i = 0; i < 8; i++) {
      for (let i = 0; i < 8; i++) {
        this.createClone();
        this.x += 44;
        yield;
      }
      this.x = -153;
      this.y -= 44;
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      this.visible = false;
      this.vars.amIShowed = 0;
      this.vars.minePosX = (this.x + 153) / 44 + 1;
      this.vars.minePosY = (this.y + 154) / 44 + 1;
      if (this.toNumber(this.stage.vars.pieceName) === 0) {
        if (this.toNumber(this.stage.vars.pieceColour) === 1) {
          yield* this.whitePawn();
        } else {
          yield* this.blackPawn();
        }
      }
      if (this.toNumber(this.stage.vars.pieceName) === 1) {
        yield* this.king();
      }
      if (this.toNumber(this.stage.vars.pieceName) === 4) {
        yield* this.knights();
      }
      if (this.toNumber(this.stage.vars.pieceName) === 5) {
        yield* this.bishop();
      }
      if (this.toNumber(this.stage.vars.pieceName) === 3) {
        yield* this.rook();
      }
      if (this.toNumber(this.stage.vars.pieceName) === 2) {
        yield* this.queen();
      }
      if (this.toNumber(this.stage.vars.turn) === 1) {
        if (this.touching(Color.rgb(255, 231, 173))) {
          this.visible = false;
        }
      } else {
        if (this.touching(Color.rgb(0, 0, 0))) {
          this.visible = false;
        }
      }
      if (
        this.toNumber(this.vars.amIShowed) === 1 &&
        this.toNumber(this.stage.vars.aim) === 0
      ) {
        if (this.touching("mouse")) {
          if (this.mouse.down) {
            if (this.toNumber(this.stage.vars.pieceName) === 1) {
              if (this.toNumber(this.stage.vars.pieceColour) === 1) {
                this.stage.vars.castleLeftSideW = 0;
                this.stage.vars.castleRightSideW = 0;
              }
              if (this.toNumber(this.stage.vars.pieceColour) === 0) {
                this.stage.vars.castleLeftSideB = 0;
                this.stage.vars.castleRightSideB = 0;
              }
            }
            this.stage.vars.movePieceTo =
              this.toString(this.vars.minePosX) +
              this.toString(this.vars.minePosY);
            if (this.costumeNumber === 2) {
              this.stage.vars.takePieceInThePosittion =
                this.toString(this.vars.minePosX) +
                this.toString(this.vars.minePosY) +
                this.toString(this.stage.vars.turn);
            }
            if (this.costumeNumber === 3) {
              this.stage.vars.castleLeftSideW = 0;
              this.stage.vars.castleRightSideW = 0;
              this.broadcast("castle left side");
            }
            if (this.costumeNumber === 4) {
              this.stage.vars.castleLeftSideW = 0;
              this.stage.vars.castleRightSideW = 0;
              this.broadcast("castle right side");
            }
            if (this.costumeNumber === 5) {
              this.stage.vars.castleLeftSideB = 0;
              this.stage.vars.castleRightSideB = 0;
              this.broadcast("Black left side");
            }
            if (this.costumeNumber === 6) {
              this.stage.vars.castleLeftSideB = 0;
              this.stage.vars.castleRightSideB = 0;
              this.broadcast("Black Right Side");
            }
          }
        }
      }
      yield;
    }
  }

  *showAndUpdateVarible(mode) {
    this.visible = true;
    this.vars.amIShowed = 1;
    this.costume = mode;
  }

  *whitePawn() {
    if (
      this.compare(
        this.vars.minePosY,
        this.toNumber(this.stage.vars.pieceSelectingY) + 1
      ) === 0 &&
      this.compare(
        this.vars.minePosX,
        this.toNumber(this.stage.vars.pieceSelectingX) + 1
      ) === 0
    ) {
      if (this.touching(Color.rgb(0, 0, 0))) {
        yield* this.showAndUpdateVarible(2);
      } else {
        this.visible = false;
      }
    }
    if (
      this.compare(
        this.vars.minePosY,
        this.toNumber(this.stage.vars.pieceSelectingY) + 1
      ) === 0 &&
      this.compare(
        this.vars.minePosX,
        this.toNumber(this.stage.vars.pieceSelectingX) + -1
      ) === 0
    ) {
      if (this.touching(Color.rgb(0, 0, 0))) {
        yield* this.showAndUpdateVarible(2);
      } else {
        this.visible = false;
      }
    }
    if (
      this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) === 0
    ) {
      if (
        this.compare(
          this.vars.minePosY,
          this.toNumber(this.stage.vars.pieceSelectingY) + 1
        ) === 0
      ) {
        yield* this.showAndUpdateVarible(1);
      }
      if (
        this.compare(
          this.vars.minePosY,
          this.toNumber(this.stage.vars.pieceSelectingY) + 2
        ) === 0 &&
        this.toNumber(this.stage.vars.pieceSelectingY) === 2
      ) {
        yield* this.showAndUpdateVarible(1);
      }
    }
  }

  *blackPawn() {
    if (
      this.compare(
        this.vars.minePosY,
        this.toNumber(this.stage.vars.pieceSelectingY) + -1
      ) === 0 &&
      this.compare(
        this.vars.minePosX,
        this.toNumber(this.stage.vars.pieceSelectingX) + 1
      ) === 0
    ) {
      if (this.touching(Color.rgb(255, 231, 173))) {
        yield* this.showAndUpdateVarible(2);
      } else {
        this.visible = false;
      }
    }
    if (
      this.compare(
        this.vars.minePosY,
        this.toNumber(this.stage.vars.pieceSelectingY) + -1
      ) === 0 &&
      this.compare(
        this.vars.minePosX,
        this.toNumber(this.stage.vars.pieceSelectingX) + -1
      ) === 0
    ) {
      if (this.touching(Color.rgb(255, 231, 173))) {
        yield* this.showAndUpdateVarible(2);
      } else {
        this.visible = false;
      }
    }
    if (
      this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) === 0
    ) {
      if (
        this.compare(
          this.vars.minePosY,
          this.toNumber(this.stage.vars.pieceSelectingY) + -1
        ) === 0
      ) {
        yield* this.showAndUpdateVarible(1);
      }
      if (
        this.compare(
          this.vars.minePosY,
          this.toNumber(this.stage.vars.pieceSelectingY) + -2
        ) === 0 &&
        this.toNumber(this.stage.vars.pieceSelectingY) === 7
      ) {
        yield* this.showAndUpdateVarible(1);
      }
    }
  }

  *king() {
    if (
      this.compare(
        Math.abs(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX)
        ),
        2
      ) < 0 &&
      this.compare(
        Math.abs(
          this.toNumber(this.vars.minePosY) -
            this.toNumber(this.stage.vars.pieceSelectingY)
        ),
        2
      ) < 0 &&
      !(
        this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
          0 &&
        this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) === 0
      )
    ) {
      if (
        (this.toNumber(this.stage.vars.pieceColour) === 1 &&
          this.touching(Color.rgb(0, 0, 0))) ||
        (this.toNumber(this.stage.vars.pieceColour) === 0 &&
          this.touching(Color.rgb(255, 231, 173)))
      ) {
        yield* this.showAndUpdateVarible(2);
      } else {
        yield* this.showAndUpdateVarible(1);
      }
    }
    if (this.toNumber(this.stage.vars.turn) === 1) {
      if (this.toNumber(this.stage.vars.castleLeftSideW) === 1) {
        if (
          this.toNumber(this.vars.minePosX) === 3 &&
          this.toNumber(this.vars.minePosY) === 1
        ) {
          yield* this.showAndUpdateVarible(3);
        }
      }
      if (this.toNumber(this.stage.vars.castleRightSideW) === 1) {
        if (
          this.toNumber(this.vars.minePosX) === 7 &&
          this.toNumber(this.vars.minePosY) === 1
        ) {
          yield* this.showAndUpdateVarible(4);
        }
      }
    }
    if (this.toNumber(this.stage.vars.turn) === 0) {
      if (this.toNumber(this.stage.vars.castleLeftSideB) === 1) {
        if (
          this.toNumber(this.vars.minePosX) === 3 &&
          this.toNumber(this.vars.minePosY) === 8
        ) {
          yield* this.showAndUpdateVarible(5);
        }
      }
      if (this.toNumber(this.stage.vars.castleRightSideB) === 1) {
        if (
          this.toNumber(this.vars.minePosX) === 7 &&
          this.toNumber(this.vars.minePosY) === 8
        ) {
          yield* this.showAndUpdateVarible(6);
        }
      }
    }
  }

  *knights() {
    if (
      (Math.abs(
        this.toNumber(this.vars.minePosY) -
          this.toNumber(this.stage.vars.pieceSelectingY)
      ) === 1 &&
        Math.abs(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX)
        ) === 2) ||
      (Math.abs(
        this.toNumber(this.vars.minePosY) -
          this.toNumber(this.stage.vars.pieceSelectingY)
      ) === 2 &&
        Math.abs(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX)
        ) === 1)
    ) {
      if (
        (this.toNumber(this.stage.vars.pieceColour) === 1 &&
          this.touching(Color.rgb(0, 0, 0))) ||
        (this.toNumber(this.stage.vars.pieceColour) === 0 &&
          this.touching(Color.rgb(255, 231, 173)))
      ) {
        yield* this.showAndUpdateVarible(2);
      } else {
        yield* this.showAndUpdateVarible(1);
      }
    }
  }

  *bishop() {
    this.vars.TestChecked = 0;
    if (
      this.compare(
        Math.abs(
          this.toNumber(this.vars.minePosY) -
            this.toNumber(this.stage.vars.pieceSelectingY)
        ),
        Math.abs(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX)
        )
      ) === 0 &&
      !(
        this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
          0 &&
        this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) === 0
      )
    ) {
      if (
        this.compare(
          this.toNumber(this.vars.minePosY) -
            this.toNumber(this.stage.vars.pieceSelectingY),
          1
        ) > 0 &&
        this.compare(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX),
          1
        ) > 0
      ) {
        this.direction = -90;
        this.costume =
          "Diagnal " +
          this.toString(
            Math.abs(
              this.toNumber(this.vars.minePosY) -
                this.toNumber(this.stage.vars.pieceSelectingY)
            ) + 1
          );
        this.vars.TestChecked = 1;
      }
      if (
        this.compare(
          this.toNumber(this.vars.minePosY) -
            this.toNumber(this.stage.vars.pieceSelectingY),
          1
        ) > 0 &&
        this.compare(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX),
          -1
        ) < 0
      ) {
        this.direction = 180;
        this.costume =
          "Diagnal " +
          this.toString(
            Math.abs(
              this.toNumber(this.vars.minePosY) -
                this.toNumber(this.stage.vars.pieceSelectingY)
            ) + 1
          );
        this.vars.TestChecked = 1;
      }
      if (
        this.compare(
          this.toNumber(this.vars.minePosY) -
            this.toNumber(this.stage.vars.pieceSelectingY),
          -1
        ) < 0 &&
        this.compare(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX),
          -1
        ) < 0
      ) {
        this.direction = 90;
        this.costume =
          "Diagnal " +
          this.toString(
            Math.abs(
              this.toNumber(this.vars.minePosX) -
                this.toNumber(this.stage.vars.pieceSelectingX)
            ) + 1
          );
        this.vars.TestChecked = 1;
      }
      if (
        this.compare(
          this.toNumber(this.vars.minePosY) -
            this.toNumber(this.stage.vars.pieceSelectingY),
          -1
        ) < 0 &&
        this.compare(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX),
          1
        ) > 0
      ) {
        this.direction = 0;
        this.costume =
          "Diagnal " +
          this.toString(
            Math.abs(
              this.toNumber(this.vars.minePosX) -
                this.toNumber(this.stage.vars.pieceSelectingX)
            ) + 1
          );
        this.vars.TestChecked = 1;
      }
      if (
        (this.touching(Color.rgb(0, 0, 0)) ||
          this.touching(Color.rgb(255, 231, 173))) &&
        this.compare(this.vars.TestChecked, 0) > 0
      ) {
        this.visible = false;
      } else {
        this.costume = "costume1";
        if (
          (this.toNumber(this.stage.vars.pieceColour) === 1 &&
            this.touching(Color.rgb(0, 0, 0))) ||
          (this.toNumber(this.stage.vars.pieceColour) === 0 &&
            this.touching(Color.rgb(255, 231, 173)))
        ) {
          yield* this.showAndUpdateVarible(2);
        } else {
          yield* this.showAndUpdateVarible(1);
        }
      }
    }
  }

  *rook() {
    this.vars.TestChecked = 0;
    if (
      (this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) ===
        0 ||
        this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
          0) &&
      !(
        this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
          0 &&
        this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) === 0
      )
    ) {
      if (
        this.compare(
          this.toNumber(this.vars.minePosY) -
            this.toNumber(this.stage.vars.pieceSelectingY),
          1
        ) > 0
      ) {
        this.direction = 180;
        this.costume =
          "Horizontal " +
          this.toString(
            Math.abs(
              this.toNumber(this.vars.minePosY) -
                this.toNumber(this.stage.vars.pieceSelectingY)
            ) + 1
          );
        this.vars.TestChecked = 1;
      }
      if (
        this.compare(
          this.toNumber(this.vars.minePosY) -
            this.toNumber(this.stage.vars.pieceSelectingY),
          -1
        ) < 0
      ) {
        this.direction = 0;
        this.costume =
          "Horizontal " +
          this.toString(
            Math.abs(
              this.toNumber(this.vars.minePosY) -
                this.toNumber(this.stage.vars.pieceSelectingY)
            ) + 1
          );
        this.vars.TestChecked = 1;
      }
      if (
        this.compare(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX),
          1
        ) > 0
      ) {
        this.direction = -90;
        this.costume =
          "Horizontal " +
          this.toString(
            Math.abs(
              this.toNumber(this.vars.minePosX) -
                this.toNumber(this.stage.vars.pieceSelectingX)
            ) + 1
          );
        this.vars.TestChecked = 1;
      }
      if (
        this.compare(
          this.toNumber(this.vars.minePosX) -
            this.toNumber(this.stage.vars.pieceSelectingX),
          -1
        ) < 0
      ) {
        this.direction = 90;
        this.costume =
          "Horizontal " +
          this.toString(
            Math.abs(
              this.toNumber(this.vars.minePosX) -
                this.toNumber(this.stage.vars.pieceSelectingX)
            ) + 1
          );
        this.vars.TestChecked = 1;
      }
      if (
        (this.touching(Color.rgb(0, 0, 0)) ||
          this.touching(Color.rgb(255, 231, 173))) &&
        this.toNumber(this.vars.TestChecked) === 1
      ) {
        this.visible = false;
      } else {
        this.costume = "costume1";
        if (
          (this.toNumber(this.stage.vars.pieceColour) === 1 &&
            this.touching(Color.rgb(0, 0, 0))) ||
          (this.toNumber(this.stage.vars.pieceColour) === 0 &&
            this.touching(Color.rgb(255, 231, 173)))
        ) {
          yield* this.showAndUpdateVarible(2);
        } else {
          yield* this.showAndUpdateVarible(1);
        }
      }
    }
  }

  *queen() {
    this.vars.TestChecked = 0;
    if (
      (this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) ===
        0 ||
        this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
          0 ||
        this.compare(
          Math.abs(
            this.toNumber(this.vars.minePosY) -
              this.toNumber(this.stage.vars.pieceSelectingY)
          ),
          Math.abs(
            this.toNumber(this.vars.minePosX) -
              this.toNumber(this.stage.vars.pieceSelectingX)
          )
        ) === 0) &&
      !(
        this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
          0 &&
        this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) === 0
      )
    ) {
      if (
        this.compare(
          Math.abs(
            this.toNumber(this.vars.minePosY) -
              this.toNumber(this.stage.vars.pieceSelectingY)
          ),
          Math.abs(
            this.toNumber(this.vars.minePosX) -
              this.toNumber(this.stage.vars.pieceSelectingX)
          )
        ) === 0 &&
        !(
          this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
            0 &&
          this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) ===
            0
        )
      ) {
        if (
          this.compare(
            this.toNumber(this.vars.minePosY) -
              this.toNumber(this.stage.vars.pieceSelectingY),
            1
          ) > 0 &&
          this.compare(
            this.toNumber(this.vars.minePosX) -
              this.toNumber(this.stage.vars.pieceSelectingX),
            1
          ) > 0
        ) {
          this.direction = -90;
          this.costume =
            "Diagnal " +
            this.toString(
              Math.abs(
                this.toNumber(this.vars.minePosY) -
                  this.toNumber(this.stage.vars.pieceSelectingY)
              ) + 1
            );
          this.vars.TestChecked = 1;
        }
        if (
          this.compare(
            this.toNumber(this.vars.minePosY) -
              this.toNumber(this.stage.vars.pieceSelectingY),
            1
          ) > 0 &&
          this.compare(
            this.toNumber(this.vars.minePosX) -
              this.toNumber(this.stage.vars.pieceSelectingX),
            -1
          ) < 0
        ) {
          this.direction = 180;
          this.costume =
            "Diagnal " +
            this.toString(
              Math.abs(
                this.toNumber(this.vars.minePosY) -
                  this.toNumber(this.stage.vars.pieceSelectingY)
              ) + 1
            );
          this.vars.TestChecked = 1;
        }
        if (
          this.compare(
            this.toNumber(this.vars.minePosY) -
              this.toNumber(this.stage.vars.pieceSelectingY),
            -1
          ) < 0 &&
          this.compare(
            this.toNumber(this.vars.minePosX) -
              this.toNumber(this.stage.vars.pieceSelectingX),
            -1
          ) < 0
        ) {
          this.direction = 90;
          this.costume =
            "Diagnal " +
            this.toString(
              Math.abs(
                this.toNumber(this.vars.minePosX) -
                  this.toNumber(this.stage.vars.pieceSelectingX)
              ) + 1
            );
          this.vars.TestChecked = 1;
        }
        if (
          this.compare(
            this.toNumber(this.vars.minePosY) -
              this.toNumber(this.stage.vars.pieceSelectingY),
            -1
          ) < 0 &&
          this.compare(
            this.toNumber(this.vars.minePosX) -
              this.toNumber(this.stage.vars.pieceSelectingX),
            1
          ) > 0
        ) {
          this.direction = 0;
          this.costume =
            "Diagnal " +
            this.toString(
              Math.abs(
                this.toNumber(this.vars.minePosX) -
                  this.toNumber(this.stage.vars.pieceSelectingX)
              ) + 1
            );
          this.vars.TestChecked = 1;
        }
      }
      if (
        (this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) ===
          0 ||
          this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
            0) &&
        !(
          this.compare(this.vars.minePosX, this.stage.vars.pieceSelectingX) ===
            0 &&
          this.compare(this.vars.minePosY, this.stage.vars.pieceSelectingY) ===
            0
        )
      ) {
        if (
          this.compare(
            this.toNumber(this.vars.minePosY) -
              this.toNumber(this.stage.vars.pieceSelectingY),
            1
          ) > 0
        ) {
          this.direction = 180;
          this.costume =
            "Horizontal " +
            this.toString(
              Math.abs(
                this.toNumber(this.vars.minePosY) -
                  this.toNumber(this.stage.vars.pieceSelectingY)
              ) + 1
            );
          this.vars.TestChecked = 1;
        }
        if (
          this.compare(
            this.toNumber(this.vars.minePosY) -
              this.toNumber(this.stage.vars.pieceSelectingY),
            -1
          ) < 0
        ) {
          this.direction = 0;
          this.costume =
            "Horizontal " +
            this.toString(
              Math.abs(
                this.toNumber(this.vars.minePosY) -
                  this.toNumber(this.stage.vars.pieceSelectingY)
              ) + 1
            );
          this.vars.TestChecked = 1;
        }
        if (
          this.compare(
            this.toNumber(this.vars.minePosX) -
              this.toNumber(this.stage.vars.pieceSelectingX),
            1
          ) > 0
        ) {
          this.direction = -90;
          this.costume =
            "Horizontal " +
            this.toString(
              Math.abs(
                this.toNumber(this.vars.minePosX) -
                  this.toNumber(this.stage.vars.pieceSelectingX)
              ) + 1
            );
          this.vars.TestChecked = 1;
        }
        if (
          this.compare(
            this.toNumber(this.vars.minePosX) -
              this.toNumber(this.stage.vars.pieceSelectingX),
            -1
          ) < 0
        ) {
          this.direction = 90;
          this.costume =
            "Horizontal " +
            this.toString(
              Math.abs(
                this.toNumber(this.vars.minePosX) -
                  this.toNumber(this.stage.vars.pieceSelectingX)
              ) + 1
            );
          this.vars.TestChecked = 1;
        }
      }
      if (
        (this.touching(Color.rgb(0, 0, 0)) ||
          this.touching(Color.rgb(255, 231, 173))) &&
        this.toNumber(this.vars.TestChecked) === 1
      ) {
        this.visible = false;
      } else {
        this.costume = "costume1";
        if (
          (this.toNumber(this.stage.vars.pieceColour) === 1 &&
            this.touching(Color.rgb(0, 0, 0))) ||
          (this.toNumber(this.stage.vars.pieceColour) === 0 &&
            this.touching(Color.rgb(255, 231, 173)))
        ) {
          yield* this.showAndUpdateVarible(2);
        } else {
          yield* this.showAndUpdateVarible(1);
        }
      }
    }
  }

  *startAsClone2() {
    this.effects.ghost = 40;
  }
}
