import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { writeFileSync } from "fs";

let data = await fetch("http://cerpenmu.com/100-cerpen-kiriman-terbaru");
data = await data.text();

let dom = new JSDOM(data);

let hasil = [];
dom.window.document
  .querySelectorAll("#content > article > strong > a")
  .forEach((x) => {
    hasil.push({
      judul: x.innerHTML,
      link: x.getAttribute("href"),
    });
  });

let hasil_author = [];
dom.window.document
  .querySelectorAll("#content > article > a[rel='tag']")
  .forEach((x) => {
    hasil_author.push({
      author: x.innerHTML,
      link_author: x.getAttribute("href"),
    });
  });
hasil_author = hasil_author.filter(
  (x) =>
    !x.author.includes("SD") &&
    !x.author.includes("SMP") &&
    !x.author.includes("SMA")
);

let baru = [];
for (let n in hasil) {
  baru.push({
    judul: hasil[n].judul,
    link: hasil[n].link,
    author: hasil_author[n].author,
    link_author: hasil_author[n].link_author,
  });
}
baru.sort((a, b) => (a.judul > b.judul ? 1 : -1));

writeFileSync("data.json", JSON.stringify(baru, null, 2));
