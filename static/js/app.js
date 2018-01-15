var model = {
  currentCat: null,
  cats: [
    {
      clickCount : 0,
      name : 'Whiskers',
      imgSrc : "static/images/cat1.jpg"
    },
    {
      clickCount : 0,
      name: 'Jim',
      imgSrc : "static/images/cat2.jpg"
    },
    {
      clickCount : 0,
      name : 'Calvin',
      imgSrc : "static/images/cat3.jpg"
    },
    {
      clickCount : 0,
      name : 'Francis',
      imgSrc : "static/images/cat4.jpg"
    },
    {
      clickCount : 0,
      name : 'Mr. Meowington',
      imgSrc : "static/images/cat5.jpg"
    }
  ],
  adminViewShowing: false
};
/* ======= Octopus ======= */

var octopus = {

  init: function() {
    // set our current cat to the first one in the list
    model.currentCat = model.cats[0];

    // tell our views to initialize
    catListView.init();
    catView.init();
    adminButtonView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  // set the currently-selected cat to the object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // increments the counter for the currently-selected cat
  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
    adminButtonView.render();
  },

  getAdminView: function() {
    return model.adminViewShowing;
  },
  // Chagnes adminview showing variable to true or false.
  switchAdminMode: function(adminView) {
    if (adminView) {
      model.adminViewShowing = false;
    }
    else {
      model.adminViewShowing = true;
    }
  },
  // Update current cat model when pressed save button.
  saveCatInfo: function() {
    model.currentCat.name = adminButtonView.nameFieldElem.value;
    model.currentCat.imgSrc = adminButtonView.imageURLFieldElem.value;
    model.currentCat.clickCount = adminButtonView.clickFieldELem.value;
    catView.render();
    this.switchAdminMode(this.getAdminView());
    adminButtonView.render();
  }
};


/* ======= View ======= */

var catView = {

  init: function() {
  // store pointers to our DOM elements for easy access later
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    // on click, increment the current cat's counter
    this.catImageElem.addEventListener('click', function(){
      octopus.incrementCounter();
    });

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    // update the DOM elements with values from the current cat
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

var catListView = {

  init: function() {
    // store the DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    var cat, elem, i;
    // get the cats we'll be rendering from the octopus
    var cats = octopus.getCats();

    // empty the cat list
    this.catListElem.innerHTML = '';

    // loop over the cats
    for (i = 0; i < cats.length; i++) {
      // this is the cat we're currently looping over
      cat = cats[i];

      // make a new cat list item and set its text
      elem = document.createElement('li');
      elem.textContent = cat.name;

      // on click, setCurrentCat and render the catView
      // (this uses our closure-in-a-loop trick to connect the value
      //  of the cat variable to the click event function)
      elem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
          adminButtonView.render();
        };
      })(cat));

      // finally, add the element to the list
      this.catListElem.appendChild(elem);
    }
  }
};

var adminButtonView = {

  init: function() {

    this.adminButtonElem = document.getElementById('admin-button');
    this.newInfoFieldElem = document.getElementById('newInfoForm');
    this.nameFieldElem = document.getElementById('name-field');
    this.imageURLFieldElem = document.getElementById('imgurl-field');
    this.clickFieldELem = document.getElementById('clicks-field');
    this.saveButtonElem = document.getElementById('save-button');
    this.cancelButtonElem = document.getElementById('cancel-button');
    // Add event listener to admin button
    this.adminButtonElem.addEventListener('click', function() {
      octopus.switchAdminMode(octopus.getAdminView());
      adminButtonView.render();
    });
    this.saveButtonElem.addEventListener('click', function() {
      octopus.saveCatInfo();
    });
    this.cancelButtonElem.addEventListener('click', function() {
      octopus.switchAdminMode(octopus.getAdminView());
      adminButtonView.render();
    });

    this.render();
  },
  render: function() {
    var adminView = octopus.getAdminView();
    var currentCat = octopus.getCurrentCat();
    this.nameFieldElem.setAttribute("value", currentCat.name);
    this.imageURLFieldElem.setAttribute("value", currentCat.imgSrc);
    this.clickFieldELem.setAttribute("value", currentCat.clickCount);
    //Check to see if admin is true.  If true render div and add current cat info.
    if (adminView) {
      this.newInfoFieldElem.removeAttribute("hidden");
    }
    else {
      this.newInfoFieldElem.setAttribute("hidden", "true");
    }
  }
};

// make it go!
octopus.init();
