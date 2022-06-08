const qwerty = new Array<string>(
  "hankaku",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "^",
  "¥",
  "back",
  "tab",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "@",
  "[",
  "half",
  "enter",
  "capslock",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  ":",
  "]",
  "left-shift",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "\\",
  "right-shift",
  "left-ctrl",
  "left-fn",
  "start",
  "left-alt",
  "non-convert",
  "space",
  "convert",
  "hiragana",
  "right-alt",
  "right-fn",
  "I",
  "O",
  "P",
  "`",
  "{",
  "J",
  "K",
  "L",
  "+",
  "*",
  "}",
  "N",
  "M",
  "<",
  ">",
  "?",
  "_", 
);

export const homeKey = ["f", "j"];

const qwertyToRightHomeMap = new Map([
  ["y", ""],
  ["u", ""],
  ["i", "y"],
  ["o", "u"],
  ["p", "i"],
  ["@", "o"],
  ["[", "p"],
  ["h", ""],
  ["j", ""],
  ["k", "h"],
  ["l", "j"],
  [";", "k"],
  [":", "l"],
  ["]", ":"],
  ["n", ""],
  ["m", "-"],
  [",", "n"],
  [".", "m"],
  ["/", ","],
  ["\\", "."],
  ["6", ""],
  ["7", ""],
  ["8", "6"],
  ["9", "7"],
  ["0", "8"],
  ["-", "9"],
  ["^", "0"],
  ["¥", "^"],
  ["I", "Y"],
  ["O", "U"],
  ["P", "I"],
  ["`", "O"],
  ["{", "P"],
  ["K", "H"],
  ["L", "J"],
  ["+", "K"],
  ["*", "L"],
  ["}", "*"],
  ["N", ""],
  ["M", "`"],
  ["<", "N"],
  [">", "M"],
  ["?", "<"],
  ["_", ">"]
]);

export const superRightHomeMap = new Map([
  ["q", "@"],
  ["w", "|"],
  ["e", ";"],
  ["r", "{"],
  ["t", "}"],
  ["a", "'"],
  ["s", "_"],
  ["d", "="],
  ["f", "("],
  ["g", ")"],
  ["z", "+"],
  ["x", "\\"],
  ["c", "/"],
  ["v", "["],
  ["b", "]"],
  ["h", "←"],
  ["j", "↓"],
  ["k", "↑"],
  ["l", "→"],
  ["m", "page-down"],
  [",", "page-up"]
])

const convertToMap = (arr: Array<string>, map: Map<string, string>) => {
  return new Map(
    arr.map((value) => {
      if (map.has(value)) {
        let newKey = map.get(value) ?? "";
        newKey = newKey.replace("left-", "");
        newKey = newKey.replace("right-", "");
        if(newKey.length > 1){
          newKey = newKey[0].toUpperCase() + newKey.substring(1, newKey.length -1);
        }
        return [value, newKey];
      } else {
        return [value, value];
      }
    })
  )
}

const convertToArray = (arr: Array<string>, map: Map<string, string>) => {
  return arr.map(value => {
    if (map.has(value)) {
      return map.get(value) ?? "";
    } else {
      return value;
    }
  })
}

const rightHome = convertToArray(qwerty, qwertyToRightHomeMap);
export const rightHome66 = rightHome.slice(0, 66);
export const superRight = convertToArray(rightHome66, superRightHomeMap);
export const qwertyToRight = convertToMap(qwerty, qwertyToRightHomeMap);
export const rightToSuper = convertToMap(rightHome, superRightHomeMap);
export const newModifier = new Array<string>("Convert", "Hiragana", "NonConvert", "Alt");