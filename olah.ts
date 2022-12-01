// import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { DOMParser } from "https://esm.sh/linkedom";

const filenya = Deno.args[0];
const data = Deno.readTextFileSync(filenya);
const dokumen = new DOMParser().parseFromString(data, "text/html");

type Terisi = {
  judul: string,
  link: string,
};
const terisi: Array<Terisi> = [];
dokumen?.querySelectorAll("#content > article > strong > a").forEach((x) => {
  terisi.push({
    judul: x.innerHTML,
    link: x.getAttribute("href"),
  });
});
// console.log(terisi.length);

let terisi_author: Terisi[] = [];
dokumen?.querySelectorAll("#content > article > a[rel='tag']").forEach((x) => {
  terisi_author.push({
    judul: x.innerHTML,
    link: x.getAttribute("href"),
  });
});
terisi_author = terisi_author.filter(
  (x) =>
    !x.judul.includes("SD") &&
    !x.judul.includes("SMP") &&
    !x.judul.includes("SMA")
);
// console.log(terisi_author);

const baru = [];
for (const n in terisi) {
  baru.push({
    judul: terisi[n].judul,
    link: terisi[n].link,
    author: terisi_author[n].judul,
    link_author: terisi_author[n].link,
  });
}
// console.log(baru);

baru.sort((a, b) => (a.judul > b.judul ? 1 : -1));
Deno.writeTextFileSync("data.json", JSON.stringify(baru, null, 2));
