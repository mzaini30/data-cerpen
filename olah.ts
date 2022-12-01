import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const filenya = Deno.args[0];
const data = Deno.readTextFileSync(filenya);
const dokumen = new DOMParser().parseFromString(data, "text/html");

const terisi = [];
dokumen?.querySelectorAll("#content > article > strong > a").forEach((x) => {
  terisi.push({
    judul: x.innerHTML,
    link: x.getAttribute("href"),
  });
});
