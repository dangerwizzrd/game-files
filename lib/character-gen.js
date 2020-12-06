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
  "Opr",
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
  "ah",
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

  for (let i = 0; i < 6; i += 1) {
    scoreArray.push(roll4d6Scores());
  }
  return scoreArray;
}

// returns an array with preferred order of ability scores to be passed into getScoreObject

function getScorePreference(characterClass) {
  const charClass = characterClass.toLowerCase();

  if (charClass === "cleric") {
    return ["wis", "con", "str", "int", "dex", "cha"];
  }
  if (charClass === "druid") {
    return ["wis", "con", "dex", "str", "int", "cha"];
  }
  if (charClass === "fighter") {
    return ["str", "con", "dex", "wis", "cha", "int"];
  }
  if (charClass === "monk") {
    return ["str", "con", "dex", "wis", "cha", "int"];
  }
  if (charClass === "rogue") {
    return ["dex", "int", "cha", "wis", "con", "str"];
  }
  if (charClass === "wizard") {
    return ["int", "dex", "con", "cha", "wis", "str"];
  }
  return "oops!";
}

function getScoreObject(characterClass) {
  const scoreOrder = getScorePreference(characterClass.toLowerCase());
  const scoreArray = getScoreArray()
    .sort((a, b) => {
      return a - b;
    })
    .reverse();

  const scoreObject = {
    str: scoreArray[scoreOrder.indexOf("str")],
    dex: scoreArray[scoreOrder.indexOf("dex")],
    con: scoreArray[scoreOrder.indexOf("con")],
    int: scoreArray[scoreOrder.indexOf("int")],
    wis: scoreArray[scoreOrder.indexOf("wis")],
    cha: scoreArray[scoreOrder.indexOf("cha")],
  };

  // scoreSum is to be built into loop to reroll score if sum < 71 || sum > 79
  const scoreSum = scoreArray.reduce((a, b) => a + b, 0);

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
  const charLevel = char.totalLevel;
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

const charClassList = ["Cleric", "Druid", "Fighter", "Monk", "Rogue", "Wizard"];

function addCleric(character) {
  const char = character;
  char.hitDice = 8;
  char.abilityScores.str += 2;
  char.abilityScores.cha += 1;
  char.primaryMelee = "cha";
  char.primarySpell = "str";
  char.saveProf = ["str", "cha"];
  char.armorProf = ["light armor", "heavy armor"];
  char.weaponProf = ["simple weapons"];
}

function addDruid(character) {
  const char = character;
  char.hitDice = 8;
  char.abilityScores.wis += 2;
  char.abilityScores.con += 1;
  char.primaryMelee = "wis";
  char.primarySpell = "con";
  char.saveProf = ["str", "cha"];
  char.armorProf = ["light armor", "heavy armor"];
  char.weaponProf = ["simple weapons"];
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
  char.weaponProf = ["simple weapons", "martial weapons", "ranged weapons"];
}

function addMonk(character) {
  const char = character;
  char.hitDice = 8;
  char.abilityScores.dex += 2;
  char.abilityScores.wis += 1;
  char.primaryMelee = "dex";
  char.primarySpell = null;
  char.saveProf = ["dex", "wis"];
  char.armorProf = ["unarmored"];
  char.weaponProf = ["simple weapons", "unarmed"];
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
  char.weaponProf = ["simple weapons", "ranged weapons"];
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
  char.weaponProf = ["simple weapons", "ranged weapons"];
}

function getClassTraits(character, characterClass) {
  const charClass = characterClass.toLowerCase();
  if (charClass === "cleric") {
    addCleric(character);
  }
  if (charClass === "druid") {
    addDruid(character);
  }
  if (charClass === "fighter") {
    addFighter(character);
  }
  if (charClass === "rogue") {
    addRogue(character);
  }
  if (charClass === "wizard") {
    addWizard(character);
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

// Grabs ancestry trait function and applies them to character object

function getAncestryTraits(character, characterAncestry) {
  const charAncestry = characterAncestry.toLowerCase();
  if (charAncestry === "bugbear") {
    addBugbear(character);
  }
  if (charAncestry === "dwarf") {
    addDwarf(character);
  }
  if (charAncestry === "elf") {
    addElf(character);
  }
  if (charAncestry === "goblin") {
    addGoblin(character);
  }
  if (charAncestry === "gnome") {
    addGnome(character);
  }
  if (charAncestry === "half-elf") {
    addHalfElf(character);
  }
  if (charAncestry === "half-orc") {
    addHalfOrc(character);
  }
  if (charAncestry === "human") {
    addHuman(character);
  }
  if (charAncestry === "beastfolk") {
    addBeastfolk(character);
  }
  if (charAncestry === "cambion") {
    addCambion(character);
  }
}

// *Starting items tables and generator*

const weapons = [
  "Dagger",
  "Shortsword",
  "Bastard Sword",
  "Crossbow",
  "Longbow",
  "Frying Pan",
  "Spell Book",
  "Staff",
];

const armor = [
  "T-Shirt",
  "Leather Vest",
  "Chain Shirt",
  "Plate Armor",
  "Magic Underwear",
];

const consumables = [
  "Potion",
  "Alchemist's Fire",
  "Spell Scroll",
  "Poppers",
  "Potion of Giant's Strength",
  "Philter of Love",
  "Sovereign Glue",
];

const startingItem = (itemType) => itemType[diceRoll(0, itemType.length - 1)];

// **Constructor function to build player character**
// Could be modified to have things like firstName/Race etc as param , to manually edit those features
// getting big, maybe needs to be refactored into subclasses? or not?
class RandomCharacter {
  constructor(items = []) {
    this.firstName = tableGen(firstNameOne, firstNameTwo);
    this.lastName = tableGen(lastNameOne, lastNameTwo);
    this.title = tableGen(titles);
    this.ancestry = tableGen(charAncestryList);
    getAncestryTraits(this, this.ancestry);
    this.class = tableGen(charClassList);
    this.totalLevel = 5;
    this.profBonus = getProficiencyBonus(this);
    this.abilityScores = getScoreObject(this.class);
    getClassTraits(this, this.class);
    this.abilityBonuses = returnAbilityMod(this);
    // armorClass & atkBonus need to be fleshed out but this will do for testing
    // this.classTraits = ;
    this.armorClass = 10 + this.abilityBonuses.dex;
    this.atkBonus = this.profBonus + this.abilityBonuses[this.primaryMelee];
    // atkDamage & HP just for testing makeAttack method, will be replaced or edited heavily
    this.maxHp = hitPointGen(this, this.totalLevel, this.hitDice);
    this.currentHp = this.maxHp;
    this.atkDamage =
      multiDiceRoll(2, 6) + this.abilityBonuses[this.primaryMelee];
    this.items = items;
  }

  makeAtk(target) {
    const theRoll = diceRoll(1, 20);
    const totalRoll = theRoll + this.atkBonus;
    const printedStatement = `${this.firstName} rolled ${theRoll} for a total of ${totalRoll}.`;

    // checks roll against armor class and for Nat 20s & 1s.
    // Deducts hit points on a hit and prints message describing results.
    if (theRoll === 20) {
      target.currentHp -= this.atkDamage * 2;
      return `Critical Hit!! ${printedStatement} ${
        this.firstName
      }'s attack hit ${target.firstName} for ${this.atkDamage * 2} damage!!`;
    }
    if (theRoll === 1) {
      return `Critical Miss!! ${printedStatement} Your sword flew right in the trash!!`;
    }
    if (totalRoll >= target.armorClass) {
      target.currentHp -= this.atkDamage;
      return `${printedStatement} ${this.firstName}'s attack hit ${target.firstName} for ${this.atkDamage} damage!`;
    }
    return `${printedStatement} ${this.firstName}'s attack missed!`;
  }

  battleSummary(target) {
    return `~~${this.firstName} HP: ${this.currentHp}/${this.maxHp} --- ${target.firstName} HP: ${target.currentHp}/${target.maxHp}~~`;
  }
}

const playerOne = new RandomCharacter([
  startingItem(weapons),
  startingItem(armor),
]);

const badGuy = new RandomCharacter();

console.log(playerOne);

// console.log(playerOne.makeAtk(badGuy));
// console.log(badGuy.makeAtk(playerOne));
// console.log(playerOne.battleSummary(badGuy));
