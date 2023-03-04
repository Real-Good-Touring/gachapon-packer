import {
  shirtNames,
  accessoryNames,
  specialAccessoryNames,
} from "./utils/mock";
import { PackResults, PackSummary, Box, Product, Size } from "./utils/types";

const sizes = ["S", "M", "L", "XL", "2X", "3X", "4X", "5X", "N/A"];

const smallBoxMax = 0;
const largeBoxMax = 1500;
const smallToLargeRatio = 2; // we want ~1000 small and large 500 boxes
const smallBoxes: Box[] = [];
const largeBoxes: Box[] = [];
const failedBoxes: Box[] = [];

const smallBoxesDict = {
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  "2X": 0,
  "3X": 0,
  "4X": 0,
  "5X": 0,
  "N/A": 0,
} satisfies Record<Size, number>;
const largeBoxesDict = {
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  "2X": 0,
  "3X": 0,
  "4X": 0,
  "5X": 0,
  "N/A": 0,
} satisfies Record<Size, number>;
const leftOverShirts = {
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  "2X": 0,
  "3X": 0,
  "4X": 0,
  "5X": 0,
  "N/A": 0,
} satisfies Record<Size, number>;

const sizeShirtsDict: Record<Size, Product[]> = {
  S: [],
  M: [],
  L: [],
  XL: [],
  "2X": [],
  "3X": [],
  "4X": [],
  "5X": [],
  "N/A": [],
};
const accessories: Product[] = [];
const largeAccessories: Product[] = [];

// shirtNames.forEach(name => {
//   shirtStockDict[name] = Object.assign({},
//     ...sizes.map(size => ({ [size]: parseInt(Math.random() * 200) })
//   ))
// });

export default function Run(inventory: any): PackResults {
  // transform shirts
  // inventory.shirts.values.forEach((row) => {
  //   let description = row.splice(0, 1)[0];
  //   let price = row.splice(0, 1)[0];
  //   let i = 0;
  //   sizes.forEach((size) => {
  //     if (!sizeShirtsDict[size]) sizeShirtsDict[size] = [];
  //     sizeShirtsDict[size].push(
  //       new Product(
  //         description,
  //         !price ? 0 : parseNumberFromCurrency(price),
  //         row[i] == "#REF!" || !row[i] ? 0 : parseInt(row[i]), // stock
  //         size
  //       )
  //     );
  //     i++;
  //   });
  // });

  // transform accessories
  accessories.length = 0;
  largeAccessories.length = 0;

  // inventory.accessories.values.forEach((row) => {
  //   let description = row.splice(0, 1)[0];
  //   let price = row.splice(0, 1)[0];
  //   let isLargeOnly = row.splice(0, 1)[0].toLowerCase() == "true";
  //   let product = new Product(
  //     description,
  //     !price ? 0 : parseNumberFromCurrency(price),
  //     row[0] == "#REF!" || !row[0] ? 0 : parseInt(row[0]), // stock
  //     null,
  //     isLargeOnly
  //   );
  //   if (product.isSpecial) {
  //     largeAccessories.push(product);
  //   } else {
  //     accessories.push(product);
  //   }
  // });

  generateMockData();

  smallBoxes.length = 0;
  largeBoxes.length = 0;
  failedBoxes.length = 0;

  let done = false;
  let count = 0;

  while (!done) {
    // every third box, make it a large
    // let box = null;
    // if (count++ % 3 === 0 && largeBoxes.length < largeBoxMax) {
    //   box = new Box(true);
    // } else if (smallBoxes.length < smallBoxMax) {
    //   box = new Box();
    // } else {
    //   console.log("max boxes reached");
    //   done = true;
    //   break;
    // }

    let box = new Box(true);

    let outOfShirts =
      Object.values(sizeShirtsDict)
        .reduce((t, x) => t.concat(x), [] as Product[])
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
      if (box.isLarge) {
        largeBoxes.push(box);
        largeBoxesDict[box.size]++;
      } else {
        smallBoxes.push(box);
        smallBoxesDict[box.size]++;
      }
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

  Object.keys(sizeShirtsDict).forEach((size) => {
    leftOverShirts[size as Size] = sizeShirtsDict[size as Size].reduce(
      (t, x: Product) => t + x.quantity,
      0
    );
  });

  return {
    largeBoxes: generateSummary(largeBoxes),
    largeBoxesDict: largeBoxesDict,
    smallBoxes: generateSummary(smallBoxes),
    smallBoxesDict: smallBoxesDict,

    leftOverShirtsCount: Object.values(sizeShirtsDict)
      .reduce((t, x) => t.concat(x), [] as Product[])
      .reduce((t, x) => t + x.quantity, 0),
    leftOverShirts: leftOverShirts,
    leftOverAccessories: accessories.reduce((t, x) => t + x.quantity, 0),

    leftOverSpecialAccessories: largeAccessories.reduce(
      (t, x) => t + x.quantity,
      0
    ),
    totalValue:
      smallBoxes.reduce((t, x) => t + x.getValue(), 0) +
      largeBoxes.reduce((t, x) => t + x.getValue(), 0),
    totalVariance:
      smallBoxes.reduce((t, x) => t + x.getValue() - x.target, 0) +
      largeBoxes.reduce((t, x) => t + x.getValue() - x.target, 0),
  };
}

function generateSummary(boxes: Box[]): PackSummary {
  let sum = {
    total: boxes.length,
    averageValue: (
      boxes.reduce((t, x) => t + x.getValue(), 0) / boxes.length
    ).toPrecision(3),
    boxes: boxes,
  };

  return sum;
}

function getPossibleItems(box: Box, ignoreShirtMin = false): Product[] {
  let result: Product[] = [];

  // exclusionList - array of products we already have - dont bother looking at dupes
  const exclusionList = box.items ?? [];
  const numShirts = box.items
    .filter((x) => x.size != null)
    .reduce((t, x) => t + x.quantity, 0);

  let possibleShirts: Product[] = [];
  if (box.size === null || box.size === "N/A")
    sizes.forEach((sz) => {
      sizeShirtsDict[sz as Size].forEach((x) => possibleShirts.push(x));
    });
  else possibleShirts = sizeShirtsDict[box.size];

  // merge everything we can
  possibleShirts.filter((x) => x.quantity > 0).forEach((x) => result.push(x));

  // we need at least 2 shirts
  if (numShirts >= 2 || ignoreShirtMin) {
    accessories.filter((x) => x.quantity > 0).forEach((x) => result.push(x));
    if (box.isLarge) {
      largeAccessories
        .filter((x) => x.quantity > 0)
        .forEach((x) => result.push(x));
    }
  }

  // remove dupes
  removeIf(result, (x: Product) =>
    exclusionList
      .map((m) => m.description)
      .some(
        (exludedDescription) =>
          normalizeDescription(x.description) ==
          normalizeDescription(exludedDescription)
      )
  );

  // return sorted by price ascending
  return result.sort((a, b) => a.price - b.price || a.quantity - b.quantity);
}

function getLeastValuableAboveThreshold(
  threshold: number,
  sortedItems: Product[],
  selector = (x: any) => x
) {
  for (let i = 0; i < sortedItems.length; i++) {
    let item = sortedItems[i];

    if (selector(item) >= threshold) return item;
  }
  return null;
}

function fillBox(box: Box) {
  let i = 0;
  while (!box.isTargetReached()) {
    i++;
    // add first thing that fills up the remaining gap, starting with cheapest
    // this should keep things nice and evenly distributed
    let possibleItems = getPossibleItems(box, i > 3);

    let item =
      getLeastValuableAboveThreshold(
        // our gap is our remaining
        box.getRemainingValue(),
        // ascending order
        possibleItems,
        // select price
        (x) => x.price
        // fallback to largest thing possible if we can't meet the threshold
      ) ?? possibleItems[possibleItems.length - 1];

    if (!item) {
      console.warn("possibly ran out of products to use - " + box);
      return false;
    }

    // Add it
    let copy = JSON.parse(JSON.stringify(item));
    copy.quantity = 1;
    // is this a shirt?
    if (item.category == "Shirt") {
      if (box.tryAddShirt(copy)) {
        item.quantity -= 1;
        continue;
      } else {
        // console.log(
        //   `failed to add another ${box.size} shirt. only dupes left?
        //     box: ${box}
        //     shirt: ${item}`
        //   // possibleItems: ${possibleItems}
        // );
        break;
      }
    } else {
      box.items.push(item);
      item.quantity -= 1;
    }
  }

  if (i >= 10) {
    console.warn("box filling took too long - " + box);
    return false;
  }

  return true;
}

function generateMockData() {
  sizes.forEach((size) => {
    sizeShirtsDict[size as Size] = shirtNames
      .map(
        (name) =>
          new Product(
            name,
            Math.random() > 0.5 ? 24 : 34,
            Math.floor(Math.random() * 4), // stockMath.
            size as Size,
            false,
            "Shirt"
          )
      )
      .sort((a, b) => b.quantity - a.quantity);
  });

  accessoryNames.forEach((name) => {
    accessories.push(
      new Product(
        name,
        Math.random() * 50 + 5,
        Math.floor(Math.random() * 20), // stock
        "N/A",
        false,
        "Accessory"
      )
    );
  });

  specialAccessoryNames.forEach((name) => {
    largeAccessories.push(
      new Product(
        name,
        Math.random() * 20 + 90,
        Math.floor(Math.random() * 10), // stock
        "N/A",
        true,
        "Special Accessory"
      )
    );
  });
}

function parseNumberFromCurrency(text: string) {
  return parseFloat(text.replace(/[^\d\.]/, ""));
}

function removeIf(arr: any[], callback: (x: any, i: number) => boolean) {
  var i = arr.length;
  while (i--) {
    if (callback(arr[i], i)) {
      arr.splice(i, 1);
    }
  }
}

function normalizeDescription(desc: string) {
  return desc.split("(")[0]?.split("-")[0]?.trim() ?? "";
}
