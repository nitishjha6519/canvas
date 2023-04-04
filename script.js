const canvas = document.getElementById("canvas1");

//access canvas 2d API Object
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 450;

//document.createElement('img')
const image1 = new Image();

image1.src = "./img/man.png";
//or convert image to 64 base if cross origin error
// ctx.drawImage(image1, 0, 0);
//0,0 is starting coordinate
//drawImage() loads faster than image1 hence it should be loaded when image is loaded

image1.addEventListener("load", () => {
  //4th and 5th arg is width and height of image
  //   ctx.drawImage(image1, 0, 0, canvas.width /2 , canvas.height / 2);

  //cover start
  console.log(image1.width);
  console.log(image1.height);
  var wrh = image1.width / image1.height;
  console.log({ wrh });
  var newWidth = canvas.width;
  console.log({ newWidth });

  //calculating height of new image based on ratio of original image
  //height was smaller so new height would alos be smaller based on ratio
  var newHeight = canvas.width / wrh;
  console.log({ newHeight });

  if (newHeight < canvas.height) {
    newHeight = canvas.height;
    newWidth = newHeight * ratio;
  }
  const xOffset = newWidth > canvas.width ? (canvas.width - newWidth) / 2 : 0;
  const yOffset =
    newHeight > canvas.height ? (canvas.height - newHeight) / 2 : 0;

  //  cover end

  ctx.drawImage(image1, xOffset, yOffset, newWidth, newHeight);

  // get pixel data
  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scannedData = scannedImage.data;
  for (let i = 0; i < scannedData.length; i += 4) {
    //converting to gray scale
    let total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];

    scannedData[i] = total / 3;
    scannedData[i + 1] = total / 3;
    scannedData[i + 2] = total / 3;
  }

  scannedImage.data = scannedData;

  ctx.putImageData(scannedImage, 0, 0);
});
