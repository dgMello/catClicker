function addCats() {

  var cat1 = ["Whiskers", "static/images/cat1.jpg", 0];
  var cat2 = ["Jim", "static/images/cat2.jpg", 0];
  var cat3 = ["Calvin", "static/images/cat3.jpg", 0];
  var cat4 = ["Francis", "static/images/cat4.jpg", 0];
  var cat5 = ["Mr. Meowington", "static/images/cat5.jpg", 0];
  var cats = [cat1, cat2, cat3, cat4, cat5];

  $('header').after("<div class='catList'><ul></ul>");
  for (var c = 0; c < cats.length; c++) {
    var cat = cats[c];
    var catName = cat[0];
    $('ul').append("<li id='catItem" + c + "'>" + catName + "</li>");

    $('section').append("<div id='catDiv" + c + "'hidden><h2>" + catName + "</h2>\
      <img src='" + cat[1]  + "' id='catPicture" + c + "'><h2 id='counter" + c +
      "'>Amount of clicks: 0</h2></div>");

    var catPictureID = "catPicture" + c;
    document.getElementById(catPictureID).addEventListener('click', (function(catCopy) {
      return function() {
        cats[catCopy][2] ++;
        $("#counter" + catCopy).text("Amount of clicks: " + cats[catCopy][2]);
      };
    })(c));

    var catListID = "catItem" + c;
    document.getElementById(catListID).addEventListener('click', (function(catCopy2) {
      return function() {
        $("#catDiv" + catCopy2).toggle();
      };
    })(c));
  }
}
$(document).ready(addCats);
