var stories = [];

function getStories(){

    var tableBody = document.getElementById("table-body")

    fetch("https://n6taaz4qh4.execute-api.eu-west-1.amazonaws.com/default/getAllStoriesCyberman", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(dataArray => {
        // Handle the response data for completed status
        stories = dataArray
        sessionStorage.setItem("length", stories.length)
        stories.forEach(story => {
            tableBody.innerHTML += `
            <tr>
                <td>${story.id.N}</td>
                <td>${story.Story.S}</td>
                <td>${story.Type.S}</td>
                <td>${story.User.S}</td>
            </tr>`;
        });
    })
    .catch(error => {
        console.error(error);
    });
}

getStories();