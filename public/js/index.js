


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
        
        $(row).addClass("row article_row");

        
        
        var articleTitle = $("<a>");
        
        $(articleTitle).addClass("col-lg-10");

        $(articleTitle).text(data[i].title);

        $(articleTitle).attr("href", data[i].link);


        var saveArticle = $("<a>");

        $(saveArticle).addClass("btn btn-light col-lg-2 btn-lg save-btn");

        $(saveArticle).attr("type","button");

        $(saveArticle).text("SAVE");

        $(saveArticle).attr("obj_id",data[i]._id);


        var articleSummary = $("<span>");
        
        $(articleSummary).addClass("col-10");
        
        $(articleSummary).text(data[i].summary);


        $(row).append(articleTitle);
        $(row).append(saveArticle);
        $(row).append(articleSummary);
        
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


