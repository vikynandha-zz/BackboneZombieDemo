var app = {};

var User = Backbone.Model.extend({

    defaults: {
        name: 'Default Name'
    }

});


var ProfileView = Backbone.View.extend({

    template: _.template( $( '#jst-profile' ).html() ),

    initialize: function() {
        this.model.on( 'change:name', this.showNameChanged, this );
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },

    showNameChanged: function() {
        this.render();
        alert( 'Name changed to ' + this.model.get( 'name' ) + '\n' +
               'Triggered by ' + this.cid );
    }

});


var AppRouter = Backbone.Router.extend({

    routes: {
        profile : 'profile',
        settings: 'settings',
        '': 'home'
    },

    home: function() {
        this.updateNav();
        $( '#page' ).html( '<h1>Zombies!</h1>' );
    },

    profile: function() {
        this.updateNav();
        $( '#page' ).html( new ProfileView({
            model: app.user
        }).render().$el );
    },

    settings: function() {
        this.updateNav();
        $( '#page' ).html( 'Settings' );
    },

    updateNav: function() {
        $( 'header' ).find( 'li' ).removeClass( 'active' );
        $( 'header' ).find( 'a[href=' + window.location.hash + ']' )
            .closest( 'li' ).addClass( 'active' );
    }

});


var AppView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click #js-change-name': 'promptNewName'
    },

    initialize: function() {
        app.user = new User({ name: 'viky' });
        app.router = new AppRouter();
        Backbone.history.start();
    },

    promptNewName: function(e) {
        e.preventDefault();
        var new_name = window.prompt( 'Enter the new name:' );
        app.user.set({
            name: new_name
        });
    }

});
