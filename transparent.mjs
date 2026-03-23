import { Jimp } from "jimp";

async function makeTransparent() {
  try {
    const image = await Jimp.read("public/skoolms.png");
    
    // Scan every pixel
    image.scan((x, y, idx) => {
      const red = image.bitmap.data[idx + 0];
      const green = image.bitmap.data[idx + 1];
      const blue = image.bitmap.data[idx + 2];
      
      // If color is white or close to white, make transparent
      if (red > 240 && green > 240 && blue > 240) {
        image.bitmap.data[idx + 3] = 0; // alpha = 0
      }
    });

    // Write back to a temp file, then rename it
    await image.write("public/skoolms_transparent.png");
    console.log("Processing complete!");
  } catch (error) {
    console.error("Error modifying image:", error);
  }
}

makeTransparent();
