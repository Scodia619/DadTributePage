import fetch, { Headers } from 'node-fetch';
import FormData from 'form-data';

var database_length = 0

const clientId = 'e00941d8be23862'; // Replace with your actual client ID

async function uploadImage(imageData) {
  const url = 'https://api.imgur.com/3/upload';
  const headers = new Headers();
  headers.append('Authorization', `Client-ID ${clientId}`);

  const formData = new FormData();
  formData.append('image', imageData);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData
    });

    const responseData = await response.json();
    console.log('Image uploaded to Imgur:', responseData.data.link);
    writeToDynamo(responseData.data.link)
    return responseData.data.link;
  } catch (error) {
    console.error('Error uploading image to Imgur:', error);
    return null;
  }
}

async function uploadFile(file) {
  const reader = new FileReader();

  reader.onload = async (event) => {
    const imageData = event.target.result;
    await uploadImage(imageData);
  };

  reader.readAsDataURL(file);
}

function writeToDynamo(link){

  const id = database_length + 1

  fetch("https://urwelsydxf.execute-api.eu-west-1.amazonaws.com/default/postStoryCyberman", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          image_url: link
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log(res);
            return res.json();
          }
          throw new Error("Request failed!");
        })
        .then((data) => {
          //window.location.reload();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
}

function getLength(){
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
        database_length = photos.length;
        console.log(database_length);
    })
    .catch((error) => {
        console.error(error);
    });
}

getLength()

document.getElementById('upload-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  await getLength();

  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  if (file && file.type.startsWith('image/')) {
      await uploadFile(file);
  }
});