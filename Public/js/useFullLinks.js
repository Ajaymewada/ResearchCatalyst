document.title = "For Authors";
const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("usefullLinks", "For Authours");
const mobilesideList = sideListCls.createMobileNav();
$(".MobileSideNavBarContainer").html(mobilesideList);
$("#sidebarnav").html(sideList);


// Usage
let sourceID1 = "ForAuthorID"
let labelText1 = "For Author" + `<span class="text-danger">*<span>`
let sourceID2 = "descriptionID"
let labelText2 = "Add Description" + `<span class="text-danger">*<span>`

const forauthor = new GenerateCkEditor();
const description = new GenerateCkEditor();

const textareaElement1 = forauthor.create(sourceID1, labelText1);
const textareaElement2 = description.create(sourceID2, labelText2);

$("#forauthorArea").html(textareaElement1);
$("#descriptionArea").html(textareaElement2);


// Initialize CKEditor on the created textarea
forauthor.initEditor(sourceID1);
description.initEditor(sourceID2);

$('#TagsID').tagEditor({
    delimiter: '', /* space and comma */
    forceLowercase: false,
}); 