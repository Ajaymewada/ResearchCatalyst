document.title = "Aims And Scope";
const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("mainMenu", "Aims and Scope");
$("#sidebarnav").html(sideList);

// Usage
let sourceID1 = "aimsAndScopeID"
let labelText1 = "Aim's And Scope" + `<span class="text-danger">*<span>`
let sourceID2 = "descriptionID"
let labelText2 = "Add Description" + `<span class="text-danger">*<span>`

const aimscope = new GenerateCkEditor();
const description = new GenerateCkEditor();

const textareaElement1 = aimscope.create(sourceID1, labelText1);
const textareaElement2 = description.create(sourceID2, labelText2);

$("#aimsscopeArea").html(textareaElement1);
$("#descriptionArea").html(textareaElement2);


// Initialize CKEditor on the created textarea
aimscope.initEditor(sourceID1);
description.initEditor(sourceID2);


$('#TagsID').tagEditor({
    delimiter: ' ', /* space and comma */
    forceLowercase: false,
});
$(() => {
    getData();
})
function getData() {
    const url = '/getaims-and-scope';
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
                const { aimsandscope, keywords } = data.data
                aimscope.setValue(sourceID1, aimsandscope || "");
                description.setValue(sourceID2, data.data.description || "");
                if (keywords && Array.isArray(keywords) && keywords.length) {
                    $('#TagsID').tagEditor('destroy');
                    $('#TagsID').tagEditor({
                        delimiter: ' ', /* space and comma */
                        forceLowercase: false,
                        initialTags: keywords
                    });
                }
            }
        })
}

function saveData() {
    // Create an object with the data you want to send in the request body
    let aimscope1 = aimscope.getData(sourceID1);
    let description1 = description.getData(sourceID2);
    let keywords = $('#TagsID').tagEditor('getTags')[0].tags;
    if (aimscope1 == null || aimscope1 == "") {
        console.log("Enter aimscope");
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter Aim's And Scope");
        return;
    } else if (description1 == null || description1 == "") {
        console.log("Enter description");
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter Description");
        return;
    } else if (keywords == null || keywords.length == 0) {
        console.log("Enter Keywords");
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter Keywords");
        return;
    } else {
        $(".validationalert").addClass('d-none');
        console.log(aimscope1, description1, keywords)
        const data = {
            aimsandscope: aimscope1,
            description: description1,
            keywords: keywords,
        };
        fetch('/aimsandscope', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to add aims and scope');
                }
            })
            .then(data => {
                // Handle the response data here (e.g., show a success message)
                $(".validationalert").removeClass('d-none alert-danger')
                $(".validationalert").text("Aims And Scope added successfully!");
                $(".validationalert").addClass('alert-success');
                setTimeout(() => {
                    $(".validationalert").removeClass('alert-success');
                    $(".validationalert").addClass('d-none alert-danger');
                }, 3000);
                console.log('Aims and scope added successfully', data);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('Error adding aims and scope:', error);
            });
    }
}