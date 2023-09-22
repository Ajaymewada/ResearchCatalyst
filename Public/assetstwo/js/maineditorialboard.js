$(() => {
    getData();
})
var EditorialBoardMembers = []
function getData() {
    const url = '/getEditorialBoard';
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
            if (data && data.status == true && data.data != null && data.data.length) {
                EditorialBoardMembers = data.data;
                let editorCard = ""
                data.data.forEach(editor => {
                    const { name, image, affiliation, description, biography, keywords } = editor;
                    editorCard += `<div class="col-lg-3 col-sm-6 col-12 mb--10 sal-animate"
                                                                data-sal-delay="150" data-sal="slide-up"
                                                                data-sal-duration="800">
                                                                <div class="edu-team-grid team-style-1">
                                                                    <div class="inner">
                                                                        <div class="thumbnail-wrap" style="display: flex; flex-direction: column; align-items: center;">
                                                                            <div class="thumbnail editorialThumb">
                                                                                <a href="team-details.html"
                                                                                    class="rounded-circle"
                                                                                    style="width: 100%;">
                                                                                    <img style="width:138px;height:138px;" src="${image}"
                                                                                        class="img-fluid rounded-circle"
                                                                                        alt="team images">
                                                                                </a>
                                                                            </div>

                                                                            <div class="content">
                                                                                <h5 class="title" title="${name}">${name}</h5>
                                                                                <span class="designation">${affiliation}</span>
                                                                                <button type="button" 
                                                                                class="btn bg-primarycolor text-white"
                                                                                onclick="openBiography('${editor._id}')"
                                                                                style="font-size: 15px;">Biography</button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>`
                })
                $("#editorial_board_Container").html(editorCard || "");
            }
        })
}

function openBiography(dataId) {
    console.log("sdncvsdcghs");
    if (EditorialBoardMembers.length){
        let editor = EditorialBoardMembers.find(x => x._id.toString() == dataId.toString());
        console.log(editor);
        $("#editorBiography").modal("show");
        $("#editorBiographyBody").html(editor.biography);
    }
}

function closeBiographyModel() {
    $("#editorBiography").modal("hide");
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
