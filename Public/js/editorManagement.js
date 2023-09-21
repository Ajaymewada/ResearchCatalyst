const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("mainMenu", "Editors &nbsp; Management");
$("#sidebarnav").html(sideList);

// editordatacontaierID

$(() => {
    getData();
})
var editorsListGlobal = []
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
            if (data != null && data.status == true && data.data != null) {
                let editorslist = data.data;
                editorsListGlobal = data.data
                if (editorslist.length) {
                    let editortrelem = ""
                    editorslist.forEach(editor => {
                        editortrelem += `<tr>
                                        <td class="ps-0">
                                            <div class="d-flex align-items-center">
                                                <div class="me-2 pe-1">
                                                    <img src="${editor.image}" class="rounded-circle"
                                                        width="40" height="40" alt="">
                                                </div>
                                                <div>
                                                    <h6 class="fw-semibold mb-1">${editor.name}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="mb-0 fs-3">${editor.affiliation}</p>
                                        </td>
                                        <td>
                                            <span style="cursor: pointer;" class="badge fw-semibold p-2 bg-light-primary text-primary" onclick="showEditorModalPopup('${editor._id}')"><i class="fa-solid fa-pen-to-square"></i> Modify</span>
                                        </td>
                                    </tr>`
                    });
                    $("#editordatacontaierID").html(editortrelem)
                }
            }
        })
}

function showEditorModalPopup(editorID) {
    console.log(editorID);
    let editorData = (editorsListGlobal || []).find(elem => elem._id.toString() === editorID.toString());
    $('.modal-title').text(editorData.name)
    $("#editordetailsModalID").modal('show');

}