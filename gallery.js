const galleryContainer = document.getElementById("gallery-container");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeButton = document.getElementById("close-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
let currentPhotoIndex = 0;
let photosData = [];

function getPhotos() {
  fetch('https://iwsiesfgs8.execute-api.eu-west-1.amazonaws.com/default/getAllPhotosCyberman', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then((response) => response.json())
  .then((data) => {
      console.log("body", JSON.parse(data.body))
      photosData = JSON.parse(data.body);
      displayPhotos(photosData);
  })
  .catch((error) => {
      console.error(error);
  });
}

function displayPhotos(photos) {
  photos.forEach((photo, index) => {
    const image = document.createElement("img");
    image.src = photo.image_url.S;
    image.className = "gallery-image";
    image.addEventListener("click", () => openModal(photo.image_url.S, index));
    galleryContainer.appendChild(image);
  });
}

function openModal(imageUrl) {
  modalImage.src = imageUrl;
  modal.style.display = "flex";

  // Dynamically adjust modal size based on image dimensions
  const img = new Image();
  img.src = imageUrl;
  img.onload = function () {
    const aspectRatio = img.width / img.height;

    const maxWidth = window.innerWidth * 0.8; // Adjust as needed
    const maxHeight = window.innerHeight * 0.8; // Adjust as needed

    let modalWidth = img.width;
    let modalHeight = img.height;

    if (img.width > maxWidth) {
      modalWidth = maxWidth;
      modalHeight = maxWidth / aspectRatio;
    }

    if (modalHeight > maxHeight) {
      modalHeight = maxHeight;
      modalWidth = maxHeight * aspectRatio;
    }

    modalImage.style.width = `${modalWidth}px`;
    modalImage.style.height = `${modalHeight}px`;
  };
}

function navigatePhoto(direction) {
  if (direction === "prev") {
    currentPhotoIndex = (currentPhotoIndex - 1 + photosData.length) % photosData.length;
  } else if (direction === "next") {
    currentPhotoIndex = (currentPhotoIndex + 1) % photosData.length;
  }
  modalImage.src = photosData[currentPhotoIndex].image_url.S;
}

// Close modal
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Navigate to previous photo
prevButton.addEventListener("click", () => {
  navigatePhoto("prev");
});

// Navigate to next photo
nextButton.addEventListener("click", () => {
  navigatePhoto("next");
});

// Close modal on outside click
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

getPhotos();