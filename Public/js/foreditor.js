document.title = "For Editor";
const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("usefullLinks", "For Editors");
$("#sidebarnav").html(sideList);


// Usage
let sourceID1 = "ForEditorID"
let labelText1 = "For Editor" + `<span class="text-danger">*<span>`
let sourceID2 = "descriptionID"
let labelText2 = "Add Description" + `<span class="text-danger">*<span>`

const foreditor = new GenerateCkEditor();
const description = new GenerateCkEditor();

const textareaElement1 = foreditor.create(sourceID1, labelText1);
const textareaElement2 = description.create(sourceID2, labelText2);

$("#forauthorArea").html(textareaElement1);
$("#descriptionArea").html(textareaElement2);


// Initialize CKEditor on the created textarea
foreditor.initEditor(sourceID1);
description.initEditor(sourceID2);

$('#TagsID').tagEditor({
    delimiter: ' ', /* space and comma */
    forceLowercase: false,
}); 

function saveData() {

}