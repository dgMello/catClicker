function addCats() {
  var cats = [0, 1, 2, 3, 4];
  var catsNames = ["Whiskers", "Jim", "Calvin", "Francis", "Mr. Meowinton"];

  // Let's loop over the numbers in our array
  for (var c = 0; c < cats.length; c++) {

      var cat = cats[c];

      var elem = document.createElement('div');
      $('div').append("<h1></h2>");

      elem.addEventListener('click', (function(catCopy) {
        return function() {
          alert(catCopy);
        };
      })(cat));

      document.body.appendChild(elem);
    };
  };
$(document).ready(addCats);
