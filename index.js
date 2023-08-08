import {
  Project,
  Sprite
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import GunDropping from "./GunDropping/GunDropping.js";
import Pieces from "./Pieces/Pieces.js";
import GunHolding from "./GunHolding/GunHolding.js";
import Target from "./Target/Target.js";
import Movement from "./Movement/Movement.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import Sprite3 from "./Sprite3/Sprite3.js";
import Sprite5 from "./Sprite5/Sprite5.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import Sprite4 from "./Sprite4/Sprite4.js";
import WeaponBar from "./WeaponBar/WeaponBar.js";
import Hp from "./Hp/Hp.js";
import PieceBar from "./PieceBar/PieceBar.js";
import NukeSymbol from "./NukeSymbol/NukeSymbol.js";

const stage = new Stage({ costumeNumber: 4 });

const sprites = {
  GunDropping: new GunDropping({
    x: -110,
    y: 25,
    direction: 45,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 8,
    size: 100,
    visible: false,
    layerOrder: 11
  }),
  Pieces: new Pieces({
    x: -200,
    y: -115,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 12,
    size: 100,
    visible: false,
    layerOrder: 7
  }),
  GunHolding: new GunHolding({
    x: 64,
    y: 17,
    direction: -134.81457741265606,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 8,
    size: 100,
    visible: false,
    layerOrder: 14
  }),
  Target: new Target({
    x: -91,
    y: -137,
    direction: -134.81457741265606,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 8
  }),
  Movement: new Movement({
    x: -153,
    y: -180,
    direction: 179.0576518754416,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Sprite2: new Sprite2({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9
  }),
  Sprite3: new Sprite3({
    x: -209,
    y: -2,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Sprite5: new Sprite5({
    x: -200.37257295496323,
    y: -82.56862146714155,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  Sprite1: new Sprite1({
    x: 213,
    y: 137,
    direction: 2,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 11,
    size: 100,
    visible: false,
    layerOrder: 13
  }),
  Sprite4: new Sprite4({
    x: -200.11032389476998,
    y: -127.9776476994267,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  WeaponBar: new WeaponBar({
    x: 204,
    y: -62,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 8,
    size: 100,
    visible: false,
    layerOrder: 6
  }),
  Hp: new Hp({
    x: 205.4440502565886,
    y: 129.65701949294174,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 10,
    size: 100,
    visible: true,
    layerOrder: 12
  }),
  PieceBar: new PieceBar({
    x: 206.41402943345702,
    y: 56.39780677156055,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 3,
    size: 100,
    visible: true,
    layerOrder: 5
  }),
  NukeSymbol: new NukeSymbol({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 6,
    size: 100,
    visible: false,
    layerOrder: 10
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
