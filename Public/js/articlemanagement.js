document.title = "Add Article";
const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("articlelinks", "Article Management");
const mobilesideList = sideListCls.createMobileNav();
$(".MobileSideNavBarContainer").html(mobilesideList);
$("#sidebarnav").html(sideList);

$('#authorNames').tagEditor({
    delimiter: '',
    forceLowercase: false,
});

let sourceID1 = "abstractionID"
let labelText1 = "Abstraction" + `<span class="text-danger">*<span>`
let sourceID2 = "citationID"
let labelText2 = "Citation" + `<span class="text-danger">*<span>`

const abstractionTextarea = new GenerateCkEditor();
const citationTextarea = new GenerateCkEditor();

const textareaElement1 = abstractionTextarea.create(sourceID1, labelText1);
const textareaElement2 = citationTextarea.create(sourceID2, labelText2);

$("#articleAbstractContainer").html(textareaElement1);
$("#articleCitationContainer").html(textareaElement2);

abstractionTextarea.initEditor(sourceID1);
citationTextarea.initEditor(sourceID2);

$(() => {
    getData();
})

var articlesListGlobal = []
function getData() {
    // $(".preloader").removeClass('d-none');
    $("#search").val("");
    $(".loader").removeClass('d-none');
    const url = '/getArticlesPaginationWise';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pageNumber: 1
        })
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            $(".loader").addClass('d-none');
            // $(".preloader").addClass('d-none');
            if (data != null && data.status == true && data.articles != null) {
                let articleslist = data.articles;
                articlesListGlobal = data.articles;
                if (articleslist.length) {
                    let articlelem = ""
                    articleslist.forEach(article => {
                        // <td>
                        //     <p class="mb-0 fs-3" style="width: 200px !important; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${article.abstract.substr(0, 30)}</p>
                        // </td>
                        articlelem += `<tr>
                                        <td class="ps-0" colspan="4">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <h6 class="fw-semibold mb-1">${article.title.substr(0, 25) }</h6>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <span style="cursor: pointer;" class="badge fw-semibold p-2 bg-light-primary text-primary" onclick="showEditorModalPopup('${article._id}')"><i class="fa-solid fa-pen-to-square"></i> Modify</span>
                                        </td>
                                    </tr>`
                    });
                    $("#articledatacontaierID").html(articlelem)
                }
            }
        })
}

function showEditorModalPopup(articleID) {
    let articleData = (articlesListGlobal || []).find(elem => elem._id.toString() === articleID.toString());
    $("#modifyEditorID").attr('editorid', `${articleData._id}`);
    $("#articleTitle").val(articleData.title);
    // $('.modal-title').text(articleData.title);
    abstractionTextarea.setValue(sourceID1, articleData.abstract);
    citationTextarea.setValue(sourceID2, articleData.citation);
    $('#authorNames').tagEditor('destroy');
    $('#authorNames').tagEditor({
        delimiter: '',
        forceLowercase: false,
        initialTags: articleData.authorNames || []
    });
    $("#articledetailsModalID").modal('show');
}

function modifyArticle() {
    let articleID = $("#modifyEditorID").attr('editorid');
    let title = $("#articleTitle").val();
    let abstract = abstractionTextarea.getData(sourceID1);
    let citation = citationTextarea.getData(sourceID2);
    let authorNames = $('#authorNames').tagEditor('getTags')[0].tags;
    if (articleID != null && articleID != "") {
        if (title == null || title == "") {
            $(".validationalert").removeClass('d-none');
            $(".validationalert").html("Enter Title!");
            return;
        } else if (abstract == null || abstract == "") {
            $(".validationalert").removeClass('d-none');
            $(".validationalert").html("Enter Abstract!");
            return;
        } else if (citation == null || citation == "") {
            $(".validationalert").removeClass('d-none');
            $(".validationalert").html("Enter Citation!");
            return;
        } else if (authorNames == null || authorNames.length == 0) {
            $(".validationalert").removeClass('d-none');
            $(".validationalert").html("Enter Author Names!");
            return;
        } else {
            let data = {
                title: title,
                abstract: abstract,
                citation: citation,
                authorNames: authorNames,
                _id: articleID
            }
            fetch('/addupdateArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((responseData) => {
                    // Handle the response data here
                    $(".validationalert").removeClass('d-none alert-danger')
                    $(".validationalert").text("Article Updated Successfully!");
                    $(".validationalert").addClass('alert-success');
                    setTimeout(() => {
                        $(".validationalert").removeClass('alert-success');
                        $(".validationalert").addClass('d-none alert-danger');
                        getData();
                        $("#articledetailsModalID").modal('hide');
                    }, 3000);
                    
                    console.log(responseData);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
}

function serachData() {
    let title = $("#search").val();
    $(".loader").removeClass('d-none');
    if (title != null && title != "") {
        let data = {
            name: title
        }
        fetch('/searchArticle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                $(".loader").addClass('d-none');
                if (data != null && data.status == true && data.articles != null) {
                    let articleslist = data.articles;
                    articlesListGlobal = data.articles;
                    if (articleslist.length) {
                        let articlelem = ""
                        articleslist.forEach(article => {
                            articlelem += `<tr>
                                        <td class="ps-0" colspan="4">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <h6 class="fw-semibold mb-1">${article.title.substr(0,30)}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span style="cursor: pointer;" class="badge fw-semibold p-2 bg-light-primary text-primary" onclick="showEditorModalPopup('${article._id}')"><i class="fa-solid fa-pen-to-square"></i> Modify</span>
                                        </td>
                                    </tr>`
                        });
                        $("#articledatacontaierID").html(articlelem)
                    }
                }
            })
    } else {
        getData();
    }
}