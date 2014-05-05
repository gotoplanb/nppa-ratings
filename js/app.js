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
      $('#app').html('Welcome!');
    },

    photoView: function(photoNumber) {
      var currentPhoto = nppaImages[(photoNumber - 1)];

      var Photo = new NPPA.Views.Photo({ photoUrl: currentPhoto });
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

    initialize: function(options) {
      this.photoUrl = options.photoUrl;
      this.render();
    },

    render: function() {
      this.$el.html(this.template({ photo: this.photoUrl }));
    }

  });

}) ();

$(document).ready(function() {

  // Start the app
  NPPA.init();

});