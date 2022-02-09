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
const specialAccessoryNames = [
  "BODY PILLOW - ARIN",
  "BODY PILLOW ARINA",
  "BODY PILLOW - FURRY ARIN",
  "BODY PILLOW - DAN",
  "BODY PILLOW DANIELLA",
  "BODY PILLOW - FURRY DAN",
];
const sizes = ["xs", "s", "m", "l", "xl", "x2", "x3", "x4", "x5"];

const smallToLargeRatio = 2; // we want ~1000 small and large 500 boxes
const smallBoxes = [];
const largeBoxes = [];
const failedBoxes = [];

const sizeShirtsDict = {};
const accessories = [];
const largeAccessories = [];

// shirtNames.forEach(name => {
//   shirtStockDict[name] = Object.assign({},
//     ...sizes.map(size => ({ [size]: parseInt(Math.random() * 200) })
//   ))
// });

export default function Run() {
  sizes.forEach((size) => {
    sizeShirtsDict[size] = shirtNames
      .map(
        (name) =>
          new Product(
            name,
            Math.random() > 0.5 ? 24 : 34,
            Math.floor(Math.random() * 5),
            size,
            false
          )
      )
      .sort((a, b) => b.quantity - a.quantity);
  });

  accessoryNames.forEach((name) => {
    let i = 0;
    while (i < Math.floor(Math.random() * 200)) {
      i++;
      accessories.push(
        new Product(
          name,
          Math.random() * 50 + 5,
          1,
          Math.random > 0.2 ? true : false
        )
      );
    }
  });

  specialAccessoryNames.forEach((name) => {
    let i = 0;
    while (i < Math.floor(Math.random() * 3)) {
      i++;
      largeAccessories.push(
        new Product(
          name,
          Math.random() * 20 + 90,
          1,
          Math.random > 0.2 ? true : false
        )
      );
    }
  });

  let done = false;
  let outOfShirts = false;
  let count = 0;

  while (!done && accessories.length > 0) {
    // every third box, make it a large
    let box = null;
    if (count++ % 3 === 0) {
      box = new Box(true);
    } else {
      box = new Box();
    }

    let sizeKeys = Object.keys(sizeShirtsDict);

    if (outOfShirts) {
      console.log(`out of shirts.
    there are still ${accessories.reduce(
      (t, x) => x.quantity + t,
      0
    )} accessories left at a value of ${accessories.reduce(
        (t, x) => x.price + t,
        0
      )}
      small boxes: ${smallBoxes.length}
      large boxes: ${largeBoxes.length}`);

      done = true;
    }

    for (let i = 0; i < sizeKeys.length; i++) {
      // check if there's still stock left for this size
      if (getSumOfSize(sizeKeys[i]) > 0) {
        let shirts = sizeShirtsDict[sizeKeys[i]];
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
      if (i == sizeKeys.length - 1) {
        // if we make it here, then we are out of shirts
        outOfShirts = true;
      }
    }

    fillBox(box);

    if (!box.isTargetReached()) {
      failedBoxes.push(box);
    } else {
      if (box.isLarge) largeBoxes.push(box);
      else smallBoxes.push(box);
    }

    console.log(box.toString());
  }

  let generateSummary = (boxes) => {
    return {
      total: boxes.length,
      averageValue: (
        boxes.reduce((t, x) => t + x.getValue(), 0) / boxes.length
      ).toPrecision(3),
      result: boxes,
    };
  };

  return {
    largeBoxes: generateSummary(largeBoxes),
    smallBoxes: generateSummary(smallBoxes),
    failedBoxes: generateSummary(failedBoxes),
  };
}

function fillBox(box) {
  let i = 0;
  while (!box.isTargetReached()) {
    // try to add a special accessory
    if (
      box.isLarge &&
      largeAccessories.length > 0 &&
      box.items.filter((x) => x.isSpecial).length == 0
    ) {
      box.items.push(largeAccessories.shift());
      continue;
    }

    if (Math.random() > 0.6 || accessories.length === 0) {
      let shirt = pickRandomShirt(box.size);
      if (box.tryAddShirt(shirt)) {
        shirt.quantity -= 1;
        continue;
      } else {
        console.log(
          `failed to add another ${box.size} shirt. filling with accessories...`
        );
      }
    }

    if (accessories.length > 0) box.items.push(accessories.shift());
    else {
      console.warn("ran out of accessories");
      break;
    }

    if (i++ > 15) {
      console.warn("possibly ran out of accessories");
      break;
    }
  }
}

function pickRandomShirt(size = null) {
  if (size == null) {
    size =
      Object.keys(sizeShirtsDict)[
        Math.floor(Math.random() * Object.keys(sizeShirtsDict).length)
      ];
  }

  let shirts = sizeShirtsDict[size].filter((x) => x.quantity > 0);
  if (shirts.length === 0) return null;

  let index = Math.floor(Math.random() * shirts.length);
  return shirts[index];
}

function getSumOfSize(size) {
  return sizeShirtsDict[size].reduce((t, x) => {
    return x.quantity + t;
  }, 0);
}
