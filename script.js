const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "zPrUVMBwwrQQk2_oujux-ihjqkTB9OarOjF5MkxrT50";
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//Load load
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//Helper Function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create element for link and photos
function displayPhotos() {
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event listener , check when each load is finished
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from splash API
async function getPhotos() {
  try {
    const response = await fetch(ApiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch Error
  }
}
//check to see if scrolling near bottom of page,loads more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

///On Load
getPhotos();
