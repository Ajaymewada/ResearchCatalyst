document.title = "Add Article";
const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("articlelinks", "Add Article");
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

function saveData() {
    const fileInput = document.getElementById('articlePDFFile');
    const file = fileInput.files[0];
    let title = document.getElementById('articleTitle').value
    let abstract = abstractionTextarea.getData(sourceID1);
    let citation = citationTextarea.getData(sourceID2);
    let authorName = $('#authorNames').tagEditor('getTags')[0].tags;
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
    } else if (authorName == null || authorName.length == 0) {
        $(".validationalert").removeClass('d-none');
        $(".validationalert").html("Enter Author Names!");
        return;
    } else if (file == null) {
        $(".validationalert").removeClass('d-none');
        $(".validationalert").html("Select File!");
        return;
    } else {
        $(".saveinprogress").removeClass('d-none');
        const formData = new FormData();

        formData.append('files', file);
        formData.append('title', title);
        formData.append('authorNames', JSON.stringify(authorName));
        formData.append('abstract', abstract);
        formData.append('citation', citation);
        formData.append('pdffilepath', "sample.pdf");
        fetch('/addsaveArticle', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                $(".validationalert").removeClass('d-none alert-danger')
                $(".validationalert").text("Article added successfully!");
                $(".validationalert").addClass('alert-success');
                setTimeout(() => {
                    $(".validationalert").removeClass('alert-success');
                    $(".validationalert").addClass('d-none alert-danger');
                }, 3000);
                $(".saveinprogress").addClass('d-none');
                clearForm();
                console.log('Article saved:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function clearForm() {
    document.getElementById('articlePDFFile').value = "";
    document.getElementById('articleTitle').value = ""
    abstractionTextarea.setValue(sourceID1, "");
    citationTextarea.setValue(sourceID2, "");
    $('#authorNames').val("");
    $('#authorNames').tagEditor('destroy');
    $('#authorNames').tagEditor({
        delimiter: '',
        initialTags: []
    });
}
