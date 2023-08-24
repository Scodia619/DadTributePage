import fetch, { Headers } from 'node-fetch';
import FormData from 'form-data';

document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file && file.type.startsWith('image/')) {
        await uploadFile(file);
    }
});

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