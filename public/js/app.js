

// At first the app will show no new articles

// When I scrape aricles need a modal that will show the articles that I scrapped

// Each article generated will have a button to save the article. 

// In the saved articles we are going to show all the articles saved. 

// The list of saved articles will have a button to add notes or delete saved

// The modal to write a note will have a Save Note button. 

// All the notes for that article will be saved 

// Once the note is saved, we can access the note and each note rendered will have a DELETE button

// If we don't have any saved articles we need to show no saved articles

function ajaxCall(url, type){
    var urlPath = url;
    var ajaxType = type;

    $.ajax({
        url: urlPath,
        type: ajaxType,
        success: function(response){
            return response;
        }
    })
}


function createScrappedDocuments(){
    var ajaxResponse = ajaxCall("/scrape","GET");
    
    console.log("In createScrappedDocuments");
    console.log(ajaxResponse);

}

function displayScrappedDocuments(result){

}

function noScrappedDocuments(){

}


function getScrappedDocuments(){
    
    var ajaxResponse = ajaxCall("","GET");
   
}


$(document).ready(function(){
    
    
    console.log("Document Ready");


});


$(document).on("click","#ScrapeNaveLink", function(event){
    
    event.preventDefaul();

    createScrappedDocuments();
    
})


