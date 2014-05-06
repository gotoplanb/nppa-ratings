"use strict";

(function() {

  window.NPPA = {

    Routers: {},
    Models: {},
    Collections: {},
    Views: {},
    init: function() {
      // Initialize router
      this.mainRouter = new NPPA.Routers.MainRouter();
      Backbone.history.start();
    }

  };

  // Main router
  NPPA.Routers.MainRouter = Backbone.Router.extend({ 

    routes: {
      '': 'introView', // Landing page
      'photos/:photoNumber': 'photoView' // Individual Photo view
    },

    initialize: function() {
      NPPA.userList = new NPPA.Collections.Users();
    },

    introView: function() {  
      var main = new NPPA.Views.Main();
    },

    photoView: function(photoNumber) {
      var photoName = nppaImages[(photoNumber - 1)];
      console.log(photoName);
      var photo = new NPPA.Views.Photo({ photoName: photoName, photoIndex: photoNumber });

      photo.render();
    }
  
  });


  // User model
  NPPA.Models.User = Backbone.Model.extend({

    //attributes: {
    //  firstName: '',
    //  lastName: '',
    //  qualityRatings: [],
    //  shareRatings: []  
    //}

  });


  // Users collection
  NPPA.Collections.Users = Backbone.Collection.extend({

    model: NPPA.Models.User,

    localStorage: new Backbone.LocalStorage('Users'),

    initialize: function() {
      this.fetch();
    },

    setUserId: function() {
      var totalUsers = this.length;

      return (totalUsers + 1);
    }

  });


  // Photo view
  NPPA.Views.Photo = Backbone.View.extend({

    el: '#app',

    template: _.template($('#photo-template').html()),

    events: {
      'change input[type="radio"]': 'activateButton',
      'click #next-photo.-active': 'saveAndContinue'
    },

    initialize: function(options) {
      this.photoDetails = {
        fileName: options.photoName,
        number: options.photoIndex
      }
    },

    render: function() {
      this.$el.html(this.template(this.photoDetails));
    },

    clearView: function() {
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
      return this;
    },

    activateButton: function() {
      if ($('input[name="quality"]:checked').val() && $('input[name="shareability"]:checked').val()) {
        $('#next-photo').toggleClass('-inactive -active');
      }
    },

    saveAndContinue: function() {
      var nextPhoto = parseInt(this.photoDetails.number)+ 1;
      this.clearView();
      NPPA.mainRouter.navigate('photos/' + nextPhoto, {trigger: true});
    } 

  });


  // Main view
  NPPA.Views.Main = Backbone.View.extend({

    el: '#app',

    template: _.template($('#welcome-template').html()),

    events: {
      'change input[type="text"]': 'activateButton',
      'click #get-started.-active': 'createUser'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template);
    },

    activateButton: function() {
      console.log('Change detected');
      if ($('#first-name').val() && $('#last-name').val()) {
        $('#get-started').removeClass('-inactive').addClass('-active');
      } else {
        $('#get-started').addClass('-inactive').removeClass('-active');
      }
    },

    createUser: function(e) {
      e.preventDefault();

      if (!$('#first-name').val()  || !$('#last-name').val()) {

        $('#get-started').removeClass('-inactive').addClass('-active');
      }
      var userFirst = $('#first-name').val();
      var userLast = $('#last-name').val();

      NPPA.userList.create({
        firstName: userFirst,
        lastName: userLast,
        id: NPPA.userList.setUserId()
      });

      NPPA.mainRouter.navigate('photos/1', {trigger: true});
    }

  });

}) ();

$(document).ready(function() {

  // Start the app
  NPPA.init();

});