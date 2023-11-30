$(() => {
    getData();
})
function getData() {
    const url = '/getFirstReviewerDocument';
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(async data => {
            // console.log(data)
            if (data && data !== null) {
                const { keywords, name, title } = data;
                $("#forReviewersContainer").html(name || "");
                document.title = title || "For Reviewers";
            }
        })
}