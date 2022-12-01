import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const filenya = Deno.args[0];
const data = Deno.readTextFileSync(filenya);
const dokumen = new DOMParser().parseFromString(data, "text/html");

const judul = dokumen
  .querySelectorAll("#content > article > strong > a")
  .forEach((x) => console.log(x.innerHTML));
