export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && line !== "") {
      lines.push(line.trim());
      line = `${word} `;
    } else {
      line = testLine;
    }
  });

  lines.push(line.trim());
  return lines;
}

export function downloadTextAsImage(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  textToDownload: string,
  fileName: string,
  imageUrls: Array<string>
) {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const lineHeight = 20;

  ctx.fillStyle = "rgb(160 160 160)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const lines = textToDownload.split("\n");

  lines.forEach((line, index) => {
    ctx.fillStyle = "black";
    const maxWidth = canvasWidth - 110;
    const x = 10;
    const y = (index + 1) * lineHeight;
    ctx.fillText(line, x, y, maxWidth);
    // // for urdu text.
    // ctx.textAlign = "end";
    // ctx.direction = "rtl";
    // ctx.fillText(line, 110, y, maxWidth);
  });

  const loadImages = imageUrls.map((imageUrl, indx) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const xValue = canvasWidth - 105;
        const yValue = 20 + indx * 250;
        const logoWidth = 90;
        const logoHeight = 90;
        ctx.drawImage(img, xValue, yValue, logoWidth, logoHeight);
        // // for urdu text image
        // ctx.drawImage(img, 10, yValue, logoWidth, logoHeight);
        resolve(img);
      };
      img.onerror = () => {
        console.error(`Error loading image at URL: ${imageUrl}`);
        resolve(img);
      };
      img.src = imageUrls[indx];
    });
  });

  Promise.all(loadImages)
    .then(() => {
      // Create a download link and trigger the download
      const image = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = image;
      link.download = fileName.replace(".png", ".jpg");
      link.click();
    })
    .catch((error) => {
      console.error("Error during image processing", error);
    });
}
