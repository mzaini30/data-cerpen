import { readFileSync, writeFileSync } from "fs";
import dom_parser from "dom-parser";

const { DOMParser } = dom_parser;

const filenya = process.argv[0];
const data = readFileSync(filenya);
const dokumen = new DOMParser().parseFromString(data, "text/html");

const terisi = [];
dokumen?.querySelectorAll("#content > article > strong > a").forEach((x) => {
  terisi.push({
    judul: x.innerHTML,
    link: x.getAttribute("href"),
  });
});
// console.log(terisi.length);

let terisi_author = [];
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
writeFileSync("data.json", JSON.stringify(baru, null, 2));
