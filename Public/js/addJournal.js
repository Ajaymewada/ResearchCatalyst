
$(document).ready(async function () {
    console.log("ready!");
    await getData();
});

// Usage
let sourceID1 = "aboutJournalID"
let labelText1 = "About Journal" + `<span class="text-danger">*<span>`
var aboutjournal;
var textareaElement1;
function ckEditorEmbark() {
    aboutjournal = new GenerateCkEditor();
    textareaElement1 = aboutjournal.create(sourceID1, labelText1);
    $("#aboutJournalContainer").html(textareaElement1);
    aboutjournal.initEditor(sourceID1);
}

const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("mainMenu", "Add Journal");
const mobilesideList = sideListCls.createMobileNav();
$(".MobileSideNavBarContainer").html(mobilesideList);
$("#sidebarnav").html(sideList);
document.title = "Journal";

function saveData() {
    let about = aboutjournal.getData(sourceID1)
    let name = document.getElementById("journalTitle").value;
    let ISSN = document.getElementById("issnNumber").value;
    if (name == null || name == "") {
        console.log("Enter Name!");
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter Journal Title!");
        return;
    } else if (ISSN == null || ISSN == "") {
        console.log("Enter ISSN!");
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter Journal ISSN!");
        return;
    } else if (about == null || about == "") {
        console.log("Enter about!");
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter About Journal!");
        return;
    } else {
        $(".validationalert").addClass('d-none');
        console.log(name, about, ISSN);
        const dataToSend = {
            name: name,
            issn: ISSN,
            about: about,
            description: "Description of the journal...",
            keywords: ["keyword1", "keyword2"],
            coverbanner: "uploads/example.png"
        };

        const url = '/addjournal';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        };

        // Send the POST request
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to add journal');
                }
            })
            .then(data => {
                $(".validationalert").removeClass('d-none alert-danger')
                $(".validationalert").text("Journal added successfully!");
                $(".validationalert").addClass('alert-success');
                document.getElementById("journalTitle").value = "";
                document.getElementById("issnNumber").value = "";
                aboutjournal.setValue(sourceID1, "");
                getData();
                setTimeout(() => {
                    $(".validationalert").removeClass('alert-success');
                    $(".validationalert").addClass('d-none alert-danger');
                }, 3000);
                console.log('Journal added successfully:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

}

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
        .then(async data => {
            console.log(data)
            if (data && data.status == true) {
                await ckEditorEmbark();
                const { about, issn, name } = data.data
                document.getElementById("journalTitle").value = name;
                document.getElementById("issnNumber").value = issn;
                aboutjournal.setValue(sourceID1, about);
                // $("#issnNumber").prop('disabled', true);
            } else{
                await ckEditorEmbark();
            }
        })
}

// let sourceID2 = "descriptionID"
// let labelText2 = "Add Description" + `<span class="text-danger">*<span>`
// const description = new GenerateCkEditor();
// const textareaElement2 = description.create(sourceID2, labelText2);
// $("#descriptionArea").html(textareaElement2);
// Initialize CKEditor on the created textarea
// description.initEditor(sourceID2);