import en from "./keys-en.js";
import ru from "./keys-ru.js";

const exceptionsKey = [
  "Backquote",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Digit0",
  "Minus",
  "Equal",
  "Backspace",
  "Tab",
  "BracketLeft",
  "BracketRight",
  "Backslash",
  "Delete",
  "CapsLock",
  "Semicolon",
  "Quote",
  "Enter",
  "ShiftLeft",
  "Comma",
  "Period",
  "Slash",
  "ArrowUp",
  "ShiftRight",
  "ControlLeft",
  "MetaLeft",
  "AltLeft",
  "Space",
  "AltRight",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "ControlRight",
];
const VirtualKeyboard = {
  elements: {
    main: null,
    input: null,
    keysContainer: null,
    keys: [],
    language: en,
  },

  properties: {
    capsLock: false,
    shift: false,
  },

  _init() {
    //create elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.elements.input = document.createElement("textarea");
    this.elements.main.classList.add("keyboard");
    this.elements.input.classList.add("keyboard__input");
    this.elements.input.placeholder = "Click here";
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._renderKeys());
    this.elements.keys =
        this.elements.keysContainer.querySelectorAll(".keyboard__key");

    //add to DOM
    this.elements.main.appendChild(this.elements.input);
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    //add text to input
    this.output = document.querySelector(".keyboard__input");
  },

  _renderKeys() {
    const fragment = document.createDocumentFragment();

    this.elements["language"].forEach((key) => {
      const keyboardKey = document.createElement("button");
      const addTagBr =
          ["Backspace", "Delete", "Enter", "ShiftRight"].indexOf(key["code"]) !==
          -1;
      keyboardKey.classList.add("keyboard__key");
      keyboardKey.dataset.code = key["code"];
      keyboardKey.setAttribute("type", "button");

      keyboardKey.addEventListener("click", () => {
        this._insertToInput(key["code"], keyboardKey);
      });

      //chose style to key
      switch (key["code"]) {
        case "Backspace":
          keyboardKey.classList.add("keyboard__key_large");
          keyboardKey.dataset.code = key["code"];
          keyboardKey.innerHTML = key["normal"];
          break;

        case "Tab":
          keyboardKey.classList.add("keyboard__key_tab");
          keyboardKey.dataset.code = key["code"];
          keyboardKey.innerHTML = key["normal"];
          break;

        case "Backslash":
          keyboardKey.classList.add("keyboard__key");
          keyboardKey.dataset.code = key["code"];
          keyboardKey.innerHTML = key["normal"];
          break;

        case "CapsLock":
          keyboardKey.classList.add("keyboard__key_large");
          keyboardKey.dataset.code = key["code"];
          keyboardKey.innerHTML = key["normal"];
          break;

        case "Enter":
          keyboardKey.classList.add("keyboard__key_large");
          keyboardKey.dataset.code = key["code"];
          keyboardKey.innerHTML = key["normal"];
          break;

        case "ShiftLeft":
          keyboardKey.classList.add("keyboard__key_large");
          keyboardKey.dataset.code = key["code"];
          keyboardKey.innerHTML = key["normal"];
          break;

        case "ShiftRight":
          keyboardKey.classList.add("keyboard__key_large");
          keyboardKey.dataset.code = key["code"];
          keyboardKey.innerHTML = key["normal"];
          break;

        case "Space":
          keyboardKey.classList.add("keyboard__key_largest");
          keyboardKey.dataset.code = key["code"];
          keyboardKey.innerHTML = key["normal"];
          break;

        default:
          keyboardKey.innerHTML = key["normal"];
          break;
      }

      fragment.appendChild(keyboardKey);

      if (addTagBr) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  //pressing a key on a physical keyboard highlights the key on the virtual keyboard
  _handleEvent(e) {
    e.preventDefault();
    let pressedBtn;
    for (let i = 0; i < this.elements.keys.length; i++) {
      if (this.elements.keys[i].dataset.code === e.code) {
        pressedBtn = this.elements.keys[i];
        break;
      }
    }
    this._illuminateBtn(e, pressedBtn);
    if (e.type === "keydown") {
      this._insertToInput(e.code, pressedBtn);
    }
  },

  //illuminate pressed button
  _illuminateBtn(e, pressedBtn) {
    if (e.type === "keydown") {
      if (pressedBtn) pressedBtn.classList.add("_active");
    } else {
      if (pressedBtn) pressedBtn.classList.remove("_active");
    }
  },

  //press buttons on virtual or physical keyboard
  _insertToInput(code, pressedBtn) {
    let cursorPosition = this.output.selectionStart;
    const left = this.output.value.slice(0, cursorPosition);
    const right = this.output.value.slice(cursorPosition);

    switch (code) {
      case "Backspace":
        this.output.value = `${left.slice(0, -1)}${right}`;
        cursorPosition -= 1;
        this.output.focus();
        break;

      case "Delete":
        this.output.value = `${left}${right.slice(1)}`;
        this.output.focus();
        break;

      case "Tab":
        this.output.value = `${left}\t${right}`;
        cursorPosition += 1;
        this.output.focus();
        break;

      case "CapsLock":
        this._keyCapsLock();
        pressedBtn.classList.toggle("_hold-active");
        this.output.focus();
        break;

      case "Enter":
        this.output.value = `${left}\n${right}`;
        cursorPosition += 1;
        this.output.focus();
        break;

      case "Space":
        this.output.value = `${left} ${right}`;
        cursorPosition += 1;
        this.output.focus();
        break;

      case "ArrowLeft":
        cursorPosition = cursorPosition - 1 >= 0 ? cursorPosition - 1 : 0;
        this.output.focus();
        break;

      case "ArrowRight":
        cursorPosition += 1;
        this.output.focus();
        break;

      case "ArrowUp":
        cursorPosition = this._arrowUp(cursorPosition);
        this.output.focus();
        break;

      case "ArrowDown":
        cursorPosition = this._arrowDown(cursorPosition);
        this.output.focus();
        break;

      default:
        cursorPosition += 1;
        if (pressedBtn)
          this.output.value = `${left}${pressedBtn.innerHTML || ""}${right}`;
        this.output.focus();
        break;
    }

    this.output.setSelectionRange(cursorPosition, cursorPosition);
  },

  _keyCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (!exceptionsKey.includes(key.dataset.code)) {
        if (this.properties.capsLock) {
          if (this.properties.shift) {
            key.innerHTML = key.textContent.toLowerCase();
          } else {
            key.innerHTML = key.textContent.toUpperCase();
          }
        } else {
          key.innerHTML = key.textContent.toLowerCase();
        }
      }
    }
  },

  _arrowUp(cursorPosition) {
    let lines = this.output.value.split("\n");
    let currentLineIndex = this._getCurrentLineIndex();
    let currentCursorIndexInLine = this._getCursorPosInLine();
    if (currentLineIndex > 0) {
      // Перемещаем курсор на строку выше
      if (
          lines[currentLineIndex].length < lines[currentLineIndex - 1].length &&
          currentCursorIndexInLine === lines[currentLineIndex].length
      ) {
        cursorPosition =
            cursorPosition -
            1 -
            currentCursorIndexInLine -
            (lines[currentLineIndex - 1].length - currentCursorIndexInLine);
      } else if (
          lines[currentLineIndex].length > lines[currentLineIndex - 1].length &&
          currentCursorIndexInLine === lines[currentLineIndex].length &&
          lines[currentLineIndex - 1].length !== 0
      ) {
        cursorPosition = cursorPosition - lines[currentLineIndex].length - 1;
      } else if (
          currentCursorIndexInLine !== lines[currentLineIndex].length &&
          lines[currentLineIndex - 1].length !== 0 &&
          currentCursorIndexInLine < lines[currentLineIndex - 1].length
      ) {
        cursorPosition =
            cursorPosition -
            1 -
            currentCursorIndexInLine -
            (lines[currentLineIndex - 1].length - currentCursorIndexInLine);
      } else if (
          currentCursorIndexInLine !== lines[currentLineIndex].length &&
          lines[currentLineIndex - 1].length !== 0 &&
          currentCursorIndexInLine > lines[currentLineIndex - 1].length
      ) {
        cursorPosition = cursorPosition - 1 - currentCursorIndexInLine;
      } else if (lines[currentLineIndex - 1].length === 0) {
        cursorPosition = cursorPosition - currentCursorIndexInLine - 1;
      } else if (
          currentCursorIndexInLine === lines[currentLineIndex - 1].length
      ) {
        cursorPosition = cursorPosition - currentCursorIndexInLine - 1;
      } else if (cursorPosition < 0) {
        cursorPosition = 0;
      }
    }
    return cursorPosition;
  },

  _arrowDown(cursorPosition) {
    let lines = this.output.value.split("\n");
    let currentLineIndex = this._getCurrentLineIndex();
    let currentCursorIndexInLine = this._getCursorPosInLine();
    if (currentLineIndex < lines.length - 1) {
      // Перемещаем курсор на строку ниже
      if (
          lines[currentLineIndex].length < lines[currentLineIndex + 1].length &&
          currentCursorIndexInLine === lines[currentLineIndex].length
      ) {
        cursorPosition = cursorPosition + currentCursorIndexInLine + 1;
      } else if (
          currentCursorIndexInLine === lines[currentLineIndex + 1].length
      ) {
        cursorPosition =
            cursorPosition +
            1 +
            (lines[currentLineIndex].length - currentCursorIndexInLine) +
            lines[currentLineIndex + 1].length;
      } else if (
          lines[currentLineIndex].length > lines[currentLineIndex + 1].length &&
          currentCursorIndexInLine === lines[currentLineIndex].length &&
          lines[currentLineIndex + 1].length !== 0
      ) {
        cursorPosition =
            cursorPosition + lines[currentLineIndex + 1].length + 1;
      } else if (
          currentCursorIndexInLine !== lines[currentLineIndex].length &&
          lines[currentLineIndex + 1].length !== 0 &&
          currentCursorIndexInLine < lines[currentLineIndex + 1].length
      ) {
        cursorPosition =
            cursorPosition +
            1 +
            currentCursorIndexInLine +
            (lines[currentLineIndex].length - currentCursorIndexInLine);
      } else if (
          currentCursorIndexInLine !== lines[currentLineIndex].length &&
          lines[currentLineIndex + 1].length !== 0 &&
          currentCursorIndexInLine > lines[currentLineIndex + 1].length
      ) {
        cursorPosition =
            cursorPosition +
            1 +
            (lines[currentLineIndex].length - currentCursorIndexInLine) +
            lines[currentLineIndex + 1].length;
      } else if (lines[currentLineIndex + 1].length === 0) {
        cursorPosition =
            cursorPosition +
            (lines[currentLineIndex].length - currentCursorIndexInLine) +
            1;
      } else if (
          currentCursorIndexInLine === lines[currentLineIndex + 1].length
      ) {
        cursorPosition = cursorPosition + currentCursorIndexInLine + 1;
      } else if (cursorPosition === lines.length - 1) {
        cursorPosition = lines.length - 2;
      }
    }
    return cursorPosition;
  },

  _getCurrentLineIndex() {
    let lines = this.output.value.split("\n");
    let cursorPosition = this.output.selectionStart;
    let currentLineIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (cursorPosition <= lines[i].length) {
        currentLineIndex = i;
        break;
      }
      cursorPosition -= lines[i].length + 1;
    }
    return currentLineIndex;
  },
  _getCursorPosInLine() {
    const cursorPosition = this.output.selectionStart;
    const value = this.output.value.slice(0, cursorPosition);
    const lineBreakPos = value.lastIndexOf("\n");

    return lineBreakPos === -1
        ? cursorPosition
        : cursorPosition - lineBreakPos - 1;
  },
};
window.addEventListener("DOMContentLoaded", function () {
  VirtualKeyboard._init();
});
document.addEventListener(
    "keydown",
    VirtualKeyboard._handleEvent.bind(VirtualKeyboard)
);
document.addEventListener(
    "keyup",
    VirtualKeyboard._handleEvent.bind(VirtualKeyboard)
);
