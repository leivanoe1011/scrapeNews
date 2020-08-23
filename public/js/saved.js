

function displayScrappedDocuments(result){

    $("#divContent").empty();

    var data = result;


    for(var i = 0; i < data.length; i++){

        var row = $("<div>");
        
        $(row).addClass("row article_row");

        var colContent = $("<div>");
        var colButton = $("<div>");

        $(colContent).addClass("col-10 content-div");
        $(colButton).addClass("col-2 button-div");



        var rowContent = $("<div>");
        var rowButtons = $("<div>");
        
        
        $(rowContent).addClass("row");
        $(rowButtons).addClass("row");



        var articleTitle = $("<a>");          
        $(articleTitle).addClass("col-12 title-div");
        $(articleTitle).text(data[i].title);
        $(articleTitle).attr("href", data[i].link);



        var articleSummary = $("<span>");         
        $(articleSummary).addClass("col-12 summary-div");           
        $(articleSummary).text(data[i].summary);

        
        $(rowContent).append(articleTitle);
        $(rowContent).append(articleSummary);
        $(colContent).append(rowContent);
        


        var note = $("<a>");
        $(note).addClass("btn btn-light col-12 btn-lg add-note");
        $(note).attr("type","button");
        $(note).text("NOTE");
        $(note).attr("obj_id",data[i]._id);


        var unsaveArticle = $("<a>");
        $(unsaveArticle).addClass("btn btn-light col-12 btn-lg unsave-btn");
        $(unsaveArticle).attr("type","button");
        $(unsaveArticle).text("UNSAVE");
        $(unsaveArticle).attr("obj_id", data[i]._id);
        $(unsaveArticle).attr("saved_id", data[i].saved);


        $(rowButtons).append(unsaveArticle);
        $(rowButtons).append(note);
        $(colButton).append(rowButtons);


        $(row).append(colContent);
        $(row).append(colButton);

        
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


    var urlPath = "/savedarticle";
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
    });
    
};


function removeSavedArticle(obj){


    var removeObj = obj;
    var urlPath = "/removeSaved";
    var apiType  = "DELETE";

    $.ajax({
        url: urlPath,
        type: apiType,
        data: removeObj,
        success: function(result){

            location.reload();

        }
    });

}


function loadNotes(userObj) {

    var notes = userObj;

    var tbl = '';

    tbl += '<table class="table table-hover">';

    // Create header
    tbl += '<thead>';
    tbl += '<tr>';
    //tbl += '<th> </th>';
    tbl += '<th>Note</th>';
    tbl += '<th>Options</th>'; // Here we load the edit
    tbl += '</tr>';
    tbl += '</thead>';

    // Create body
    tbl += '<tbody>';
    // var propertyNames = Object.getOwnPropertyNames(userObj);

    for (var i = 0; i < notes.length; i++) {
        
        var note = notes[i];

        var row_id = note._id;

        

        var propertyName = "Note";
        
        var propertyValue = note.noteContent;


        //loop through ajax row data
        tbl += '<tr row_id="' + row_id + '">';

        //tbl += '<td>' + propertyName + ':</td>';

        tbl += '<td ><div class="row_data" edit_type="click" col_name="' + propertyName + '">' + propertyValue + '</div></td>';


        //--->edit options > start
        tbl += '<td>';

        tbl += '<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="' + row_id + '" > Edit</a> </span>';

        //only show this button if edit button is clicked
        tbl += '<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="' + row_id + '"> Save</a> | </span>';
        tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="' + row_id + '"> Cancel</a> | </span>';

        tbl += '</td>';
        //--->edit options > end

        tbl += '</tr>';
    }
    tbl += '</tbody>';
    //--->create table body > end

    tbl += '</table>'
    //--->create data table > end

    //out put table data
    $(document).find('.tbl_user_data').html(tbl);

    $(document).find('.btn_save').hide();
    $(document).find('.btn_cancel').hide();
};


function loadNotes2(noteObj){

    var notes = noteObj;

    if(notes.length > 0){
        console.log(notes);

        $("#exampleInputNote").text(notes[0].noteContent);
    }

}


function getNote(articleId){
    
    var obj = {};

    obj.id = articleId;

    var urlPath = "/getNote";
    var apiType  = "GET";

    $.ajax({
        url: urlPath,
        type: apiType,
        data: obj,
        success: function(result){


            loadNotes(result);

            //loadNotes2(result);

            $('#myModal').modal('show');
                            
        }
    });        
};


function addNote(noteObj){
    
    var obj = noteObj;
    var urlPath = "/addNote";
    var apiType  = "POST";

    $.ajax({
        url: urlPath,
        type: apiType,
        data: obj,
        success: function(result){
            
            //loadNotes(result);

            $('#myModal').modal('hide');
            
        }
    });
}


function removeNote(obj){
    var removeObj = obj;
    var urlPath = "/removeNote";
    var apiType  = "DELETE";

    $.ajax({
        url: urlPath,
        type: apiType,
        data: removeObj,
        success: function(result){
            
            
        }
    });
}


$(document).on("click", "#saveChanges", function(event){
    
    event.preventDefault();

    var newNote = $("#exampleInputNote").val();

    var articleId = $("#saveChanges").attr("articleId");

    var obj = {};

    obj.articleId = articleId;
    obj.newNote = newNote;

    addNote(obj);     

});


$(document).on("click",".add-note", function(event){
    event.preventDefault();

    var currentBtn = $(this); 

    var articleId = $(currentBtn).attr("obj_id");


    $("#saveChanges").attr("articleId", articleId);

    //$('#myModal').modal('show');
    
    getNote(articleId);
    //addNote(articleId);
    
});


$(document).on("click",".delete-note", function(event){
    event.preventDefault();

    var currentBtn = $(this);

    removeNote();
});


$(document).on("click",".unsave-btn", function(event){


    event.preventDefault();

    var currentBtn = $(this);

    var articleId = $(currentBtn).attr("obj_id");

    var savedId = $(currentBtn).attr("saved_id");

    var obj = {};

    obj.articleId = articleId;
    obj.savedId = savedId;

    removeSavedArticle(obj);

});


//--->make div editable > start
$(document).on('click', '.row_data', function (event) {
    event.preventDefault();

    if ($(this).attr('edit_type') == 'button') {
        return false;
    };

    //make div editable
    $(this).closest('div').attr('contenteditable', 'true');
    //add bg css
    $(this).addClass('bg-warning').css('padding', '5px');

    $(this).focus();
});
//--->make div editable > end

//--->save single field data > start
$(document).on('focusout', '.row_data', function (event) {
    event.preventDefault();

    if ($(this).attr('edit_type') == 'button') {
        return false;
    };

    var row_id = $(this).closest('tr').attr('row_id');

    var row_div = $(this)
        .removeClass('bg-warning') //add bg css
        .css('padding', '');

    var col_name = row_div.attr('col_name');
    var col_val = row_div.html();

    var arr = {};
    arr[col_name] = col_val;

    //use the "arr"	object for your ajax call
    $.extend(arr, { row_id: row_id });

    //out put to show
    $('.post_msg').html('<pre class="bg-success">' + JSON.stringify(arr, null, 2) + '</pre>');

});
//--->save single field data > end

//--->button > edit > start	
$(document).on('click', '.btn_edit', function (event) {
    event.preventDefault();
    var tbl_row = $(this).closest('tr');

    var row_id = tbl_row.attr('row_id');

    tbl_row.find('.btn_save').show();
    tbl_row.find('.btn_cancel').show();

    //hide edit button
    tbl_row.find('.btn_edit').hide();

    //make the whole row editable
    tbl_row.find('.row_data')
        .attr('contenteditable', 'true')
        .attr('edit_type', 'button')
        .addClass('bg-warning')
        .css('padding', '3px');

    //--->add the original entry > start
    tbl_row.find('.row_data').each(function (index, val) {
        //this will help in case user decided to click on cancel button
        $(this).attr('original_entry', $(this).html());
    });
    //--->add the original entry > end

});
//--->button > edit > end

//--->button > cancel > start	
$(document).on('click', '.btn_cancel', function (event) {
    event.preventDefault();

    var tbl_row = $(this).closest('tr');

    var row_id = tbl_row.attr('row_id');

    //hide save and cacel buttons
    tbl_row.find('.btn_save').hide();
    tbl_row.find('.btn_cancel').hide();

    //show edit button
    tbl_row.find('.btn_edit').show();

    //make the whole row editable
    tbl_row.find('.row_data')
        .attr('edit_type', 'click')
        .removeClass('bg-warning')
        .css('padding', '');

    tbl_row.find('.row_data').each(function (index, val) {
        $(this).html($(this).attr('original_entry'));
    });
});
//--->button > cancel > end

//--->save whole row entery > start	
$(document).on('click', '.btn_save', function (event) {
    event.preventDefault();

    var tbl_row = $(this).closest('tr');

    var row_id = tbl_row.attr('row_id');

    //hide save and cacel buttons
    tbl_row.find('.btn_save').hide();
    tbl_row.find('.btn_cancel').hide();

    //show edit button
    tbl_row.find('.btn_edit').show();

    //make the whole row editable
    tbl_row.find('.row_data')
        .attr('edit_type', 'click')
        .removeClass('bg-warning')
        .css('padding', '');

    //--->get row data > start
    var arr = {};
    tbl_row.find('.row_data').each(function (index, val) {
        //var col_name = $(this).attr('col_name');
        var col_name = "noteContent";
        var col_val = $(this).html();
        arr[col_name] = col_val;

    });
    //--->get row data > end

    //use the "arr"	object for your ajax call
    // Below adding row_id to the object
    // $.extend(arr, {row_id:row_id});

    arr.noteId = row_id;

    console.log(arr);

    $.ajax({
        url: "/updateNote",
        type: "PUT",
        data: arr,
        success: function (result) {
            // After update reload the page
            location.reload();
        }
    });

    //out put to show
    $('.post_msg').html('<pre class="bg-success">' + JSON.stringify(arr, null, 2) + '</pre>');
});

$(document).ready(function(){
    getArticles();
});

