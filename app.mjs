// import fetch from "node-fetch";
import { writeFileSync } from "fs";
import { randomUUID } from "crypto";

writeFileSync("halo.txt", randomUUID());
