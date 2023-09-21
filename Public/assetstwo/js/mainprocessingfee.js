$(() => {
    getData();
})
function getData() {
    const url = '/getProcessingCharge';
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
            if (data && data.status == true && data.data != null) {
                const { processingcharge, description, keywords } = data.data;
                $("#processing_charge_Container").html(processingcharge || "");
            }
        })
}

$(document).ready(function () {
    getData2();
    getCoverbanner();
})
function getData2() {
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
                $("#coverBannerImgID").attr('src', data.data.path)
            }
        })
}