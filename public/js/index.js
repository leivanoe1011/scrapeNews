


function createScrappedDocuments(){

    var urlPath = "/scrape";
    var ajaxType = "GET";

    $.ajax({
        url: urlPath,
        type: ajaxType,
        success: function(response){

            // Need to add Modal Here
            location.reload();

        }
    })

}

function displayScrappedDocuments(result){

    $("#divContent").empty();

    var data = result;     

    for(var i = 0; i < data.length; i++){

        var row = $("<div>");
        
        $(row).addClass("row article_row shadow-lg p-3 mb-5 bg-white rounded");

        var topCol = $("<div>");
        var topRow = $("<div>");

        var bottomCol = $("<div>");
        var bottomRow = $("<div>");

        
        var articleTitle = $("<a>");
        
        $(articleTitle).addClass("col-lg-10");

        $(articleTitle).text(data[i].title);

        $(articleTitle).attr("href", data[i].link);


        var saveArticleDiv = $("<div>");
        $(saveArticleDiv).addClass("col-lg-2");

        var saveArticle = $("<a>");

        $(saveArticle).addClass("btn btn-lg btn-primary save-btn");

        $(saveArticle).attr("type","button");

        $(saveArticle).text("Save Article");

        $(saveArticle).attr("obj_id",data[i]._id);

        $(saveArticleDiv).append(saveArticle);


        $(topCol).addClass("col-12 article-top-col");
        $(topRow).addClass("row");

        $(topRow).append(articleTitle);
        $(topRow).append(saveArticleDiv);
        $(topCol).append(topRow);
        


        var articleSummary = $("<span>");
        
        $(articleSummary).addClass("col-10");
        
        $(articleSummary).text(data[i].summary);


        $(bottomRow).addClass("row");
        $(bottomRow).append(articleSummary);

        $(bottomCol).addClass("col-12 article-bottom-col shadow-lg p-3 bg-white rounded");
        $(bottomCol).append(bottomRow);

        
        $(row).append(topCol);
        $(row).append(bottomCol);
        
        $("#divContent").append(row);

    }

    
    // location.reload();

}

function noScrappedDocuments(){

    var row = $("<div>");
    
    $(row).addClass("row");

    var div = $("<div>");
    
    $(div).addClass("col-12");

    $(div).attr("id","noArticlesDisplay");

    $(div).text("Uh Oh. Looks like we don't have any new articles");


    $(row).append(div);
    $("#divContent").append(row);


}


function getArticles(){

    var urlPath = "/articles";
    var ajaxType = "GET";

    $.ajax({
        url: urlPath,
        type: ajaxType,
        success: function(response){

            if(response.length > 0){

                displayScrappedDocuments(response);

            }
            else{

                noScrappedDocuments();

            }
            
        }
    })
    
}


$(document).ready(function(){
            
    getArticles();

    $("#savedArticleLink").removeClass('active');
    $("#homeNavLi").addClass("active");
});


$(document).on("click","#ScrapeNaveLink", function(event){
    
    event.preventDefault();

    createScrappedDocuments();
    
})

$(document).on("click",".save-btn", function(event){

    var currentBtn = $(this);

    var mongId = $(currentBtn).attr("obj_id");

    var obj = {id: mongId};

    var urlPath = "/savearticle";
    var ajaxType = "POST";

    $.ajax({
        url: urlPath,
        type: ajaxType,
        data: obj,
        success: function(response){
        }
    });

});


