document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file && file.type.startsWith('image/')) {
        await uploadFile(file);
    }
});

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)

    const responseHeaders = {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin (you can restrict this to specific origins)
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST" // Adjust based on the allowed HTTP methods
      };

    try {
        const response = await fetch('https://hgfmziogr7.execute-api.eu-west-1.amazonaws.com/default/addImageCyberman', {
            method: 'POST',
            headers: responseHeaders,
            body: formData
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}