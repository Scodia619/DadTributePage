import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require('./paultributepage-firebase-adminsdk-juhol-4a86907129.json')),
  storageBucket: 'paultributepage.appspot.com',
});

export const handler = async (event) => {
  try {
    // Handle CORS preflight request
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Adjust this to your allowed origins
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'OPTIONS, POST',
        },
        body: '',
      };
    }
    
    const bucket = admin.storage().bucket();
    
    // Parse the multipart/form-data payload
    const contentType = event.headers['content-type'];
    const boundary = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)[1];
    const parts = event.body.split(`--${boundary}`);
    
    const fileData = Buffer.from(parts[2].split('\r\n\r\n')[1], 'base64'); // Get the base64 data from the parts
    const filename = `${Date.now()}.jpg`; // Replace with your filename logic

    const file = bucket.file(filename);
    await file.save(fileData);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust this to your allowed origins
      },
      body: JSON.stringify({ message: 'File uploaded to Firebase Cloud Storage' }),
    };
  } catch (error) {
    console.error('Error uploading to Firebase Cloud Storage:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust this to your allowed origins
      },
      body: JSON.stringify({ message: 'Error uploading to Firebase Cloud Storage' }),
    };
  }
};
