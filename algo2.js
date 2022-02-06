import Product from "./domain/Product";
import Box from "./domain/Box";

const shirtNames = [
  "ANTI CECIL",
  "ARCADE",
  "ARIN HALLOWEEN",
  "BEAT EM UP",
  "STARCHEER (Purple)",
  "CARBUNCLE",
  "CLASSIC GRUMP",
  "GHAC TEE (GREEN)",
  "GREY 10MPH",
  "GHOUL GRUMPS",
  "ESSENTIAL TEE",
  "JINGLE GRUMP",
  "JSE HDWGH",
  "KENTO TEE",
  "KENTO TANK",
  "MANGA 1",
  "MANGA 2",
  "MANGA 3",
  "MR BIZ",
  "NAVY GRUMPS",
  "NSP 2018",
  "DINO PJ PANTS",
  "PAJAMA TOPS",
  "PRO CECIL",
  "SB MOON TEE",
  "SB NEW LOGO",
  "SB OLD LOGO",
  "SAKURA",
  "SCHOOL (PINK)",
  "SHUFFLEMASTER",
  "SJG BLK",
  "SJG GLITCH",
  "STARCHEER",
  "TENNIS (GREY)",
  "TENNIS (WHITE)",
  "TENNIS (TANK)",
  "TENNIS JOGGER",
  "DREAM D TANK",
  "DREAM D CROP",
  "ARCADE (WHITE)",
  "VGB",
  "WINDBREAKER",
  "YASHO",
  "ZELDA",
  "HALLOWEEN PJ ",
  "2012 TEE",
  "POP STAR TEE",
];
const accessoryNames = [
  "Are We Insured",
  "Arin Hat",
  "Arin Plush Head",
  "Bandaids",
  "Bandana",
  "Beanies",
  "Blankets",
  "BODY PILLOW - ARIN",
  "BODY PILLOW ARINA",
  "BODY PILLOW - FURRY ARIN",
  "BODY PILLOW - DAN",
  "BODY PILLOW DANIELLA",
  "BODY PILLOW - FURRY DAN",
  "Bottle Opener",
  "Bottles (BLUE)",
  "Bottles (ORANGE)",
  "Bunny Grumps",
  "Cheeseman",
  "Classic Sticker",
  "Classic Sticker 2",
  "Classic Spinning Keychain",
  "Dan Hat",
  "Dan Plush Head",
  "Dino Clips",
  "Dream Daddy Pin",
  "Facemasks",
  "The Guys Hat",
  "Ghoul Magnets",
  "GHAC Hardcover Books",
  "GHAC Paperback Books",
  "GHAC Pins",
  "Hedgehog Pins",
  "Lanyard - Burgie",
  "Lanyard - Fired + Missed",
  "Lanyard - Grump Heads",
  "Lanyard - Black + Orange",
  "Lanyard - The Guys",
  "Magnet Poetry",
  "MUG (YELLOW)",
  "MUG (BLUE)",
  "Mystery Pin",
  "Notebook",
  "Orange Pom Beanie",
  "Pocket Pin - Blue",
  "Pocket Pin - Green",
  "Pocket Pin - Orange",
  "Pocket Pin - Pink (Good)",
  "Pocket Pin - Pink (Bad)",
  "Puzzle",
  "RPG Stickers",
  "RPG W1",
  "RPG W2",
  "Scrunchie - Blue",
  "Scrunchie - Pink",
  "STICKY NOTES",
  "Socks",
  "Towel",
  "Valentines Pins",
  "Villager Sticker",
  "Villager Tote",
  "Wall Scroll OVA",
  "Wall Scroll Explosion",
  "Washi Tape Grumphead",
  "Washie Tape Burgie",
  "Washie Tape Fired + Missed",
  "XMAS Mugs",
];
const sizes = ["xs", "s", "m", "l", "xl", "x2", "x3", "x4", "x5"];

const smallToLargeRatio = 2; // we want ~1000 small and large 500 boxes
const smallBoxes = [];
const largeBoxes = [];

const sizeShirtsDict = {};
const accessories = [];

// shirtNames.forEach(name => {
//   shirtStockDict[name] = Object.assign({},
//     ...sizes.map(size => ({ [size]: parseInt(Math.random() * 200) })
//   ))
// });

sizes.forEach((size) => {
  sizeShirtsDict[size] = shirtNames.map((name) =>
    new Product(
      name,
      Math.random > 0.5 ? 24 : 34,
      Math.random() * 200,
      size,
      false
    ).sort((a, b) => a.quantity - b.quantity)
  );
});

accessoryNames.forEach((name) => {
  accessories.push(
    new Product(
      name,
      Math.random() * 50 + 5,
      Math.random() * 400,
      Math.random > 0.2 ? true : false
    )
  );
});

let done = false;
let outOfShirts = false;
let count = 0;

while (!done) {
  // every third box, make it a large
  box = new Box(count++ % 3 == 0);

  let sizeKeys = Object.keys(sizeShirtsDict);

  if (outOfShirts) {
    console.log(`out of shirts.
    there are still ${accessories.reduce(
      (x, t) => x.quantity + t,
      0
    )} accessories left at a value of ${accessories.reduce(
      (x, t) => x.price + t,
      0
    )}`);

    done = true;
  }

  for (let i = 0; j < sizeKeys.length; i++) {
    // check if there's still stock left for this size
    if (getSumOfSize(sizeKeys[i] > 0)) {
      shirts = sizeShirtsDict[sizeKeys[i]];
      // iterate over shirts in this size, add the first one we can
      for (let j = 0; j < shirts.length; j++) {
        if (shirts[j].quantity > 0) {
          let result = box.tryAddShirt(shirts[j]);
          if (result) {
            shirts[j].quantity -= 1;
            break;
          }
        }
      }
      break;
    }
    // if we make it here, then we are out of shirts
    outOfShirts = true;
  }

  sizeShirtsDict.box.tryAddShirt();
}

function pickRandomShirt(size = null) {
  if (size == null) {
    size =
      Object.keys(sizeShirtsDict)[
        Math.floor(Math.random() * Object.keys(sizeShirtsDict).length)
      ];
  }

  shirts = sizeShirtsDict[size];
  Math.random() * shirts.length;
}

function getSumOfSize(key) {
  return sizeShirtsDict[key].reduce((x, t) => x.quantity + t, 0);
}
