import en from "./keys-en.js";
import ru from "./keys-ru.js";

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

  init() {
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
  handleEvent(e) {
    e.preventDefault();
    let pressedBtn;
    for (let i = 0; i < this.elements.keys.length; i++) {
      if (this.elements.keys[i].dataset.code === e.code) {
        pressedBtn = this.elements.keys[i];
        break;
      }
    }
    this.illuminateBtn(e, pressedBtn);
  },

  //illuminate pressed button
  illuminateBtn(e, pressedBtn) {
    if (e.type === "keydown") {
      if (pressedBtn) pressedBtn.classList.add("_active");
    } else {
      if (pressedBtn) pressedBtn.classList.remove("_active");
    }
  },
};
window.addEventListener("DOMContentLoaded", function () {
  VirtualKeyboard.init();
});
document.addEventListener(
  "keydown",
  VirtualKeyboard.handleEvent.bind(VirtualKeyboard)
);
document.addEventListener(
  "keyup",
  VirtualKeyboard.handleEvent.bind(VirtualKeyboard)
);
