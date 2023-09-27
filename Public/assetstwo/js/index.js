$(document).ready(function () {
    getData();
    getCoverbanner();
    getArticles();
})

var currentPage = 1; // Initial page number

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
                $("#coverBannerImgID").attr('src', data.data.path)
            }
        })
}

function getArticles() {
    const url = '/getArticlesPaginationWise';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pageNumber: currentPage
        })
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            $(".loader").addClass('d-none');
            // $(".preloader").addClass('d-none');
            if (data != null && data.status == true && data.articles != null) {
                const totalDocuments = data.totalArticles || 0;
                const perPage = 5;
                if (currentPage === 1) {
                    paginator.initPaginator({
                        'totalPage': Math.ceil(totalDocuments / perPage),
                        'previousPage': 'Next',
                        'nextPage': 'Previous',
                        'triggerFunc': updatePaginationUI
                    });
                }
                let articleslist = data.articles;
                articlesListGlobal = data.articles;
                if (articleslist.length) {
                    let articlelem = ""
                    articleslist.forEach(article => {
                        let authorNames = ""
                        if (article && article.authorNames && article.authorNames.length) {
                            article.authorNames.forEach(author => {
                                authorNames += `<li><i class="icon-62"></i>${author}</li>`
                            })
                        }
                        articlelem += `<div class="edu-course course-style-4 course-style-8">
                                        <div class="inner">
                                            <div class="content">
                                                <h6 class="title">
                                                    <a href="fulltext.php">${article.title || ""}</a>
                                                </h6>
                                                <ul class="course-meta">
                                                    ${authorNames}
                                                </ul>
                                                <ul class="course-meta">
                                                    <li>${article.abstract || ""}</li>
                                                    <li>${article.citation || ""}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>`
                    });
                    $("#articleDataContainer").html(articlelem)
                }
            }
        })
}

function updatePaginationUI() {
    var selectdPg = $('.js-paginator').data('pageSelected');
    console.log(selectdPg);
    if (selectdPg != null) {
        currentPage = selectdPg;
        getArticles();
        $('html, body').animate({
            scrollTop: $('#articleDataContainer').offset().top - 150
        }, 500);
    }
}