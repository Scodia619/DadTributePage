const axios = require('axios');

document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file && file.type.startsWith('image/')) {
        await uploadFile(file);
    }
});

const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual client ID

async function uploadImage(imageData) {
  const url = 'https://api.imgur.com/3/upload';
  const headers = {
    Authorization: `Client-ID ${clientId}`,
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();
  formData.append('image', imageData);

  try {
    const response = await axios.post(url, formData, { headers });
    console.log('Image uploaded to Imgur:', response.data);
    return response.data.data.link;
  } catch (error) {
    console.error('Error uploading image to Imgur:', error);
    return null;
  }
}

// Usage example
const fs = require('fs');
const imageBuffer = fs.readFileSync('path/to/your/image.jpg');
uploadImage(imageBuffer);