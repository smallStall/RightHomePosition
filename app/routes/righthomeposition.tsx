import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useRef, useState } from "react";
import stylesUrl from "../styles/keyboard.css";
import {
  newModifier,
  rightHome66,
  rightToSuper,
  superRight,
  superRightHomeMap,
  homeKey,
  qwertyToRight,
} from "~/utils/keymap";
import { words } from "~/utils/words";


export const meta: MetaFunction = () => {
  return {
    title: "RIGHTホームポジション",
    description:
      "右手の小指が痛むプログラマー用の配列です。右手のホームポジションが２列ずれています。",
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "stylesheet", href: stylesUrl },
    { rel: "canonical", href: "https://small-stall.com/righthomeposition" },
  ];
};

const keyDisplayNameConvert = (str: string) => {
  str = str.replace("left-", "");
  str = str.replace("right-", "");
  str = str.replace("hankaku", "半角");
  str = str.replace("non-convert", "無変換");
  str = str.replace("convert", "変換");
  str = str.replace("hiragana", "ひらがな");
  if (str.length === 1) {
    return str.toUpperCase();
  }
  return str;
};

const getQwertyKey = (str: string) => {
  let qwertyKey = "";
  superRightHomeMap.forEach((val) => {
    if (val === str) {
      qwertyKey = val;
    }
  });
  return qwertyKey;
};

const isUpperCase = (c: string) => {
  return /^[A-Z<>]$/.test(c);
};

const keyNameCovertClassName = (str: string, isSuper: boolean) => {
  const qwerty = getQwertyKey(str);
  if (qwerty.length === 1 && isSuper) {
    return qwerty;
  }
  if (qwerty.length === 1) {
    return "hiragana";
  }

  if (str === " ") {
    return "space";
  } else {
    return str;
  }
};

const toUnshiftCase = (str: string) => {
  if (str === "<") {
    return ",";
  } else if (str === ">") {
    return ".";
  }
  return str?.toLowerCase();
};

const keyClassNameConvert = (str: string, next: string) => {
  let className: string;
  const lowerNext = toUnshiftCase(next);
  if (homeKey.includes(str)) {
    className = str + " keyHome";
  } else {
    className = str;
  }
  if (lowerNext === str) {
    className = className + " next-key";
  }
  if (isUpperCase(next) && str === "left-shift") {
    className = className + " next-key";
  }
  return className;
};

export default function RightHomePosition() {
  const [keys, setKeys] = useState(rightHome66);
  const [word, setWord] = useState("`");
  const wordRef = useRef("`");
  const [wordPosition, setWordPosition] = useState(0);
  const [nextCharacter, setNextCharacter] = useState<string>("`");
  const wordNumRef = useRef(-1);
  const wordPositionRef = useRef(0);
  const isSuperRef = useRef(false);
  const [isSuper, setIsSuper] = useState(false);

  useEffect(() => {
    const downCallback = (event: KeyboardEvent) => {
      if (typeof event.key !== "string") {
        return;
      }
      if (newModifier.includes(event.key)) {
        setKeys(superRight);
        isSuperRef.current = true;
        setIsSuper(true);
        event.preventDefault();
        return;
      }
      const newKey = convertToRight(event.key, isSuperRef.current);
      if (newKey === wordRef.current[wordPositionRef.current]) {
        wordPositionRef.current = wordPositionRef.current + 1;
        setWordPosition((prev) => prev + 1);
        setNextCharacter(word[wordPosition]);
        if (wordPositionRef.current === wordRef.current.length) {
          getRandomWord(words, wordNumRef.current);
        }
      }
      setKeys(rightHome66);
      isSuperRef.current = false;
      setIsSuper(false);
      if (
        event.key !== "F12" &&
        event.key !== "Control" &&
        event.key !== "ArrowLeft"
      ) {
        event.preventDefault();
        return;
      }
    };
    const upCallback = (event: KeyboardEvent) => {
      event.preventDefault();
    };
    document.addEventListener("keydown", downCallback, false);
    document.addEventListener("keyup", upCallback, false);
    return () => {
      document.removeEventListener("keydown", downCallback, false);
      document.removeEventListener("keyup", upCallback, false);
    };
  }, []);
  const getRandomWord = (words: Array<string>, prevNums = -1) => {
    const rnd = getDifferentRandom(words, prevNums);
    wordNumRef.current = rnd;
    setWord(words[rnd]);
    wordRef.current = words[rnd];
    setWordPosition(0);
    wordPositionRef.current = 0;
    setNextCharacter(word[0]);
  };
  useEffect(() => {
    if (word.length > wordPosition) {
      setNextCharacter(
        keyNameCovertClassName(word[wordPosition] ?? "", isSuper)
      );
    }
  }, [wordPosition, word, isSuper]);

  useEffect(() => {
    getRandomWord(words);
  }, []);
  return (
    <>
      <section className="header-section">
        <h1>指の働き方を見直す・RIGHTホームポジション</h1>
      </section>
      <section>
        <p className="typing-p">{stringToSpan(word, wordPosition)}</p>
      </section>
      <section id="keyboard-base" className="keyboardBase">
        {keys.map((val: string) => {
          return (
            <div
              key={Math.random()}
              className={keyClassNameConvert(val, nextCharacter)}
            >
              {keyDisplayNameConvert(val)}
            </div>
          );
        })}
      </section>
      <section className="details-section">
        <div>
          <h1>RIGHTホームポジション(RHP)とは</h1>
          <p>
            右手小指が痛くなりやすいプログラマー用に考案したホームポジションを右に２列ずらした配列です。JIS配列での使用を想定しています。
          </p>
        </div>
        <div>
          <h2>シフト方式</h2>
          <p>
            このサイトでは前置シフト方式を採用しています。前置シフト方式ではシフトが１回しか効きません。これはJavaScriptによるシフトキーの実装が難しかったためです。試しに、ひらがなキーを押してみましょう。キーボードに記号類が表示されたと思います。この状態で記号を入力すると、元のアルファベットキーに戻ります。これはこれで初心者には易しくなるというメリットもあるのですが、移動キーとの相性が悪い、
            <a href="https://en.wikipedia.org/wiki/Modifier_key#Dual-role_keys">
              Dual-Role Keys（SandS）
            </a>
            が使えないなどの理由で、キーリマップソフトには採用しませんでした。
          </p>
        </div>
        <div>
          <h2>記号の配置</h2>
          <p>
            記号をどのように配置するのかについては使用するプログラミング言語によって変わります。
            今回のレイアウトはどちらかというとJavaScriptの使用を想定しているため、それぞれカスタマイズするのが好ましいです。
          </p>
        </div>
        <div>
          <h2>実装</h2>
          <details>
            <summary>Windows(のどか)の場合</summary>
            <p>次の設定ファイルを読み込んでください。</p>

            <p>
              include "109.mayu" <br />
              keymap Global
              <br />
              <br />
              ### 親指の設定###
              <br />
              mod mod0 += Hiragana
              <br />
              mod mod0 += NonConvert
              <br />
              <br />
              key *Hiragana = &Ignore
              <br />
              key *NonConvert = &Ignore
              <br />
              <br />
              <br />
              ###右側定義###
              <br />
              def subst *U = *LeftSquareBracket
              <br />
              def subst *I = *Y
              <br />
              def subst *O = *U
              <br />
              def subst *P = *I
              <br />
              def subst *CommercialAt = *O
              <br />
              def subst *LeftSquareBracket = *P
              <br />
              <br />
              def subst *K = *H
              <br />
              def subst *L = *J
              <br />
              def subst *Semicolon = *K
              <br />
              def subst *Colon = *L
              <br />
              def subst *RightSquareBracket = *Colon
              <br />
              <br />
              def subst *M = *HyphenMinus
              <br />
              def subst *Comma = *N
              <br />
              def subst *FullStop = *M
              <br />
              def subst *Solidus = *Comma
              <br />
              def subst *ReverseSolidus = *FullStop
              <br />
              <br />
              ###数字キーの移動###
              <br />
              def subst *_6 = *_5
              <br />
              def subst *_7 = *_6
              <br />
              def subst *_8 = *_6
              <br />
              def subst *_9 = *_7
              <br />
              def subst *_0 = *_8
              <br />
              def subst *HyphenMinus = *_9
              <br />
              def subst *CircumflexAccent = *_0
              <br />
              def subst *YenSign = *CircumflexAccent
              <br />
              <br />
              ###M0面の設定###
              <br />
              ##左側
              <br />
              key *IL-*IC-M0-Q = CommercialAt
              <br />
              key *IL-*IC-M0-W = S-YenSign
              <br />
              key *IL-*IC-M0-E = Semicolon
              <br />
              key *IL-*IC-M0-R = S-LeftSquareBracket
              <br />
              key *IL-*IC-M0-T = S-RightSquareBracket
              <br />
              <br />
              key *IL-*IC-M0-A = S-_7
              <br />
              key *IL-*IC-M0-S = S-ReverseSolidus
              <br />
              key *IL-*IC-M0-D = S-HyphenMinus
              <br />
              key *IL-*IC-M0-F = S-_8
              <br />
              key *IL-*IC-M0-G = S-_9
              <br />
              <br />
              key *IL-*IC-M0-Z = S-Semicolon
              <br />
              key *IL-*IC-M0-X = YenSign
              <br />
              key *IL-*IC-M0-C = Solidus
              <br />
              key *IL-*IC-M0-V = LeftSquareBracket
              <br />
              key *IL-*IC-M0-B = RightSquareBracket
              <br />
              <br />
              #右側
              <br />
              key *IL-*IC-M0-Y = A-S-Tab
              <br />
              key *IL-*IC-M0-U = C-S-Tab
              <br />
              key *IL-*IC-M0-I = A-Tab
              <br />
              key *IL-*IC-M0-O = C-Tab
              <br />
              key *IL-*IC-M0-P = C-F4
              <br />
              <br />
              key *IL-*IC-M0-H = Left
              <br />
              key *IL-*IC-M0-J = Down
              <br />
              key *IL-*IC-M0-K = Up
              <br />
              key *IL-*IC-M0-L = Right
              <br />
              key *IL-*IC-M0-Colon = Home S-End
              <br />
              <br />
              key *IL-*IC-M0-N = A-Left
              <br />
              key *IL-*IC-M0-M = PageDown
              <br />
              key *IL-*IC-M0-Comma = PageUp
              <br />
              key *IL-*IC-M0-FullStop = A-Right
              <br />
            </p>
          </details>
        </div>
      </section>
      <section className="footer-section">©2022 smallStall</section>
    </>
  );
}

const getDifferentRandom = (array: Array<string>, prevNum: number) => {
  let rnd: number;
  for (let i = 0; i < 10; i++) {
    rnd = Math.floor(Math.random() * array.length);
    if (rnd !== prevNum) {
      return rnd;
    }
  }
  return 0;
};

const convertToRight = (key: string, isSuper: boolean) => {
  let newKey;
  if (qwertyToRight.has(key)) {
    newKey = qwertyToRight.get(key);
  } else {
    newKey = key;
  }
  if (!isSuper || !newKey) return newKey;

  if (rightToSuper.has(newKey)) {
    return rightToSuper.get(newKey);
  } else {
    return newKey;
  }
};

const stringToSpan = (word: string, position: number) => {
  const wordArray = word.split("");
  return (
    <>
      {wordArray.map((val, index) => {
        return (
          <span className={nameWordClass(position, index)} key={Math.random()}>
            {val}
          </span>
        );
      })}
    </>
  );
};

const nameWordClass = (position: number, index: number) => {
  if (position < index) {
    return "not-yet-pos";
  } else if (position === index) {
    return "just-pos";
  } else {
    return "yet-pos";
  }
};
