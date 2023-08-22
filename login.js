var users = []

function getUsers(){

    fetch('https://4sc8zg07dc.execute-api.eu-west-1.amazonaws.com/default/getAllUsersCyberman', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("body", JSON.parse(data.body))
        users = JSON.parse(data.body);
    })
    .catch((error) => {
        console.error(error);
    });
}

function login(){
    console.log("Hello")
    users.forEach(user => {
        console.log(user)
        if(document.getElementById("email").value === user.email.S){
            const password = document.getElementById("password");
            const salt = user.salt.S;

            // Concatenate password and salt
            const data = password + salt;

            // Create a hash using SHA-256 algorithm
            const hashBuffer = crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));

            // Convert the hash buffer to a hexadecimal string
            hashBuffer.then(hashArrayBuffer => {
            const hashArray = new Uint8Array(hashArrayBuffer);
            let hashHex = '';
            hashArray.forEach(byte => {
                hashHex += byte.toString(16).padStart(2, '0');
            });
            
            console.log("Database Pass", user.password.S)
            console.log('Hashed Password:', hashHex);

            if(hashHex === user.password.S){
                sessionStorage.setItem("user", user.user.S)
                window.location.href = "index.html"
            }

            });
        }
    })
}

getUsers()