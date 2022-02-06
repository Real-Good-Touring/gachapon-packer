var starterValue, totalPins, totalSets, remainers, findIt, c;
Array.prototype.contains = function (needle) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
};
// Rarity contains static information about each rarity
// Multiplier is the number of each pins in relation to ultra rares
// Characters contains a list of characters within each rarity
var rarity;
var items = {
  accessories: {
    name: "Accessories",
    items: [
      "Are We Insured|$10|293",
      "Beanies|$20|401",
      "Bottle Opener|$15|364",
      "Facemasks|$10|500",
      "The Guys Hat|$25|220",
      "Ghoul Magnets|$10|78",
      "Hedgehog Pins|$20|1546",
      "Orange Pom Beanie|$10|430",
      "Pocket Pin - Pink (Bad)|$20|450",
      "Tennis Sweatbands|$10|750",
      "Valentines Pins|$10|38",
      "Villager Sticker|$10|35",
    ],
  },
};
var backupitems = {
  accessories: {
    name: "Non GG",
    items: [],
  },
};
var largeboxesitems = {
  accessories: {
    name: "Large Box Only Accessories",
    items: [
      "BODY PILLOW ARINA|$50|45",
      "BODY PILLOW DANIELLA|$50|12",
      "Bottles (BLUE)|$20|94",
      "Bottles (ORANGE)|$20|36",
      "Magnet Poetry|$20|12",
      "Puzzle|$20|201",
    ],
  },
};

var tshirts = {
  stshirts: {
    name: "S Tshirts",
    items: [
      "ANTI CECIL|$24|24",
      "ARIN HALLOWEEN|$24|2",
      "BEAT EM UP|$28|48",
      "BLK 10MPH|$35|166",
      "CARBUNCLE|$28|46",
      "GHAC TEE (GREEN)|$28|65",
      "GREY 10MPH|$35|56",
      "GHOUL GRUMPS|$24|104",
      "KENTO TEE|$22|230",
      "KENTO TANK|$22|72",
      "MANGA 1|$30|7",
      "MANGA 3|$30|35",
      "MR BIZ|$34|24",
      "PRO CECIL|$24|0",
      "SCHOOL (PINK)|$24|5",
      "SHUFFLEMASTER|$28|50",
      "SJG BLK|$22|107",
      "SJG GLITCH|$34|0",
      "STARCHEER|$24|20",
      "TENNIS (TANK)|$22|122",

      "VALENTINES DAY|$30|137",
      "VALENTINES PANT|$40|8",
      "VILLAGER|$32|50",
      "WINDBREAKER|$60|1",
      "YASHO|$24|145",
      "ZELDA|$24|112",
    ],
  },
  mtshirts: {
    name: "M Tshirts",
    items: [
      "ANTI CECIL|$24|0",
      "ARIN HALLOWEEN|$24|0",
      "BEAT EM UP|$28|0",
      "BLK 10MPH|$35|75",
      "CARBUNCLE|$28|16",
      "GHAC TEE (GREEN)|$28|0",
      "GREY 10MPH|$35|0",
      "GHOUL GRUMPS|$24|0",
      "KENTO TEE|$22|0",
      "KENTO TANK|$22|0",
      "MANGA 1|$30|7",
      "MANGA 3|$30|3",
      "MR BIZ|$34|10",
      "PRO CECIL|$24|0",
      "SCHOOL (PINK)|$24|2",
      "SHUFFLEMASTER|$28|0",
      "SJG BLK|$22|0",
      "SJG GLITCH|$34|0",
      "STARCHEER|$24|0",
      "TENNIS (TANK)|$22|140",

      "VALENTINES DAY|$30|58",
      "VALENTINES PANT|$40|2",
      "VILLAGER|$32|0",
      "WINDBREAKER|$60|8",
      "YASHO|$24|130",
      "ZELDA|$24|1",
    ],
  },
  ltshirts: {
    name: "L Tshirts",
    items: [
      "ANTI CECIL|$24|0",
      "ARIN HALLOWEEN|$24|0",
      "BEAT EM UP|$28|0",
      "BLK 10MPH|$35|142",
      "CARBUNCLE|$28|0",
      "GHAC TEE (GREEN)|$28|0",
      "GREY 10MPH|$35|0",
      "GHOUL GRUMPS|$24|0",
      "KENTO TEE|$22|0",
      "KENTO TANK|$22|0",
      "MANGA 1|$30|28",
      "MANGA 3|$30|14",
      "MR BIZ|$34|0",
      "PRO CECIL|$24|0",
      "SCHOOL (PINK)|$24|12",
      "SHUFFLEMASTER|$28|0",
      "SJG BLK|$22|0",
      "SJG GLITCH|$34|0",
      "STARCHEER|$24|0",
      "TENNIS (TANK)|$22|172",

      "VALENTINES DAY|$30|26",
      "VALENTINES PANT|$40|12",
      "VILLAGER|$32|0",
      "WINDBREAKER|$60|10",
      "YASHO|$24|134",
      "ZELDA|$24|10",
    ],
  },
  xltshirts: {
    name: "1XL Tshirts",
    items: [
      "ANTI CECIL|$24|5",
      "ARIN HALLOWEEN|$24|0",
      "BEAT EM UP|$28|21",
      "BLK 10MPH|$35|105",
      "CARBUNCLE|$28|18",
      "GHAC TEE (GREEN)|$28|36",
      "GREY 10MPH|$35|0",
      "GHOUL GRUMPS|$24|89",
      "KENTO TEE|$22|2",
      "KENTO TANK|$22|0",
      "MANGA 1|$30|37",
      "MANGA 3|$30|25",
      "MR BIZ|$34|25",
      "PRO CECIL|$24|7",
      "SCHOOL (PINK)|$24|18",
      "SHUFFLEMASTER|$28|0",
      "SJG BLK|$22|85",
      "SJG GLITCH|$34|0",
      "STARCHEER|$24|0",
      "TENNIS (TANK)|$22|157",

      "VALENTINES DAY|$30|94",
      "VALENTINES PANT|$40|0",
      "VILLAGER|$32|6",
      "WINDBREAKER|$60|6",
      "YASHO|$24|157",
      "ZELDA|$24|28",
    ],
  },
  xxltshirts: {
    name: "2XL Tshirts",
    items: [
      "ANTI CECIL|$24|2",
      "ARIN HALLOWEEN|$24|0",
      "BEAT EM UP|$28|5",
      "BLK 10MPH|$35|107",
      "CARBUNCLE|$28|34",
      "GHAC TEE (GREEN)|$28|43",
      "GREY 10MPH|$35|21",
      "GHOUL GRUMPS|$24|60",
      "KENTO TEE|$22|0",
      "KENTO TANK|$22|0",
      "MANGA 1|$30|54",
      "MANGA 3|$30|14",
      "MR BIZ|$34|109",
      "PRO CECIL|$24|1",
      "SCHOOL (PINK)|$24|59",
      "SHUFFLEMASTER|$28|0",
      "SJG BLK|$22|54",
      "SJG GLITCH|$34|60",
      "STARCHEER|$24|0",
      "TENNIS (TANK)|$22|126",

      "VALENTINES DAY|$30|100",
      "VALENTINES PANT|$40|3",
      "VILLAGER|$32|7",
      "WINDBREAKER|$60|10",
      "YASHO|$24|85",
      "ZELDA|$24|22",
    ],
  },
  xxxltshirts: {
    name: "3XL Tshirts",
    items: [
      "ANTI CECIL|$24|2",
      "ARIN HALLOWEEN|$24|16",
      "BEAT EM UP|$28|0",
      "BLK 10MPH|$35|0",
      "CARBUNCLE|$28|36",
      "GHAC TEE (GREEN)|$28|1",
      "GREY 10MPH|$35|0",
      "GHOUL GRUMPS|$24|84",
      "KENTO TEE|$22|0",
      "KENTO TANK|$22|0",
      "MANGA 1|$30|34",
      "MANGA 3|$30|7",
      "MR BIZ|$34|0",
      "PRO CECIL|$24|0",
      "SCHOOL (PINK)|$24|5",
      "SHUFFLEMASTER|$28|0",
      "SJG BLK|$22|16",
      "SJG GLITCH|$34|0",
      "STARCHEER|$24|0",
      "TENNIS (TANK)|$22|0",

      "VALENTINES DAY|$30|16",
      "VALENTINES PANT|$40|5",
      "VILLAGER|$32|1",
      "WINDBREAKER|$60|8",
      "YASHO|$24|56",
      "ZELDA|$24|20",
    ],
  },
  xxxxltshirts: {
    name: "4XL Tshirts",
    items: [
      "ANTI CECIL|$24|0",
      "ARIN HALLOWEEN|$24|0",
      "BEAT EM UP|$28|0",
      "BLK 10MPH|$35|0",
      "CARBUNCLE|$28|0",
      "GHAC TEE (GREEN)|$28|23",
      "GREY 10MPH|$35|0",
      "GHOUL GRUMPS|$24|0",
      "KENTO TEE|$22|0",
      "KENTO TANK|$22|0",
      "MANGA 1|$30|0",
      "MANGA 3|$30|0",
      "MR BIZ|$34|0",
      "PRO CECIL|$24|0",
      "SCHOOL (PINK)|$24|14",
      "SHUFFLEMASTER|$28|0",
      "SJG BLK|$22|0",
      "SJG GLITCH|$34|0",
      "STARCHEER|$24|0",
      "TENNIS (TANK)|$22|0",

      "VALENTINES DAY|$30|0",
      "VALENTINES PANT|$40|12",
      "VILLAGER|$32|0",
      "WINDBREAKER|$60|0",
      "YASHO|$24|39",
      "ZELDA|$24|37",
    ],
  },
  xxxxxltshirts: {
    name: "5XL Tshirts",
    items: [
      "ANTI CECIL|$24|1",
      "ARIN HALLOWEEN|$24|0",
      "BEAT EM UP|$28|0",
      "BLK 10MPH|$35|0",
      "CARBUNCLE|$28|0",
      "GHAC TEE (GREEN)|$28|0",
      "GREY 10MPH|$35|0",
      "GHOUL GRUMPS|$24|0",
      "KENTO TEE|$22|0",
      "KENTO TANK|$22|0",
      "MANGA 1|$30|0",
      "MANGA 3|$30|0",
      "MR BIZ|$34|0",
      "PRO CECIL|$24|0",
      "SCHOOL (PINK)|$24|13",
      "SHUFFLEMASTER|$28|0",
      "SJG BLK|$22|0",
      "SJG GLITCH|$34|0",
      "STARCHEER|$24|0",
      "TENNIS (TANK)|$22|0",

      "VALENTINES DAY|$30|0",
      "VALENTINES PANT|$40|14",
      "VILLAGER|$32|0",
      "WINDBREAKER|$60|0",
      "YASHO|$24|47",
      "ZELDA|$24|40",
    ],
  },
};
var fallbacktshirtsvals = {
  stshirts: {
    name: "S Tshirts",
    items: [],
  },
  mtshirts: {
    name: "M Tshirts",
    items: [],
  },
  ltshirts: {
    name: "L Tshirts",
    items: [],
  },
  xltshirts: {
    name: "1XL Tshirts",
    items: [],
  },
  xxltshirts: {
    name: "2XL Tshirts",
    items: [],
  },
  xxxltshirts: {
    name: "3XL Tshirts",
    items: [],
  },
  xxxxltshirts: {
    name: "4XL Tshirts",
    items: [],
  },
  xxxxxltshirts: {
    name: "5XL Tshirts",
    items: [],
  },
};
var largeboxesTshirtsvals = {
  stshirts: {
    name: "S Tshirts",
    items: ["TENNIS JOGGER|$60|47"],
  },
  mtshirts: {
    name: "M Tshirts",
    items: ["TENNIS JOGGER|$60|4"],
  },
  ltshirts: {
    name: "L Tshirts",
    items: ["TENNIS JOGGER|$60|19"],
  },
  xltshirts: {
    name: "1XL Tshirts",
    items: ["TENNIS JOGGER|$60|56"],
  },
  xxltshirts: {
    name: "2XL Tshirts",
    items: ["TENNIS JOGGER|$60|58"],
  },
  xxxltshirts: {
    name: "3XL Tshirts",
    items: ["TENNIS JOGGER|$60|53"],
  },
  xxxxltshirts: {
    name: "4XL Tshirts",
    items: ["TENNIS JOGGER|$60|35"],
  },
  xxxxxltshirts: {
    name: "5XL Tshirts",
    items: ["TENNIS JOGGER|$60|49"],
  },
};
// Character Pool contains values for the current generated pool
var characterPool = {
  ultrarare: {
    subtotal: 0,
    characters: [],
  },
  rare: {
    subtotal: 0,
    characters: [],
  },
  uncommon: {
    subtotal: 0,
    characters: [],
  },
  common: {
    subtotal: 0,
    characters: [],
  },
};
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
$.inArrayRegEx = function (regex, array) {
  for (var i = 0; i < array.length; i++) {
    if (regex.test(array[i])) {
      return i;
    }
  }
  return -1;
};
function createPacks() {
  // Reset characters
  $("#packs tbody").html("");
  var packsArray = [];
  // Reset characters
  var roundChar = [];
  // Get all characters for round 3 ... basically not commons
  roundChar.push(characterPool.ultrarare.characters[0]);
  roundChar.push(characterPool.rare.characters[0]);
  roundChar.push(characterPool.uncommon.characters[0]);
  roundChar = $.map(roundChar, function (n) {
    return n;
  });
  var toggle = false;
  var pinIndex, pin;
  // Round
  var i = 0;
  for (i = 0; i < totalSets; ++i) {
    // Get random number from possible pins
    pinIndex = Math.floor(Math.random() * roundChar.length);
    pin = roundChar[pinIndex];
    // Remove that item from array
    roundChar.splice(pinIndex, 1);
    // Create a row
    var packArray = ["", pin];
    // Push that row
    packsArray.push(packArray);
  }
  roundChar.push(characterPool.common.characters[0]);
  roundChar = $.map(roundChar, function (n) {
    return n;
  });
  i = 0;
  for (i = 0; i < totalSets; ++i) {
    pin = packsArray[i][1];
    while (pin === packsArray[i][1]) {
      pinIndex = Math.floor(Math.random() * roundChar.length);
      pin = roundChar[pinIndex];
    }
    roundChar.splice(pinIndex, 1);
    if (!packsArray[i][1]) {
      alert(
        "We have ran out of non-common pins. This means that there are " +
          (totalSets - i) +
          " sets can not be completed."
      );
      i = totalSets;
    }
    // Instead of making a new row, we update it
    packsArray[i][0] = pin;
    var pin1 = packsArray[i][0].split("%");
    var pin2 = packsArray[i][1].split("%");
    var pin1Image =
      pin1[0].replace(/\s/g, "") +
      "-" +
      pin1[1].replace(/\s/g, "") +
      "-" +
      pin1[2] +
      ".png";
    var pin2Image =
      pin2[0].replace(/\s/g, "") +
      "-" +
      pin2[1].replace(/\s/g, "") +
      "-" +
      pin2[2] +
      ".png";
    var size = "100%";
    $("#packs tbody").append(
      "<tr><td>" +
        (i + 1) +
        "</td><td class='class-" +
        pin1[0].replace(/\s/g, "").toLowerCase() +
        "'><img title='" +
        pin1[2] +
        " " +
        pin1[1] +
        " (" +
        pin1[0] +
        ")' src='img/" +
        pin1Image.toLowerCase() +
        "' width='" +
        size +
        "' ></td><td class='class-" +
        pin2[0].replace(/\s/g, "").toLowerCase() +
        "'><img title='" +
        pin2[2] +
        " " +
        pin2[1] +
        " (" +
        pin2[0] +
        ")' src='img/" +
        pin2Image.toLowerCase() +
        "' width='" +
        size +
        "' ></td>"
    );
    $("#csvExport").append(
      '<tr><td></td><td>= IMAGE("https://raw.liamforsyth.co.uk/ggimages/' +
        pin1Image.toLowerCase() +
        '",4,200,200)</td><td>= IMAGE("https://raw.liamforsyth.co.uk/ggimages/' +
        pin2Image.toLowerCase() +
        '",4,200,200)</td>'
    );
  }
  var remainingultra = $.inArrayRegEx(/Ultra Rare/i, roundChar);
  if (remainingultra >= 0) {
    alert(remainingultra);
  }
  $("#CSV").show();
}
function divideCharacters() {
  $("#character-pool tbody").html("");
  $.each(rarity, function (index, value) {
    var rarityName = eval("rarity." + index + ".name");
    eval("characterPool." + index + ".characters = []");
    var rarityTotal = eval("characterPool." + index + ".subtotal");
    // Get character names and then shuffle order, sort of an extra so no one character is more used than others
    var characters = eval("rarity." + index + ".characters");
    var charTimes = rarityTotal / characters.length;
    // Cycle through characters
    var i;
    var characterArray = [];
    for (i = 0; i < characters.length; ++i) {
      var e;
      characterName = characters[i];
      for (e = 0; e < charTimes; ++e) {
        characterArray.push(rarityName + "%" + characterName);
      }
      var starterClass = "";
      if (starterName + "%" + starterNum == characterName.replace(" ", "_")) {
        starterClass = "starter";
      }
      $("#character-pool tbody").append(
        "<tr class='" +
          starterClass +
          " " +
          index +
          "'><td>" +
          characterName.split("%")[1] +
          ": " +
          characterName.split("%")[0] +
          " x " +
          charTimes +
          "</td><td>" +
          rarityName +
          "</td>"
      );
    }
    eval("characterPool." + index + ".characters").push(characterArray);
  });
  $("#generatePacks").show();
  $("#packs tbody").html("");
  var packsArray = [];
}
function updateTable() {
  // Reset totals
  totalPins = 0;
  totalSets = 0;
  remainers = 0;
  // Hide remainers row to start
  $("tr.remainers").hide();
  // Base Multiplier is the mutliplier of the select rarirty
  var baseMultiplier = eval("rarity." + starterType + ".multiplier");
  // Base Value is the value entered divided by it's multiplier
  // This is used later to work out values of all rarities
  var baseValue = starterValue / baseMultiplier;
  $.each(rarity, function (index, value) {
    // Get each raritiy's multiplier
    var multiplier = eval("rarity." + index + ".multiplier");
    var amounts = eval("rarity." + index + ".characters.length");
    // Work out subtotals
    // Where fractions of pins are created we round down
    var subtotal = Math.floor(amounts * multiplier * baseValue);
    eval("characterPool." + index + ".subtotal = " + subtotal);
    // Add to total
    totalPins += subtotal;
    // Update table entries
    $("tr." + index)
      .find("td.value")
      .text(subtotal);
  });
  // Update table total
  $("tr.total").find("td.value").text(totalPins);
  // Possible sets are based on the total divided by 3 and rounded down
  totalSets = Math.floor(totalPins / 2);
  $("tr.sets").find("td.value").text(totalSets);
  // Work out any remainers you would have
  remainers = totalPins - totalSets * 2;
  if (remainers > 0) {
    $("tr.remainers").show().find("td.value").text(remainers);
  }
  divideCharacters();
}
Object.objsize = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
Object.defineProperties(Array.prototype, {
  count: {
    value: function (query) {
      /* 
         Counts number of occurrences of query in array, an integer >= 0 
         Uses the javascript == notion of equality.
      */
      var count = 0;
      for (let i = 0; i < this.length; i++) if (this[i] == query) count++;
      return count;
    },
  },
});
var results = [];
var current = "";
$(".presets button").click(function (e) {
  var el = $(this);

  e.preventDefault();
  var id = $(this).parent().find("input").attr("id");
  current = id;
  var value = $(this).parent().find("input").val();
  $(this).parent().find("input").prop("disabled", true);
  if (results[id]) {
    $("#boxes tbody").html(results[id]);
  } else {
    $(".presets button").prop("disabled", true);
    var letsgo = myFunction(id, id, value);
    if (letsgo === false) {
      $(".presets button").prop("disabled", false);
      $(this).parent().find("input").prop("disabled", false);
    }
    setTimeout(function () {
      $(".presets button").prop("disabled", false);
    }, 1000);
  }
});
var accessories = [];
var accessoriessplit = items["accessories"]["items"];
$.each(accessoriessplit, function (key, value) {
  var item = value.split("|");
  if (item[1].startsWith("$") && !item[1].startsWith("$0") && item[2] > 0) {
    var i;
    for (i = 0; i < item[2]; i++) {
      accessories.push([item[0], item[1]]);
    }
  }
});
var accessories3 = [];
var accessories3split = backupitems["accessories"]["items"];
$.each(accessories3split, function (key, value) {
  var item = value.split("|");
  if (item[1].startsWith("$") && !item[1].startsWith("$0") && item[2] > 0) {
    var i;
    for (i = 0; i < item[2]; i++) {
      accessories3.push([item[0], item[1]]);
    }
  }
});
var accessorieslarge = [];
var accessorieslargesplit = largeboxesitems["accessories"]["items"];
$.each(accessorieslargesplit, function (key, value) {
  var item = value.split("|");
  if (item[1].startsWith("$") && !item[1].startsWith("$0") && item[2] > 0) {
    var i;
    for (i = 0; i < item[2]; i++) {
      accessorieslarge.push([item[0], item[1]]);
    }
  }
});
var possibleTshirtsizes = [
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "xxxxl",
  "xxxxxl",
];
var possibleTshirts = [];
possibleTshirts["s"] = [];
possibleTshirts["m"] = [];
possibleTshirts["l"] = [];
possibleTshirts["xl"] = [];
possibleTshirts["xxl"] = [];
possibleTshirts["xxxl"] = [];
possibleTshirts["xxxxl"] = [];
possibleTshirts["xxxxxl"] = [];
var fallbacktshirtsizes = [
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "xxxxl",
  "xxxxxl",
];
var fallbacktshirts = [];
fallbacktshirts["s"] = [];
fallbacktshirts["m"] = [];
fallbacktshirts["l"] = [];
fallbacktshirts["xl"] = [];
fallbacktshirts["xxl"] = [];
fallbacktshirts["xxxl"] = [];
fallbacktshirts["xxxxl"] = [];
fallbacktshirts["xxxxxl"] = [];
var largeboxesTshirtsSizes = [
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "xxxxl",
  "xxxxxl",
];
var largeboxesTshirts = [];
largeboxesTshirts["s"] = [];
largeboxesTshirts["m"] = [];
largeboxesTshirts["l"] = [];
largeboxesTshirts["xl"] = [];
largeboxesTshirts["xxl"] = [];
largeboxesTshirts["xxxl"] = [];
largeboxesTshirts["xxxxl"] = [];
largeboxesTshirts["xxxxxl"] = [];
$.each(possibleTshirtsizes, function (key, value) {
  var size = value;
  var totaltypes = 1;
  var totaltshirts = 0;
  var split = tshirts[size + "tshirts"]["items"];
  $.each(split, function (key, value) {
    var item = value.split("|");
    if (item[1].startsWith("$") && !item[1].startsWith("$0") && item[2] > 0) {
      var i;
      for (i = 0; i < item[2]; i++) {
        possibleTshirts[size].push([item[0], item[1]]);
      }
    }
  });
});
$.each(fallbacktshirtsizes, function (key, value) {
  var size = value;
  console.log(value);
  var totaltypes = 1;
  var totaltshirts = 0;
  var split = fallbacktshirtsvals[size + "tshirts"]["items"];
  $.each(split, function (key, value) {
    var item = value.split("|");
    if (item[1].startsWith("$") && !item[1].startsWith("$0") && item[2] > 0) {
      var i;
      for (i = 0; i < item[2]; i++) {
        fallbacktshirts[size].push([item[0], item[1]]);
      }
    }
  });
});
$.each(largeboxesTshirtsSizes, function (key, value) {
  var size = value;
  console.log(value);
  var totaltypes = 1;
  var totaltshirts = 0;
  var split = largeboxesTshirtsvals[size + "tshirts"]["items"];
  $.each(split, function (key, value) {
    var item = value.split("|");
    if (item[1].startsWith("$") && !item[1].startsWith("$0") && item[2] > 0) {
      var i;
      for (i = 0; i < item[2]; i++) {
        largeboxesTshirts[size].push([item[0], item[1]]);
      }
    }
  });
});

var counts = {};
possibleTshirts["s"].forEach(function (i) {
  counts[i] = (counts[i] || 0) + 1;
});
$.each(counts, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .text(value);
});
var countm = {};
possibleTshirts["m"].forEach(function (i) {
  countm[i] = (countm[i] || 0) + 1;
});
$.each(countm, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .text(value);
});
var countl = {};
possibleTshirts["l"].forEach(function (i) {
  countl[i] = (countl[i] || 0) + 1;
});
$.each(countl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxl = {};
possibleTshirts["xl"].forEach(function (i) {
  countxl[i] = (countxl[i] || 0) + 1;
});
$.each(countxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxl = {};
possibleTshirts["xxl"].forEach(function (i) {
  countxxl[i] = (countxxl[i] || 0) + 1;
});
$.each(countxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxl = {};
possibleTshirts["xxxl"].forEach(function (i) {
  countxxxl[i] = (countxxxl[i] || 0) + 1;
});
$.each(countxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxxl = {};
possibleTshirts["xxxxl"].forEach(function (i) {
  countxxxxl[i] = (countxxxxl[i] || 0) + 1;
});
$.each(countxxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxxxl = {};
possibleTshirts["xxxxxl"].forEach(function (i) {
  countxxxxxl[i] = (countxxxxxl[i] || 0) + 1;
});
$.each(countxxxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var counts = {};
fallbacktshirts["s"].forEach(function (i) {
  counts[i] = (counts[i] || 0) + 1;
});
$.each(counts, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .text(value);
});
var countm = {};
fallbacktshirts["m"].forEach(function (i) {
  countm[i] = (countm[i] || 0) + 1;
});
$.each(countm, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .text(value);
});
var countl = {};
fallbacktshirts["l"].forEach(function (i) {
  countl[i] = (countl[i] || 0) + 1;
});
$.each(countl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxl = {};
fallbacktshirts["xl"].forEach(function (i) {
  countxl[i] = (countxl[i] || 0) + 1;
});
$.each(countxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxl = {};
fallbacktshirts["xxl"].forEach(function (i) {
  countxxl[i] = (countxxl[i] || 0) + 1;
});
$.each(countxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxl = {};
fallbacktshirts["xxxl"].forEach(function (i) {
  countxxxl[i] = (countxxxl[i] || 0) + 1;
});
$.each(countxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxxl = {};
fallbacktshirts["xxxxl"].forEach(function (i) {
  countxxxxl[i] = (countxxxxl[i] || 0) + 1;
});
$.each(countxxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxxxl = {};
fallbacktshirts["xxxxxl"].forEach(function (i) {
  countxxxxxl[i] = (countxxxxxl[i] || 0) + 1;
});
$.each(countxxxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});

var counts = {};
largeboxesTshirts["s"].forEach(function (i) {
  counts[i] = (counts[i] || 0) + 1;
});
$.each(counts, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .text(value);
});
var countm = {};
largeboxesTshirts["m"].forEach(function (i) {
  countm[i] = (countm[i] || 0) + 1;
});
$.each(countm, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .text(value);
});
var countl = {};
largeboxesTshirts["l"].forEach(function (i) {
  countl[i] = (countl[i] || 0) + 1;
});
$.each(countl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxl = {};
largeboxesTshirts["xl"].forEach(function (i) {
  countxl[i] = (countxl[i] || 0) + 1;
});
$.each(countxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxl = {};
largeboxesTshirts["xxl"].forEach(function (i) {
  countxxl[i] = (countxxl[i] || 0) + 1;
});
$.each(countxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxl = {};
largeboxesTshirts["xxxl"].forEach(function (i) {
  countxxxl[i] = (countxxxl[i] || 0) + 1;
});
$.each(countxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxxl = {};
largeboxesTshirts["xxxxl"].forEach(function (i) {
  countxxxxl[i] = (countxxxxl[i] || 0) + 1;
});
$.each(countxxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});
var countxxxxxl = {};
largeboxesTshirts["xxxxxl"].forEach(function (i) {
  countxxxxxl[i] = (countxxxxxl[i] || 0) + 1;
});
$.each(countxxxxxl, function (key, value) {
  $("#tshirts")
    .find('td[data-tshirtname="' + key + '"]')
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .next("td")
    .text(value);
});

// Warning before leaving the page (back button, or outgoinglink)
window.onbeforeunload = function () {
  return "Do you really want to leave our brilliant application?";
  //if we return nothing here (just calling return;) then there will be no pop-up question at all
  //return;
};

$("#enableLarge").on("click", function (e) {
  e.preventDefault();

  $(this).hide();
  $("#largeBoxesSelection").show();
  possibleTshirts["s"] = possibleTshirts["s"].concat(largeboxesTshirts["s"]);
  possibleTshirts["m"] = possibleTshirts["m"].concat(largeboxesTshirts["m"]);
  possibleTshirts["l"] = possibleTshirts["l"].concat(largeboxesTshirts["l"]);
  possibleTshirts["xl"] = possibleTshirts["xl"].concat(largeboxesTshirts["xl"]);
  possibleTshirts["xxl"] = possibleTshirts["xxl"].concat(
    largeboxesTshirts["xxl"]
  );
  possibleTshirts["xxxl"] = possibleTshirts["xxxl"].concat(
    largeboxesTshirts["xxxl"]
  );
  possibleTshirts["xxxxl"] = possibleTshirts["xxxxl"].concat(
    largeboxesTshirts["xxxxl"]
  );
  possibleTshirts["xxxxxl"] = possibleTshirts["xxxxxl"].concat(
    largeboxesTshirts["xxxxxl"]
  );
  accessories = accessories.concat(accessorieslarge);
});

function myFunction(id, type, amount) {
  var id = id;
  var value = type.substring(1);
  var box = type.charAt(0);
  if (type.charAt(0) === "s") {
    if (
      fallbacktshirts[value].length > 0 &&
      possibleTshirts[value].length < amount * 2
    ) {
      possibleTshirts[value] = possibleTshirts[value].concat(
        fallbacktshirts[value]
      );
      fallbacktshirts[value] = [];
      alert(
        "We may run out of tshirts for this amount of boxes, we will use fallback tshirts"
      );
      if (possibleTshirts[value].length < amount * 2) {
        alert(
          "We likely won't have enough tshirts for these boxes. Since there are no fallback tshirts left, you will  need to adjust quanities of  boxes for this size"
        );
        return false;
      }
    } else if (
      fallbacktshirts[value].length < 1 &&
      possibleTshirts[value].length < amount * 2
    ) {
      alert(
        "We likely won't have enough tshirts for these boxes. Since there are no fallback tshirts left, you will  need to adjust quanities of  boxes for this size"
      );
      return false;
    }
  } else {
    if (
      fallbacktshirts[value].length > 0 &&
      possibleTshirts[value].length < amount * 3
    ) {
      possibleTshirts[value] = possibleTshirts[value].concat(
        fallbacktshirts[value]
      );
      fallbacktshirts[value] = [];
      alert(
        "We may run out of tshirts for this amount of boxes, we will use fallback tshirts"
      );
      if (possibleTshirts[value].length < amount * 3) {
        alert(
          "We likely won't have enough tshirts for these boxes. Since there are no fallback tshirts left, you will  need to adjust quanities of  boxes for this size"
        );
        return false;
      }
    } else if (
      fallbacktshirts[value].length < 1 &&
      possibleTshirts[value].length < amount * 3
    ) {
      alert(
        "We likely won't have enough tshirts for these boxes. Since there are no fallback tshirts left, you will  need to adjust quanities of  boxes for this size"
      );
      return false;
    }
  }

  $("#result tbody").html("");

  var repeat;
  $("#totaltees").text(possibleTshirts[value].length);
  shuffle(possibleTshirts[value]);
  console.log(possibleTshirts[value]);
  $("#boxes tbody").html("");

  var boxsize = amount;
  var boxi;
  for (boxi = 0; boxi < boxsize; boxi++) {
    var currentBox = [];
    if (box === "s") {
      var random = Math.floor(Math.random() * possibleTshirts[value].length);
      var firstitem = possibleTshirts[value][random];
      currentBox.push(firstitem);
      possibleTshirts[value].splice(random, 1);
      var currentitem = firstitem;

      currentBox.push(currentitem);
      possibleTshirts[value].splice(random, 1);
    } else {
      var random = Math.floor(Math.random() * possibleTshirts[value].length);
      var firstitem = possibleTshirts[value][random];
      currentBox.push(firstitem);
      possibleTshirts[value].splice(random, 1);
      var currentitem = firstitem;

      var seconditem = possibleTshirts[value][random];
      currentBox.push(currentitem);
      possibleTshirts[value].splice(random, 1);
      var currentitem = seconditem;
      while (
        currentitem[0] === firstitem[0] ||
        currentitem[0].substr(0, 6) === firstitem[0].substr(0, 6) ||
        currentitem[0] === seconditem[0] ||
        currentitem[0].substr(0, 6) === seconditem[0].substr(0, 6)
      ) {
        random = Math.floor(Math.random() * possibleTshirts[value].length);
        currentitem = possibleTshirts[value][random];
      }
      var thirditem = possibleTshirts[value][random];
      currentBox.push(currentitem);
      possibleTshirts[value].splice(random, 1);
    }
    if (box === "s") {
      var cost = 0;
      while (cost < 65) {
        if (accessories.length < 1) {
          alert("We have ran out of accessories to complete one or more boxes");
          return;
        } else {
          var random = Math.floor(Math.random() * accessories.length);
          var enditem = accessories[random];
          currentBox.push(enditem);
          accessories.splice(random, 1);
        }
        cost = 0;
        $.each(currentBox, function (key, value) {
          cost = cost + Number(value[1].replace(/[^0-9\.]+/g, ""));
        });
      }
    } else {
      var cost = 0;
      if (accessories.length < 1) {
        alert("We have ran out of accessories to complete one or more boxes");
        return;
      } else {
        var random = Math.floor(Math.random() * accessories.length);
        var enditem = accessories[random];
        currentBox.push(enditem);
        accessories.splice(random, 1);
      }
      cost = 0;
      $.each(currentBox, function (key, value) {
        cost = cost + Number(value[1].replace(/[^0-9\.]+/g, ""));
      });
      if (cost < 105) {
        var currentitem = thirditem;
        while (
          currentitem[0] === firstitem[0] ||
          currentitem[0].substr(0, 6) === firstitem[0].substr(0, 6) ||
          currentitem[0] === seconditem[0] ||
          currentitem[0].substr(0, 6) === seconditem[0].substr(0, 6) ||
          currentitem[0] === thirditem[0] ||
          currentitem[0].substr(0, 6) === thirditem[0].substr(0, 6)
        ) {
          random = Math.floor(Math.random() * possibleTshirts[value].length);
          currentitem = possibleTshirts[value][random];
        }
        currentBox.push(currentitem);
        possibleTshirts[value].splice(random, 1);
        cost = 0;
        $.each(currentBox, function (key, value) {
          cost = cost + Number(value[1].replace(/[^0-9\.]+/g, ""));
        });
        while (cost < 125) {
          if (accessories.length < 1) {
            alert("We have ran out of stickers to complete this box");
            return;
          } else {
            var random = Math.floor(Math.random() * accessories.length);
            var enditem = accessories[random];
            currentBox.push(enditem);
            accessories.splice(random, 1);
          }
          cost = 0;
          $.each(currentBox, function (key, value) {
            cost = cost + Number(value[1].replace(/[^0-9\.]+/g, ""));
          });
        }
      } else {
        while (cost < 125) {
          if (accessories.length < 1) {
            alert("We have ran out of stickers to complete this box");
            return;
          } else {
            var random = Math.floor(Math.random() * accessories.length);
            var enditem = accessories[random];
            currentBox.push(enditem);
            accessories.splice(random, 1);
          }
          cost = 0;
          $.each(currentBox, function (key, value) {
            cost = cost + Number(value[1].replace(/[^0-9\.]+/g, ""));
          });
        }
      }
    }
    //Total up stuff
    var text = "";
    cost = 0;
    $.each(currentBox, function (key, value) {
      cost = cost + Number(value[1].replace(/[^0-9\.]+/g, ""));
    });
    $.each(currentBox, function (key, value) {
      text = text + (key + 1) + ". " + value[0] + "(" + value[1] + ")<br>";
    });
    $("#boxes tbody").append(
      "<tr><td>" +
        (boxi + 1) +
        "</td><td>" +
        text +
        "</td><td>$" +
        cost +
        "</td></tr>"
    );
  }
  results[id] = $("#boxes tbody").html();
  console.log(accessories);
  $("#inventory tbody").html("");
  uniquearray = [];
  uniquearraycount = [];

  uniquelargearray = [];
  uniquelargearraycount = [];

  $.each(accessories, function (key, value) {
    if (uniquearray.includes(value[0])) {
      uniquearraycount[value[0]] = uniquearraycount[value[0]] + 1;
    } else {
      uniquearray.push(value[0]);
      uniquearraycount[value[0]] = 1;
    }
  });
  $.each(accessories3, function (key, value) {
    if (uniquearray.includes(value[0])) {
      uniquearraycount[value[0]] = uniquearraycount[value[0]] + 1;
    } else {
      uniquearray.push(value[0]);
      uniquearraycount[value[0]] = 1;
    }
  });
  $.each(accessorieslarge, function (key, value) {
    if (uniquelargearray.includes(value[0])) {
      uniquelargearraycount[value[0]] = uniquelargearraycount[value[0]] + 1;
    } else {
      uniquelargearray.push(value[0]);
      uniquelargearraycount[value[0]] = 1;
    }
  });
  uniquearray.sort();
  uniquelargearray.sort();
  var i;
  for (i = 0; i < uniquearray.length; ++i) {
    $("#inventory tbody").append(
      "<tr><td>" +
        uniquearray[i] +
        "</td><td>" +
        uniquearraycount[uniquearray[i]] +
        "</td></tr>"
    );
  }
  for (i = 0; i < uniquelargearray.length; ++i) {
    $("#inventory tbody").append(
      '<tr style="background:yellow;"><td>' +
        uniquelargearray[i] +
        "</td><td>" +
        uniquelargearraycount[uniquelargearray[i]] +
        "</td></tr>"
    );
  }

  var counts = {};
  possibleTshirts["s"].forEach(function (i) {
    counts[i] = (counts[i] || 0) + 1;
  });
  $.each(counts, function (key, value) {
    $("#tshirts")
      .find('td[data-tshirtname="' + key + '"]')
      .next("td")
      .text(value);
  });
  var countm = {};
  possibleTshirts["m"].forEach(function (i) {
    countm[i] = (countm[i] || 0) + 1;
  });
  $.each(countm, function (key, value) {
    $("#tshirts")
      .find('td[data-tshirtname="' + key + '"]')
      .next("td")
      .next("td")
      .text(value);
  });
  var countl = {};
  possibleTshirts["l"].forEach(function (i) {
    countl[i] = (countl[i] || 0) + 1;
  });
  $.each(countl, function (key, value) {
    $("#tshirts")
      .find('td[data-tshirtname="' + key + '"]')
      .next("td")
      .next("td")
      .next("td")
      .text(value);
  });
  var countxl = {};
  possibleTshirts["xl"].forEach(function (i) {
    countxl[i] = (countxl[i] || 0) + 1;
  });
  $.each(countxl, function (key, value) {
    $("#tshirts")
      .find('td[data-tshirtname="' + key + '"]')
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .text(value);
  });
  var countxxl = {};
  possibleTshirts["xxl"].forEach(function (i) {
    countxxl[i] = (countxxl[i] || 0) + 1;
  });
  $.each(countxxl, function (key, value) {
    $("#tshirts")
      .find('td[data-tshirtname="' + key + '"]')
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .text(value);
  });
  var countxxxl = {};
  possibleTshirts["xxxl"].forEach(function (i) {
    countxxxl[i] = (countxxxl[i] || 0) + 1;
  });
  $.each(countxxxl, function (key, value) {
    $("#tshirts")
      .find('td[data-tshirtname="' + key + '"]')
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .text(value);
  });
  var countxxxxl = {};
  possibleTshirts["xxxxl"].forEach(function (i) {
    countxxxxl[i] = (countxxxxl[i] || 0) + 1;
  });
  $.each(countxxxxl, function (key, value) {
    $("#tshirts")
      .find('td[data-tshirtname="' + key + '"]')
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .text(value);
  });
  var countxxxxxl = {};
  possibleTshirts["xxxxxl"].forEach(function (i) {
    countxxxxxl[i] = (countxxxxxl[i] || 0) + 1;
  });
  $.each(countxxxxxl, function (key, value) {
    $("#tshirts")
      .find('td[data-tshirtname="' + key + '"]')
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .next("td")
      .text(value);
  });
}
function exportTableToCSV($table, filename) {
  var $rows = $table.find("tr:has(td)"),
    // Temporary delimiter characters unlikely to be typed by keyboard
    // This is to avoid accidentally splitting the actual contents
    tmpColDelim = String.fromCharCode(11), // vertical tab character
    tmpRowDelim = String.fromCharCode(0), // null character
    // actual delimiter characters for CSV format
    colDelim = '","',
    rowDelim = '"\r\n"',
    // Grab text from table into CSV formatted string
    csv =
      '"' +
      $rows
        .map(function (i, row) {
          var $row = $(row),
            $cols = $row.find("td");
          return $cols
            .map(function (j, col) {
              var $col = $(col),
                text = $col.html().replace(/<br>/g, "@@");
              return text.replace(/"/g, '""'); // escape double quotes
            })
            .get()
            .join(tmpColDelim);
        })
        .get()
        .join(tmpRowDelim)
        .split(tmpRowDelim)
        .join(rowDelim)
        .split(tmpColDelim)
        .join(colDelim) +
      '"';
  csv = csv.replace(/@@/g, "\n");

  // Deliberate 'false', see comment below
  if (false && window.navigator.msSaveBlob) {
    var blob = new Blob([decodeURIComponent(csv)], {
      type: "text/csv;charset=utf8",
    });
    // Crashes in IE 10, IE 11 and Microsoft Edge
    // See MS Edge Issue #10396033
    // Hence, the deliberate 'false'
    // This is here just for completeness
    // Remove the 'false' at your own risk
    window.navigator.msSaveBlob(blob, filename);
  } else if (window.Blob && window.URL) {
    // HTML5 Blob
    var blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });
    var csvUrl = URL.createObjectURL(blob);
    $("#download")
      .attr({
        download: filename,
        href: csvUrl,
      })
      .get(0)
      .click();
  } else {
    // Data URI
    var csvData =
      "data:application/csv;charset=utf-8," + encodeURIComponent(csv);
    $("#download")
      .attr({
        download: filename,
        href: csvData,
        target: "_blank",
      })
      .get(0)
      .click();
  }
}
$("#export").on("click", function (event) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var formattedDate = day + "-" + month + "-" + year;
  var args = [
    $("#boxes tbody"),
    current + "_" + formattedDate + "_gamegrumps.csv",
  ];
  exportTableToCSV.apply(this, args);
});
$("#settingsOpen").on("click", function () {
  $("#settingsPopup").show();
});
$("#settingsClose").on("click", function () {
  $("#settingsPopup").hide();
});

$("#generatePacks").on("click", function () {
  $(this).attr("disabled", "disabled");
  createPacks();
  setTimeout(function () {
    $("#generatePacks").removeAttr("disabled");
  }, 1000);
});
