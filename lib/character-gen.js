// *Dice Roller Functions*

function diceRoll(min, max) {
  const mathLogic = Math.floor(Math.random() * (max - min + 1)) + min;
  return mathLogic;
}

// Roller for multiple dice, would be useful for spell damage, amongst other things

function multiDiceRoll(diceAmt, diceNum) {
  const rolls = [];

  for (let i = 0; i < diceAmt; i += 1) {
    rolls.push(diceRoll(1, diceNum));
  }
  const rollTotal = rolls.reduce((a, b) => a + b, 0);
  return rollTotal;
}

// Rolls 8d6
// console.log(multiDiceRoll(8, 6));

// *Name Generator*

const firstNameOne = [
  "And",
  "Pel",
  "Ser",
  "Tan",
  "Ab",
  "Op",
  "Rem",
  "Dal",
  "Tar",
  "Lan",
  "Nol",
  "Ulf",
  "Col",
  "Xan",
  "Kyr",
  "Ur",
  "Quam",
  "Ziff",
  "Veyl",
  "Pav",
  "Tyn",
  "Gaab",
  "Zol",
  "Dolf",
  "Grem",
  "Anor",
  "Bax",
  "For",
  "Bac",
  "Zan",
  "Kaz",
  "Grak",
  "Thor",
  "Do",
  "Ux",
];

const firstNameTwo = [
  "on",
  "rah",
  "da",
  "el",
  "or",
  "rey",
  "ram",
  "ithe",
  "over",
  "'em",
  "yl",
  "ix",
  "ig",
  "elon",
  "emon",
  "illius",
  "-chan",
  "-kun",
  "-senpai",
  "ek",
  "aw",
  "anel",
  "us",
  "yme",
  "ival",
  "ash",
  "ien",
  "ia",
  "nax",
  "a",
  "e",
  "i",
  "o",
  "u",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

const lastNameOne = [
  "Far",
  "Short",
  "Tall",
  "Full",
  "Storm",
  "Hard",
  "Hill",
  "Clear",
  "Wild",
  "Dark",
  "High",
  "Low",
  "Bright",
  "Swift",
  "Oaken",
  "Dread",
  "Still",
  "Dawn",
  "Dusk",
  "Proud",
  "Sun",
  "Frost",
  "Cinder",
];

const lastNameTwo = [
  "church",
  "brook",
  "tree",
  "wood",
  "sea",
  "ridge",
  "stride",
  "river",
  "rider",
  "mane",
  "flame",
  "stone",
  "sworn",
  "seeker",
  "splitter",
  "bane",
  "jaw",
  "hammer",
  "water",
  "walker",
  "weaver",
  "härdt",
  "hair",
  "leaf",
];

const titles = [
  "the Ruthless",
  "the Violent",
  "the Soft",
  "the Kool",
  "the Well Endowed",
  "the Humble",
  "the Lil Binch",
  "of Low Self-Esteem",
  "the Tiresome",
  "the Thunderous",
  "the Lonely",
  "the Radiant",
  "the #Blessed",
  "the Light Loafered",
  "the Bugbear Slayer",
  "the MurderHobo",
  "the Disinherited",
  "the Grim",
  "the Loser",
  "the Fanged",
  "the Gouty",
  "the Accursed",
  "the Unavoidable",
  "the Mild",
  "the Victorious",
  "the Wise",
  "the Nightengale",
  "the Weird",
  "the Cuddle Bug",
];

const tableGen = (listOne, listTwo = " ") => {
  const tableResult = `${listOne[diceRoll(0, listOne.length - 1)]}${
    listTwo[diceRoll(0, listTwo.length - 1)]
  }`;
  return tableResult.trim();
};

// *Ability Score Generator*

// rolls 4d6, dropping the lowest to make each raw ability score
function roll4d6Scores() {
  let rawScores = [];

  for (let i = 0; i < 4; i += 1) {
    rawScores.push(diceRoll(1, 6));
  }
  rawScores.sort().shift();
  rawScores = rawScores.reduce((a, b) => a + b, 0);
  return rawScores;
}

// loops roll4d6Scores to get 6 scores in an array
function getScoreArray() {
  const scoreArray = [];

  for (let i = 0; i < 7; i += 1) {
    scoreArray.push(roll4d6Scores());
  }
  scoreArray
    .sort((a, b) => {
      return a - b;
    })
    .reverse()
    .pop();
  // for checking score averages, change return to scoreSum
  const scoreSum = scoreArray.reduce((a, b) => a + b, 0);
  return scoreArray;
}

// loops getScoreArray to check average sum of scores for balance reasons.
// function getScoreAverage() {
//   const sumArray = [];

//   for (let i = 0; i < 1000; i += 1) {
//     sumArray.push(getScoreArray());
//   }
//   const totalSum = sumArray.reduce((a, b) => a + b, 0);

//   const sumAverage = totalSum / sumArray.length;
//   return sumAverage;
// }

// returns an array with preferred order of ability scores to be passed into getScoreObject

function getScorePreference(characterClass) {
  const charClass = characterClass.toLowerCase();
  switch (true) {
    case charClass === "cleric":
      return ["cha", "str", "con", "wis", "dex", "int"];
    case charClass === "druid":
      return ["wis", "con", "dex", "str", "int", "cha"];
    case charClass === "fighter":
      return ["str", "con", "dex", "wis", "cha", "int"];
    case charClass === "monk":
      return ["dex", "wis", "con", "cha", "str", "int"];
    case charClass === "rogue":
      return ["dex", "int", "cha", "wis", "con", "str"];
    case charClass === "wizard":
      return ["int", "cha", "dex", "con", "wis", "str"];
    default:
      return console.log("Score Preference Failed");
  }
}

function getScoreObject(characterClass) {
  const scoreOrder = getScorePreference(characterClass.toLowerCase());
  const scoreArray = getScoreArray();

  const scoreObject = {
    str: scoreArray[scoreOrder.indexOf("str")],
    dex: scoreArray[scoreOrder.indexOf("dex")],
    con: scoreArray[scoreOrder.indexOf("con")],
    int: scoreArray[scoreOrder.indexOf("int")],
    wis: scoreArray[scoreOrder.indexOf("wis")],
    cha: scoreArray[scoreOrder.indexOf("cha")],
  };

  return scoreObject;
}

// returns ability modifier bonuses based off sorted ability score object

function returnAbilityMod(character) {
  const char = character;
  const scoreArray = Object.values(char.abilityScores);
  const bonusArray = scoreArray.map((x) => Math.floor((x - 10) / 2));

  char.abilityBonuses = {
    str: bonusArray[0],
    dex: bonusArray[1],
    con: bonusArray[2],
    int: bonusArray[3],
    wis: bonusArray[4],
    cha: bonusArray[5],
  };
  return char.abilityBonuses;
}

// returns proficiency bonus based on characters total level
function getProficiencyBonus(character) {
  const char = character;
  const charLevel = char.level;
  if (charLevel <= 4) {
    char.profBonus = 2;
    return char.profBonus;
  }
  if (charLevel > 4 && charLevel <= 8) {
    char.profBonus = 3;
    return char.profBonus;
  }
  if (charLevel > 8 && charLevel <= 12) {
    char.profBonus = 4;
    return char.profBonus;
  }
  if (charLevel > 12 && charLevel <= 16) {
    char.profBonus = 5;
    return char.profBonus;
  }
  if (charLevel >= 17) {
    char.profBonus = 6;
    return char.profBonus;
  }
}

// *Class Table*
// Begin adding class trait functions

const charClassList = ["cleric", "druid", "fighter", "monk", "rogue", "wizard"];

function addCleric(character) {
  const char = character;
  char.hitDice = 8;
  char.abilityScores.str += 1;
  char.abilityScores.cha += 2;
  char.primaryMelee = "str";
  char.primarySpell = "cha";
  char.saveProf = ["str", "cha"];
  char.armorProf = ["light armor", "heavy armor"];
  char.weaponProf = ["simple weapon"];
  // if statements to get higher level features.
  // current values just for testing
  if (char.level >= 2) {
    // char.abilityScores.str += 20;
  }
  if (char.level >= 4) {
    // char.abilityScores.str -= 5;
    char.weaponProf.push("martial weapon");
  }
}

function addDruid(character) {
  const char = character;
  char.hitDice = 8;
  char.abilityScores.wis += 2;
  char.abilityScores.con += 1;
  char.primaryMelee = "wis";
  char.primarySpell = "con";
  char.saveProf = ["wis", "con"];
  char.armorProf = ["light armor"];
  char.weaponProf = ["simple weapon"];
}

function addFighter(character) {
  const char = character;
  char.hitDice = 10;
  char.abilityScores.str += 2;
  char.abilityScores.con += 1;
  char.primaryMelee = "str";
  char.primarySpell = null;
  char.saveProf = ["str", "con"];
  char.armorProf = ["light armor", "heavy armor", "shields"];
  char.weaponProf = ["simple weapon", "martial weapon", "ranged weapons"];
}

function addMonk(character) {
  const char = character;
  char.hitDice = 8;
  char.abilityScores.dex += 2;
  char.abilityScores.wis += 1;
  char.primaryMelee = "dex";
  char.primarySpell = null;
  char.saveProf = ["dex", "wis"];
  char.armorProf = null;
  char.weaponProf = ["simple weapon", "unarmed"];
}

function addRogue(character) {
  const char = character;
  char.hitDice = 6;
  char.abilityScores.dex += 2;
  char.abilityScores.int += 1;
  char.primaryMelee = "dex";
  char.primarySpell = null;
  char.saveProf = ["dex", "int"];
  char.armorProf = ["light armor"];
  char.weaponProf = ["simple weapon", "ranged weapons"];
}

function addWizard(character) {
  const char = character;
  char.hitDice = 6;
  char.abilityScores.int += 2;
  char.abilityScores.cha += 1;
  char.primaryMelee = "str";
  char.primarySpell = "int";
  char.saveProf = ["int", "cha"];
  char.armorProf = ["light armor"];
  char.weaponProf = ["simple weapon", "ranged weapons"];
}

function getClassTraits(character, characterClass) {
  const charClass = characterClass.toLowerCase();

  switch (true) {
    case charClass === "cleric":
      addCleric(character);
      break;
    case charClass === "druid":
      addDruid(character);
      break;
    case charClass === "fighter":
      addFighter(character);
      break;
    case charClass === "monk":
      addMonk(character);
      break;
    case charClass === "rogue":
      addRogue(character);
      break;
    case charClass === "wizard":
      addWizard(character);
      break;
    default:
      console.log("getClassTraits Failed");
  }
}

// Hit Point Generator

function hitPointGen(character, level, hitDiceValue) {
  const char = character;
  const rolledLevels = level - 1;
  const rolls = [hitDiceValue];

  for (let i = 0; i < rolledLevels; i += 1) {
    rolls.push(diceRoll(2, hitDiceValue));
  }
  char.maxHp =
    rolls.reduce((a, b) => a + b, 0) + char.abilityBonuses.con * level;
  return char.maxHp;
}

// Ancestry traits and generators

const charAncestryList = [
  "Bugbear",
  "Dwarf",
  "Elf",
  "Goblin",
  "Gnome",
  "Half-Elf",
  "Half-Orc",
  "Human",
  "Beastfolk",
  "Cambion",
  "Nephilim",
];

// Function with each ancestry's traits. Just basic traits for now, will expand later with subraces

function addBugbear(character) {
  const char = character;
  char.size = "Medium";
  char.languages = ["Common", "Goblin"];
}

function addDwarf(character) {
  const char = character;
  char.size = "Medium";
  char.languages = ["Common", "Dwarvish"];
}

function addElf(character) {
  const char = character;
  char.size = "Medium";
  char.languages = ["Common", "Elvish", "Sylvan"];
}

function addGoblin(character) {
  const char = character;
  char.size = "Small";
  char.languages = ["Common", "Goblin"];
}

function addGnome(character) {
  const char = character;
  char.size = "Small";
  char.languages = ["Common", "Gnomish"];
}

function addHalfElf(character) {
  const char = character;
  char.size = "Medium";
  char.languages = ["Common", "Elvish"];
}

function addHalfOrc(character) {
  const char = character;
  char.size = "Medium";
  char.languages = ["Common", "Orc"];
}

function addHuman(character) {
  const char = character;
  char.size = "Medium";
  char.languages = ["Common"];
}

function addBeastfolk(character) {
  const char = character;
  char.size = "Medium";
  char.languages = ["Common"];
}

function addCambion(character) {
  const char = character;
  char.damageResist = ["fire"];
  char.size = "Medium";
  char.languages = ["Common", "Infernal"];
}

function addNephilim(character) {
  const char = character;
  char.damageResist = ["necrotic"];
  char.size = "Medium";
  char.languages = ["Common", "Celestial"];
}

// Grabs ancestry trait function and applies them to character object

function getAncestryTraits(character, characterAncestry) {
  const charAncestry = characterAncestry.toLowerCase();

  switch (true) {
    case charAncestry === "bugbear":
      addBugbear(character);
      break;
    case charAncestry === "dwarf":
      addDwarf(character);
      break;
    case charAncestry === "elf":
      addElf(character);
      break;
    case charAncestry === "goblin":
      addGoblin(character);
      break;
    case charAncestry === "gnome":
      addGnome(character);
      break;
    case charAncestry === "half-elf":
      addHalfElf(character);
      break;
    case charAncestry === "half-orc":
      addHalfOrc(character);
      break;
    case charAncestry === "human":
      addHuman(character);
      break;
    case charAncestry === "beastfolk":
      addBeastfolk(character);
      break;
    case charAncestry === "cambion":
      addCambion(character);
      break;
    case charAncestry === "nephilim":
      addNephilim(character);
      break;
    default:
      console.log("getAncestryTraits Failed");
  }
}

// *items tables and generator*

const simpleWeapons = [
  {
    name: "dagger",
    meleeDamage: 2,
    type: "simple weapon",
    amount: 1,
  },
  { name: "mace", meleeDamage: 3, type: "simple weapon", amount: 1 },
  { name: "staff", meleeDamage: 2, type: "simple weapon", amount: 1 },
  { name: "handaxe", meleeDamage: 3, type: "simple weapon", amount: 1 },
  { name: "shortsword", meleeDamage: 3, type: "simple weapon", amount: 1 },
  {
    name: "stick",
    meleeDamage: 1,
    type: "simple weapon",
    amount: 1,
  },
];

const martialWeapons = [
  {
    name: "longsword",
    meleeDamage: 4,
    type: "martial weapon",
    amount: 1,
  },
  { name: "battleaxe", meleeDamage: 5, type: "martial weapon", amount: 1 },
  { name: "greataxe", meleeDamage: 6, type: "martial weapon", amount: 1 },
  {
    name: "greatsword",
    meleeDamage: 7,
    type: "martial weapon",
    amount: 1,
  },
];

const rangedWeapons = [
  {
    name: "shortbow",
    meleeDamage: 3,
    type: "ranged weapon",
    amount: 1,
  },
  { name: "crossbow", meleeDamage: 4, type: "ranged weapon", amount: 1 },
];

const lightArmor = [
  {
    name: "shirt",
    armorClass: 11,
    type: "light armor",
    amount: 1,
  },
  {
    name: "leather jacket",
    armorClass: 12,
    type: "light armor",
    amount: 1,
  },
  {
    name: "studded denim vest",
    armorClass: 13,
    type: "light armor",
    amount: 1,
  },
];

const heavyArmor = [
  {
    name: "chain shirt",
    armorClass: 14,
    type: "heavy armor",
    amount: 1,
  },
  {
    name: "half plate",
    armorClass: 16,
    type: "heavy armor",
    amount: 1,
  },
  {
    name: "plate armor",
    armorClass: 18,
    type: "heavy armor",
    amount: 1,
  },
];

const consumableItems = [
  {
    name: "potion",
    type: "consumable",
    amount: 1,
  },
  {
    name: "mega potion",
    type: "consumable",
    amount: 1,
  },
  {
    name: "poppers",
    type: "consumable",
    amount: 1,
  },
  {
    name: "zootamine",
    type: "consumable",
    amount: 1,
  },
];

const consumablesTest = [
  "Potion",
  "Alchemist's Fire",
  "Spell Scroll",
  "Poppers",
  "Potion of Giant's Strength",
  "Philter of Love",
  "Sovereign Glue",
];

// Adds starting equipment based on character class

function getStartingItems(character, characterClass) {
  const charClass = characterClass.toLowerCase();
  let charItems = character.items;
  charItems = [];
  switch (true) {
    case charClass === "cleric":
      charItems.push(simpleWeapons[1], heavyArmor[0]);
      return charItems;
    case charClass === "druid":
      charItems.push(simpleWeapons[2], lightArmor[0]);
      return charItems;
    case charClass === "fighter":
      charItems.push(martialWeapons[0], heavyArmor[0]);
      return charItems;
    case charClass === "monk":
      charItems.push(simpleWeapons[0]);
      return charItems;
    case charClass === "rogue":
      charItems.push(simpleWeapons[0], lightArmor[1], rangedWeapons[1]);
      return charItems;
    case charClass === "wizard":
      charItems.push(simpleWeapons[2], lightArmor[0]);
      return charItems;
    default:
      return console.log("getStartingItems Failed");
  }
}

// calculates armorClass based on armor type, also deals with 'unarmored defense' for monks
function getArmorClass(character) {
  const char = character;
  const armor = char.equippedArmor;
  if (armor === undefined && char.class === "monk") {
    char.armorClass = char.abilityBonuses.dex + char.abilityBonuses.wis + 10;
    return char.armorClass;
  }
  if (armor === undefined) {
    char.armorClass = 10 + char.abilityBonuses.dex;
    return char.armorClass;
  }
  if (armor.type === "light armor") {
    char.armorClass = armor.armorClass + char.abilityBonuses.dex;
    return char.armorClass;
  }
  if (armor.type === "heavy armor") {
    char.armorClass = armor.armorClass;
    return char.armorClass;
  } else {
    console.log("getArmorClass fail");
  }
}

// **Constructor function to build random character**
// Could be modified to have things like firstName/Race etc as param , to manually edit those features
// getting big, maybe needs to be refactored into subclasses? or not?
class RandomCharacter {
  constructor() {
    this.firstName = tableGen(firstNameOne, firstNameTwo);
    this.lastName = tableGen(lastNameOne, lastNameTwo);
    this.title = tableGen(titles);
    this.ancestry = tableGen(charAncestryList);
    getAncestryTraits(this, this.ancestry);
    this.class = tableGen(charClassList);
    this.level = 5;
    this.profBonus = getProficiencyBonus(this);
    this.abilityScores = getScoreObject(this.class);
    getClassTraits(this, this.class);
    this.abilityBonuses = returnAbilityMod(this);
    this.maxHp = hitPointGen(this, this.level, this.hitDice);
    this.currentHp = this.maxHp;
    this.items = getStartingItems(this, this.class);
    // default equips need work, this is too wonky
    this.equippedWeapon = this.items[
      this.items.findIndex((item) => item.type.includes("weapon"))
    ];
    this.equippedArmor = this.items[
      this.items.findIndex((item) => item.type.includes("armor"))
    ];
    this.meleeBonus = this.profBonus + this.abilityBonuses[this.primaryMelee];
    this.meleeDamage =
      this.equippedWeapon.meleeDamage + this.abilityBonuses[this.primaryMelee];
    this.armorClass = getArmorClass(this);
  }

  addItem(itemName, itemArray, amountAdded = 1) {
    // itemIndex and itemAmount dont have values to read if item isnt in array yet.
    // will have to reorder things or think of new solution

    const arrayIndex = itemArray.findIndex((item) => item.name === itemName);

    // const itemIndex = this.items.findIndex((item) => item.name === itemName);
    // let itemAmount = this.items[itemIndex].amount;

    if (this.items.includes(itemArray[arrayIndex])) {
      // itemAmount += amountAdded;
    } else {
      this.items.push(itemArray[arrayIndex]);
      // itemAmount += (amountAdded -1);
    }
  }

  useItem(itemName) {
    // select and "use" an item, which is then deducted from amount/items.
    // will have to figure out functionality for item effects
    const itemIndex = this.items.findIndex((item) => item.name === itemName);
    const itemType = this.items[itemIndex].type;
    let itemAmount = this.items[itemIndex].amount;
    if (itemType === "consumable") {
      itemAmount--;
      if (itemAmount === 0) {
        this.items.splice(itemIndex, 1);
      }
    } else {
      return `Cannot use ${this.items[itemIndex].name}!`;
    }
  }

  equipItem(itemName) {
    const itemIndex = this.items.findIndex((item) => item.name === itemName);
    const itemType = this.items[itemIndex].type;
    if (itemType.includes("weapon") && this.weaponProf.includes(itemType)) {
      this.equippedWeapon = this.items[itemIndex];
      this.meleeDamage =
        this.equippedWeapon.meleeDamage +
        this.abilityBonuses[this.primaryMelee];
    }
    if (itemType.includes("armor") && this.armorProf.includes(itemType)) {
      this.equippedArmor = this.items[itemIndex];
      getArmorClass(this);
    }
  }

  makeAtk(target) {
    const rawRoll = diceRoll(1, 20);
    const totalRoll = rawRoll + this.meleeBonus;
    const damage = this.meleeDamage;
    const baseMessage = `${this.firstName} rolled ${rawRoll} for a total of ${totalRoll}.`;
    // maybe edit so it increments based on an amount of "multi-attacks" in a classes features?
    // would have to change so it doesnt return until end. change each return to variable like "result"?

    // checks roll against armor class and for Nat 20s & 1s.
    // Deducts hit points on a hit and prints message describing results.
    if (rawRoll === 20) {
      target.currentHp -= damage * 2;
      return `Critical Hit!! ${baseMessage} ${this.firstName} hit ${
        target.firstName
      } for ${damage * 2} damage!!`;
    }
    if (rawRoll === 1) {
      return `Critical Miss!! ${baseMessage}`;
    }
    if (totalRoll >= target.armorClass) {
      target.currentHp -= damage;
      return `${baseMessage} ${this.firstName} hit ${target.firstName} for ${damage} damage!`;
    }
    return `${baseMessage} ${this.firstName}'s attack missed!`;
  }

  battleSummary(target) {
    return `~~${this.firstName} HP: ${this.currentHp}/${this.maxHp} --- ${target.firstName} HP: ${target.currentHp}/${target.maxHp}~~`;
  }
}

const playerOne = new RandomCharacter();

const badGuy = new RandomCharacter();

console.log(playerOne);
// console.log(getStartingItemsTest(playerOne, playerOne.class));

// playerOne.addItem("greatsword", martialWeapons);
// playerOne.equipItem("greatsword");

// playerOne.addItem("potion", consumableItems, 5);
// console.log(playerOne.items);
// playerOne.useItem("potion");
// console.log(playerOne.items);
// console.log(badGuy.currentHp);
