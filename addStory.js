function submitStory() {
    // This is where you can handle the form submission
    // For example, you can get the values of the inputs and perform actions

    createHash();

    let currentId = parseInt(sessionStorage.getItem("length"));
    let newId = currentId + 1;

    console.log(newId)
    
    const storyValue = document.getElementById('story').value;
    const typeValue = document.getElementById('type').value;
    
    fetch("https://urwelsydxf.execute-api.eu-west-1.amazonaws.com/default/postStoryCyberman", {
        method: "POST",
        body: JSON.stringify({
          Story: storyValue,
          Type: typeValue,
          id: newId,
          User: sessionStorage.getItem("user")
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

    // Perform actions with the values
    console.log('Story:', storyValue);
    console.log('Type:', typeValue);
}

function generateRandomSalt(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    salt = ''; // Assign to the outer salt variable
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      salt += characters.charAt(randomIndex);
    }
  
    console.log(salt); // Moved inside the function for debugging
    return salt; // Return the generated salt
  }

  function createHash() {
    const password = "robinson69";
    const generatedSalt = generateRandomSalt(16);

    // Concatenate password and salt
    const data = password + generatedSalt;

    // Create a hash using SHA-256 algorithm
    crypto.subtle.digest('SHA-256', new TextEncoder().encode(data))
        .then(hashArrayBuffer => {
            const hashArray = new Uint8Array(hashArrayBuffer);
            let hashHex = '';
            hashArray.forEach(byte => {
                hashHex += byte.toString(16).padStart(2, '0');
            });

            //console.log("Salt: ", generatedSalt);
            //console.log('Hashed Password:', hashHex);
        })
        .catch(error => {
            console.error("Error generating hash:", error);
        });
}