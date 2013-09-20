var app = {};

var User = Backbone.Model.extend({

    defaults: {
        name: 'Default Name'
    }

});


var ProfileView = Backbone.View.extend({

    template: _.template( $( '#jst-profile' ).html() ),

    events: {
        'click #js-change-name': 'promptNewName'
    },

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
    },

    promptNewName: function(e) {
        e.preventDefault();
        var new_name = window.prompt( 'Enter the new name:' );
        if ( new_name ) {
            app.user.set({
                name: new_name
            });
        }
    }

});


var AppRouter = Backbone.Router.extend({

    routes: {
        account : 'account',
        notifications: 'notifications',
        '': 'home'
    },

    home: function() {
        this.updateNav();
        $( '#page' ).html( '<h1>Zombies!</h1>' );
    },

    account: function() {
        this.updateNav();
        $( '#page' ).html( new ProfileView({
            model: app.user
        }).render().$el );
    },

    notifications: function() {
        this.updateNav();
        $( '#page' ).html( '<h2>You do not have any new notifications.</h2>' );
    },

    updateNav: function() {
        $( 'header' ).find( 'li' ).removeClass( 'active' );
        $( 'header' ).find( 'a[href=' + window.location.hash + ']' )
            .closest( 'li' ).addClass( 'active' );
    }

});


var AppView = Backbone.View.extend({

    el: $('body'),

    initialize: function() {
        app.user = new User({ name: 'viky' });
        app.router = new AppRouter();
        Backbone.history.start();
    }

});
