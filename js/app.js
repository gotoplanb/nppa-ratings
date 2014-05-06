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

    introView: function() {  
      var main = new NPPA.Views.Main();
    },

    photoView: function(photoNumber) {
      var photoName = nppaImages[(photoNumber - 1)];

      var photo = new NPPA.Views.Photo({ photoName: photoName, photoIndex: photoNumber });
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

    model: NPPA.Models.User

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

      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.photoDetails));
    },

    activateButton: function() {
      if ($('input[name="quality"]:checked').val() && $('input[name="shareability"]:checked').val()) {
        $('#next-photo').toggleClass('-inactive -active');
      }
    },

    saveAndContinue: function() {
      console.log('Soon');
      var nextPhoto = parseInt(this.photoDetails.number)+ 1;
      NPPA.mainRouter.navigate('photos/' + nextPhoto, {trigger: true});
    } 

  });


  // Main view
  NPPA.Views.Main = Backbone.View.extend({

    el: '#app',

    template: _.template($('#welcome-template').html()),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template);
    }

  });

}) ();

$(document).ready(function() {

  // Start the app
  NPPA.init();

});