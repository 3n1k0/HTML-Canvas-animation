import backgroundImageSrc from "./images/template_0000s_0004_BG.png";
import leBronJamesSrc from "./images/template_0000s_0002_Photo.png";
import blueSmokeSrc from "./images/template_0000s_0001s_0003_Laag-8.png";
import vignetteSrc from "./images/template_0000s_0001_Schaduw.png";
import logoSrc from "./images/template_0000s_0000_CS_Logo_White.png";
import quotationMarkSrc from "./images/quotationMark.png";
import whiteSparkleSrc from "./images/sparkle.png";
import silverSparkleSrc from "./images/silver-sparkle.png";
import goldSparkle2Src from "./images/gold-sparkle-2.png";
import largeBlueSparkleSrc from "./images/large-blue-sparkle.png";
import largeGoldSparkleSrc from "./images/large-gold-sparkle.png";
import dashSrc from "./images/dash.png";
import extragoldSrc from "./images/extragold.png";
import ghostrightSrc from "./images/ghostright.png";
import ghostleftSrc from "./images/ghostleft.png";
import bluenessSrc from "./images/blueness.png";

function drawFonts(c: CanvasRenderingContext2D): void {
  c.fillStyle = "rgb(249,253,255)";
  c.font = "48px Gloss_And_Bloom";
  c.fillText("I think team first.", 92, 198);

  c.fillStyle = "rgb(249,253,255)";
  c.font = "66px FjallaOne-Regular";
  c.fillText("It allows me", 111, 266);

  c.fillStyle = "rgb(249,253,255)";
  c.font = "66px BoxedHeavy";
  c.fillText("to succeed", 198, 320);

  c.fillStyle = "rgb(249,253,255)";
  c.font = "30px Finition";
  c.fillText("Lebron James", 275, 357);
}

async function loadFonts(): Promise<void> {
  await Promise.all([
    document.fonts.load('50px "Gloss_And_Bloom"'),
    document.fonts.load('50px "FjallaOne-Regular"'),
    document.fonts.load('50px "BoxedHeavy"'),
    document.fonts.load('50px "Finition"'),
    document.fonts.load('50px "BoxedHeavy-Italic"'),
  ]);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    let image = document.createElement("img");
    image.src = src;
    image.addEventListener("load", function () {
      resolve(image);
    });
  });
}

function addCompositeOperation(
  c: CanvasRenderingContext2D,
  type: string,
  image: CanvasImageSource,
  x: number,
  y: number
) {
  c.globalCompositeOperation = type;
  c.drawImage(image, x, y);
  c.globalCompositeOperation = "source-over";
}

const renderImage = function (
  image: HTMLImageElement,
  x: number,
  y: number,
  angle: number = 0,
  scale: number = 1,
  c: CanvasRenderingContext2D
): void {
  const centerX = image.width / 2;
  const centerY = image.height / 2;
  c.save(); //saves the entire state of the canvas by pushing the current state onto a stack
  c.translate(x, y); //adds a translation transformation to the current matrix
  c.rotate(angle);
  c.scale(scale, scale);
  c.drawImage(image, -centerX, -centerY, image.width, image.height); // method of the Canvas 2D API
  c.restore(); //restores the most recently saved canvas state
};

window.addEventListener("load", async function (): Promise<void> {

  let canvas = document.querySelector("canvas");
  canvas.width = 1024;
  canvas.height = 576;

  let c = canvas.getContext("2d");

  const [
    backgroundImage,
    blueness,
    ghostright,
    ghostleft,
    whiteSparkle,
    largeBlueSparkle,
    largeGoldSparkle,
    silverSparkle2,
    blueSmoke,
    quotationMark,
    silverSparkle,
    goldSparkle2,
    leBronJames,
    extragold,
    vignette,
    logo,
    dash,
  ] = await Promise.all([
    loadImage(backgroundImageSrc),
    loadImage(bluenessSrc),
    loadImage(ghostrightSrc),
    loadImage(ghostleftSrc),
    loadImage(whiteSparkleSrc),
    loadImage(largeBlueSparkleSrc),
    loadImage(largeGoldSparkleSrc),
    loadImage(silverSparkleSrc),
    loadImage(blueSmokeSrc),
    loadImage(quotationMarkSrc),
    loadImage(silverSparkleSrc),
    loadImage(goldSparkle2Src),
    loadImage(leBronJamesSrc),
    loadImage(extragoldSrc),
    loadImage(vignetteSrc),
    loadImage(logoSrc),
    loadImage(dashSrc),
  ]);

  let counter = 0;

  await loadFonts();

  const draw = function () {
    c.drawImage(backgroundImage, 0, 0);
    c.drawImage(blueness, 205, 0);
    addCompositeOperation(c, "hard-light", ghostright, 712, 40);
    addCompositeOperation(c, "hard-light", ghostleft, 421, 87);
    addCompositeOperation(c, "overlay", whiteSparkle, 223, 159);
    c.drawImage(largeBlueSparkle, 431, 205);
    renderImage(largeGoldSparkle, 899, 446, 0, Math.sin(counter) * 3.5, c);

    c.globalCompositeOperation = "overlay";
    renderImage(silverSparkle2, 550, 555, 0, Math.sin(counter) * 6, c);
    c.globalCompositeOperation = "source-over";

    c.drawImage(blueSmoke, 273, 90);
    c.drawImage(logo, 81, 465);
    c.drawImage(quotationMark, 226, 90);
    c.drawImage(dash, 255, 351);

    renderImage(silverSparkle, 785, 229, 0, Math.sin(counter) * 3, c);

    addCompositeOperation(c, "overlay", silverSparkle2, 563, 218);
    addCompositeOperation(c, "overlay", goldSparkle2, 420, 550);

    c.drawImage(leBronJames, 455, 14);
    renderImage(extragold, 699, ((counter * 50) % 100) + 446, 0, 1, c);

    c.drawImage(vignette, 0, 0);

    drawFonts(c);

    counter += 0.004;

    window.requestAnimationFrame(draw);
  };

  draw();
});
