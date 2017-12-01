document.getElementById('myForm').addEventListener('submit',saveBookmarks);

function saveBookmarks(e){
    var siteName = document.getElementById("inputSiteName").value;
    var siteUrl  = document.getElementById("inputUrl").value;

    if(!siteName || !siteUrl){

        alert("Please fill the both fields !!!");
        return false;
    }

    var bookmark = {
        name:siteName,
        url:siteUrl
    }

    //testing localstorage
    /* localStorage.setItem('me','vindi');
    console.log(localStorage.getItem('me'));
    localStorage.removeItem('me');
    console.log(localStorage.getItem('me')); */

    //save bookmarks to local storage
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    displayBookmarkTabs();

    //prevent the form from submitting
    e.preventDefault();
}

//delete a perticular site
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url == url)
        {
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    displayBookmarkTabs();
}

//fetch all saved bookmarks
function displayBookmarkTabs(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var results = document.getElementById('diplaySites');

    results.innerHTML = '';
    for(var i=0 ; i<bookmarks.length;i++){

        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
       results.innerHTML += '<div class="card card-body bg-light tab-margin">'+
                            '<h3>'+name+
                            '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                            '<a class="btn btn-danger" href="#" onclick="deleteBookmark(\''+url+'\')">Delete</a>'+
                            '</h3>'+
                            '</div>';
    }
}
