$(document).ready(function () {
    getData();
    getCoverbanner();
})
function getData() {
    const url = '/getjournal';

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if (data && data.status == true) {
                // console.log(data);
                const { about, issn, name } = data.data
                $("#journaltitlecontainerID span").text(name || "");
                $("#journaltitlecontainerID h4").text(issn || "");
                $("#journalaboutID").html(about || "")
            }
        })
}

function getCoverbanner() {
    
    const url = '/getcoverbanner';

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data && data.status == true) {
                console.log(data);
                $("#coverBannerImgID").attr('src',data.data.path)
            }
        })
}