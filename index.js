const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const base64Data = readFileSync(path.join(__dirname, "public/docs/bmg.txt"), {
  encoding: "utf-8",
});

const getBoletoImage = async (boletoData) => {
  const { exec } = require("child_process");
  const sharp = require("sharp");

  exec(`mkdir ${__dirname}/public/pdfs ${__dirname}/public/images`);
  await sleep(100);

  const pdfFilePath = path.join(__dirname, "public/pdfs/boletoBMG.pdf");
  const pngFilePath = path.join(__dirname, "public/images/boletoBMG");

  const base64Buffer = Buffer.from(boletoData, "base64");

  writeFileSync(pdfFilePath, base64Buffer);

  exec(`pdftoppm ${pdfFilePath} ${pngFilePath} -png`);
  await sleep(300);

  const imageBuffer = readFileSync(
    path.join(__dirname, "public/images/boletoBMG-1.png")
  );

  sharp(imageBuffer)
    .extract({ left: 36, top: 1101, width: 1086, height: 580 })
    .toFile(path.join(__dirname, "public/images/boletoBMG.png"));
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

getBoletoImage(base64Data);
