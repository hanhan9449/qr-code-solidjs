import type { Component } from "solid-js";
import { QrCode } from "./components/QrCode";
import { createSignal, onMount } from "solid-js";
import copy from "copy-to-clipboard";
import { mergeClasses } from "@hanhan9449/utils";
import { atom } from "./atom-css";
import {JBColumn, JBButton, JBTextarea, JBRow} from "@hanhan9449/solidjs-ui";
import "@hanhan9449/solidjs-ui/style.css";
import {toCanvas, toDataURL} from "qrcode";

const App: Component = () => {
  const [input, setInput] = createSignal("");
  onMount(() => {
    const u = new URL(location.href);
    let share = u.searchParams.get("share");
    console.log("share", share);
    if (share) {
      setInput(share);
    }
  });
  let canvasEl = document.createElement('canvas')
  return (
    <div
        class={mergeClasses(
            atom.overflowAuto,
            atom.paddingLeft12px
        )}
    >
      <h2>二维码生成</h2>
        <JBColumn space={4}>

      <div>
        <JBTextarea
          class={mergeClasses(
            atom.width500px,
            atom.fontSize20px,
            atom.fontFamilySanSerif
          )}
          value={input()}
          onInput={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div>
          <JBRow space={4} >

        <JBButton
          onClick={() => {
            copy(input());
          }}
        >
          Copy Text
        </JBButton>
          <JBButton onClick={async () => {
              canvasEl.toBlob(blob => {
                  if (blob) {
                      navigator.clipboard.write([
                          new ClipboardItem({
                              "image/png": blob
                          })
                      ])
                  }
              })
          }}>
              Copy Image
          </JBButton>
        <JBButton
          onClick={() => {
            const u = new URL(location.href);
            u.searchParams.set("share", input());
            copy(String(u));
          }}
        >
          Share Config link
        </JBButton>
          </JBRow>
      </div>
      <div>
        <QrCode value={input()} canvas={canvasEl} />
      </div>
        </JBColumn>
    </div>
  );
};

export default App;
