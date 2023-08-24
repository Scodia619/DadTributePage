const container = document.getElementById("image-container")
const galleryContainer = document.getElementById("gallery-container");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeButton = document.getElementById("close-button");


function getPhotos(){

    fetch('https://iwsiesfgs8.execute-api.eu-west-1.amazonaws.com/default/getAllPhotosCyberman', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("body", JSON.parse(data.body))
        const photos = JSON.parse(data.body);
        displayPhotos(photos)
    })
    .catch((error) => {
        console.error(error);
    });
}

function displayPhotos(photos){
    photos.forEach((photo) => {
        const image = document.createElement("img");
        image.src = photo.image_url.S;
        image.className = "gallery-image";
        image.addEventListener("click", () => openModal(photo.image_url.S));
        galleryContainer.appendChild(image);
      });
}

// Open modal with clicked image
function openModal(imageUrl) {
    modalImage.src = imageUrl;
    modal.style.display = "flex";
  }
  
  // Close modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // Close modal on outside click
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

getPhotos();