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
const sizes = ["S", "M", "L", "XL", "2X", "3X", "4X", "5X"];

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

export default function Run(inventory, omitBoxes = false) {
  // transform shirts
  inventory.shirts.values.forEach((row) => {
    let description = row.splice(0, 1)[0];
    let price = row.splice(0, 1)[0];
    let i = 0;
    sizes.forEach((size) => {
      if (!sizeShirtsDict[size]) sizeShirtsDict[size] = [];
      sizeShirtsDict[size].push(
        new Product(
          description,
          !price ? 0 : parseNumberFromCurrency(price),
          row[i] == "#REF!" || !row[i] ? 0 : parseInt(row[i]), // stock
          size
        )
      );
      i++;
    });
  });

  // transform accessories
  accessories.length = 0;
  largeAccessories.length = 0;

  inventory.accessories.values.forEach((row) => {
    let description = row.splice(0, 1)[0];
    let price = row.splice(0, 1)[0];
    let isLargeOnly = row.splice(0, 1)[0].toLowerCase() == "true";
    let product = new Product(
      description,
      !price ? 0 : parseNumberFromCurrency(price),
      row[0] == "#REF!" || !row[0] ? 0 : parseInt(row[0]), // stock
      null,
      isLargeOnly
    );
    if (product.isSpecial) {
      largeAccessories.push(product);
    } else {
      accessories.push(product);
    }
  });

  smallBoxes.length = 0;
  largeBoxes.length = 0;
  failedBoxes.length = 0;

  let done = false;
  let count = 0;

  while (!done) {
    // every third box, make it a large
    let box = null;
    if (count++ % 3 === 0) {
      box = new Box(true);
    } else {
      box = new Box();
    }

    let outOfShirts =
      Object.values(sizeShirtsDict)
        .reduce((t, x) => t.concat(x), [])
        .reduce((t, x) => t + x.quantity, 0) <= 0;

    if (
      failedBoxes.length > 10000 ||
      (outOfShirts && accessories.reduce((t, x) => t + x.quantity, 0) <= 0,
      +largeAccessories.reduce((t, x) => t + x.quantity, 0) <= 0,
      0)
    ) {
      console.log(`out of products completely.
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

    if (!fillBox(box)) {
      //if (box.items.length === 0) {
      done = true;
      //}

      //   console.log(`there are still ${accessories.reduce(
      //     (t, x) => x.quantity + t,
      //     0
      //   )} accessories left at a value of ${accessories.reduce(
      //     (t, x) => x.price + t,
      //     0
      //   )}
      //   small boxes: ${smallBoxes.length}
      //   large boxes: ${largeBoxes.length}`);
      //done = true;
    }

    if (!box.isTargetReached()) {
      failedBoxes.push(box);
    } else {
      if (box.isLarge) largeBoxes.push(box);
      else smallBoxes.push(box);
    }
  }

  failedBoxes.forEach((failedBox) => {
    // unpack box
    failedBox.items.forEach((x) => {
      if (x.size != null) {
        let match = sizeShirtsDict[x.size].find(
          (y) => y.description == x.description
        );
        if (match) match.quantity++;
        else sizeShirtsDict[x.size].push(x);
      } else {
        if (x.isSpecial) {
          let match = largeAccessories.find(
            (y) => y.description == x.description
          );
          if (match) match.quantity++;
        } else {
          let match = accessories.find((y) => y.description == x.description);
          if (match) match.quantity++;
        }
      }
    });
  });

  let generateSummary = (boxes) => {
    let sum = {
      total: boxes.length,
      averageValue: (
        boxes.reduce((t, x) => t + x.getValue(), 0) / boxes.length
      ).toPrecision(3),
    };
    if (!omitBoxes) {
      sum.boxes = boxes;
    }
    return sum;
  };
  let leftOverShirts = {};
  Object.keys(sizeShirtsDict).forEach((size) => {
    leftOverShirts[size] = sizeShirtsDict[size].reduce(
      (t, x) => t + x.quantity,
      0
    );
  });

  return {
    largeBoxes: generateSummary(largeBoxes),
    smallBoxes: generateSummary(smallBoxes),
    // failedBoxes: generateSummary(failedBoxes),
    leftOverShirtsCount: Object.values(sizeShirtsDict)
      .reduce((t, x) => t.concat(x), [])
      .reduce((t, x) => t + x.quantity, 0),
    leftOverShirts: leftOverShirts,
    leftOverAccessories: accessories.reduce((t, x) => t + x.quantity, 0),
    mostLeftOverAccessories: accessories
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5),
    leftOverLargeAccessories: largeAccessories.reduce(
      (t, x) => t + x.quantity,
      0
    ),
    totalValue:
      smallBoxes.reduce((t, x) => t + x.getValue(), 0) +
      largeBoxes.reduce((t, x) => t + x.getValue(), 0),
    totalVariance:
      smallBoxes.reduce((t, x) => t + x.getValue() - x.target, 0) +
      largeBoxes.reduce((t, x) => t + x.getValue() - x.target, 0),
    score:
      100 -
      (
        ((smallBoxes.reduce((t, x) => t + x.getValue() - x.target, 0) +
          largeBoxes.reduce((t, x) => t + x.getValue() - x.target, 0)) /
          (smallBoxes.reduce((t, x) => t + x.getValue(), 0) +
            largeBoxes.reduce((t, x) => t + x.getValue(), 0))) *
        100
      ).toFixed(2),
  };
}

// exclusionList - array of products we already have - dont bother looking at dupes
function getPossibleItems(exclusionList, size, isLarge, boxxy) {
  let result = [];

  let possibleShirts = [];
  if (size === null)
    sizes.forEach((sz) => {
      sizeShirtsDict[sz].forEach((x) => possibleShirts.push(x));
    });
  // possibleShirts = Object.values(sizeShirtsDict).reduce(
  //   (t, x) => x.filter((x) => x.quantity > 0).concat(t),
  //   []
  // );
  else
    try {
      possibleShirts = sizeShirtsDict[size];
    } catch (ex) {
      console.error(ex);
      console.log(size);
    }

  if (exclusionList === null) {
    exclusionList = [];
  }

  // merge everything we can
  possibleShirts.filter((x) => x.quantity > 0).forEach((x) => result.push(x));
  accessories.filter((x) => x.quantity > 0).forEach((x) => result.push(x));
  if (isLarge) {
    largeAccessories
      .filter((x) => x.quantity > 0)
      .forEach((x) => result.push(x));
  }

  //then filter concatenation by excluding products whose description is the same as one in the exclusionList
  //   result = result.filter(
  //     (p) =>
  //       !exclusionList
  //         .map((m) => m.description)
  //         //.some((s) => p.description.split(" ")[0].includes(s.description))
  //         .some((s) => {
  //           p.description == s.description;
  //         })
  //   );
  removeIf(result, (x) =>
    exclusionList
      .map((m) => m.description)
      .some(
        (exludedDescription) =>
          normalizeDescription(x.description) ==
          normalizeDescription(exludedDescription)
      )
  );

  return result.sort((a, b) => a.price - b.price || a.quantity - b.quantity);
}

function getLeastValuableAboveThreshold(
  threshold,
  sortedItems,
  selector = (x) => x
) {
  for (let i = 0; i < sortedItems.length; i++) {
    let item = sortedItems[i];

    if (selector(item) >= threshold) return item;
  }
  return null;
}

function fillBox(box) {
  let i = 0;
  while (!box.isTargetReached()) {
    // add first thing that fills up the remaining gap, starting with cheapest
    // this should keep things nice and evenly distributed
    let possibleItems = getPossibleItems(
      box.items.slice(),
      box.size,
      box.isLarge,
      box
    );

    let item =
      getLeastValuableAboveThreshold(
        // our gap is our remaining
        box.getRemainingValue(),
        // ascending order
        possibleItems,
        // select price
        (x) => x.price
        // fallback to largest thing possible
      ) ?? possibleItems[[possibleItems.length - 1]];

    if (!item) {
      //console.warn("possibly ran out of products to use - " + box);
      return false;
    }

    // Add it
    // is this a shirt?
    if (item.size !== null) {
      let copy = JSON.parse(JSON.stringify(item));
      copy.quantity = 1;
      if (box.tryAddShirt(copy)) {
        item.quantity -= 1;
        continue;
      } else {
        console.log(
          `failed to add another ${box.size} shirt. only dupes left?
            box: ${box}
            shirt: ${item}
            possibleItems: ${possibleItems}`
        );
        break;
      }
    } else {
      let copy = JSON.parse(JSON.stringify(item));
      copy.quantity = 1;
      box.items.push(item);
      item.quantity -= 1;
    }

    // if (i++ > 5) {
    //   console.warn("looped with no success 5 times");
    //   return false;
    //   break;
    // }
  }

  return true;
}

function generateMockData() {
  sizes.forEach((size) => {
    sizeShirtsDict[size] = shirtNames
      .map(
        (name) =>
          new Product(
            name,
            Math.random() > 0.5 ? 24 : 34,
            Math.floor(Math.random() * 100), // stock
            size,
            false
          )
      )
      .sort((a, b) => b.quantity - a.quantity);
  });

  accessoryNames.forEach((name) => {
    accessories.push(
      new Product(
        name,
        Math.random() * 50 + 5,
        Math.floor(Math.random() * 200), // stock
        null,
        false
      )
    );
  });

  specialAccessoryNames.forEach((name) => {
    largeAccessories.push(
      new Product(
        name,
        Math.random() * 20 + 90,
        Math.floor(Math.random() * 10), // stock
        null,
        true
      )
    );
  });
}

function parseNumberFromCurrency(text) {
  return parseFloat(text.replace(/[^\d\.]/, ""));
}

function removeIf(arr, callback) {
  var i = arr.length;
  while (i--) {
    if (callback(arr[i], i)) {
      arr.splice(i, 1);
    }
  }
}

function normalizeDescription(desc) {
  return desc.split("(")[0]?.split("-")[0]?.trim() ?? "";
}
