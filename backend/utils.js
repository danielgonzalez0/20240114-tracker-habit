function util(numberOfImages, currentImage, action) {
  let newIndex = currentImage;

  if (action === "next") {
    if (currentImage + 1 === numberOfImages) {
      newIndex = 0;
    } else {
      newIndex++;
    }
  } else if (action === "previous") {
    if (currentImage - 1 === -1) {
      newIndex = numberOfImages - 1;
    } else {
      newIndex--;
    }
  }

  return newIndex;
}

function increment (length, currentItem) {

if (currentItem + 1 === length)  return 0;

const newIndex = currentItem + 1;

return newIndex 
}

function decrement (length, currentItem) {

if (currentItem - 1 === -1) return length - 1;

const newIndex = currentItem - 1;

return newIndex
}

function carrouselImageHandler (length, currentImage, action) {

  if (action === 'next') return increment(length, currentImage);

  if (action === 'previous') return decrement(length, currentImage);
}

export {util, carrouselImageHandler};