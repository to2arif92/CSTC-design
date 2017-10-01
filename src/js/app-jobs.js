/// <reference path="../../scripts/libs/jquery-1.7.1.js" />
/// <reference path="../../scripts/libs/underscore.js" />
/// <reference path="../../scripts/libs/backbone.js" />

var App = {
    Models: {},
    Collections: {},
    Views: {},
    Templates: {}
}

App.Models.Job = Backbone.Model.extend({})
App.Collections.Jobs = Backbone.Collection.extend({
    model: App.Models.Job,
    url: "data/jobs.json",
    initialize: function () {
        console.log("Jobs from JSON initialize")
    }
});

App.Templates.jobs = _.template($("#tmplt-Jobs").html())

App.Views.Jobs = Backbone.View.extend({
    el: $("#jobContainer"),
    template: App.Templates.jobs,
    //collection: new App.Collections.Jobs(), //Not needed

    events: {
        'mouseenter .cards': 'expand',
        'mouseleave .cards': 'expand'

    },
    expand: function (e) {
        //console.log($(this));
        // call the function defined in jobs.js
        expandCard();
        collapse();
        //e.preventDefault();
    },

    initialize: function () {
        //_.bindAll(this, "render", "addOne", "addAll");
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.addOne, this);
    },

    render: function () {
        console.log("render");
        console.log(this.collection.length);
        $(this.el).html(this.template());
        this.addAll();
    },

    addAll: function () {
        console.log("addAll")
        this.collection.each(this.addOne);
    },

    addOne: function (model) {
        console.log("addOne")
        view = new App.Views.Job({
            model: model
        });
        $("div#jobList", this.el).append(view.render());
    }

})


App.Templates.job = _.template($("#tmplt-Job").html())
App.Views.Job = Backbone.View.extend({
    tagName: "div",
    className: " card [ is-collapsed ] ",
    template: App.Templates.job,
    //events: { "click .delete": "test" },

    initialize: function () {
        //_.bindAll(this, 'render', 'test');
        this.model.bind('destroy', this.destroyItem, this);
        this.model.bind('remove', this.removeItem, this);
    },

    render: function () {
        return $(this.el).append(this.template(this.model.toJSON()));
    },

    removeItem: function (model) {
        console.log("Remove - " + model.get("Name"))
        this.remove();
    }
})


App.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute" //http://localhost:22257/App/theater.htm
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        App.jobs = new App.Collections.Jobs()
        new App.Views.Jobs({
            collection: App.jobs
        }); //Add this line
        App.jobs.fetch();
        console.log(App.jobs.length)
    }
})

var appRouter = new App.Router();
Backbone.history.start();
/*
//This is a hack for demonstration  purposes
$("#butAddItem").click(null, function () {
    var job = new App.Models.Job(
        {
            "Id": "BVP3s",
            "Name": "Lord of the Rings: The Return of the King: Extended Edition: Bonus Material",
            "AverageRating": 4.3,
            "ReleaseYear": 2003,
            "Url": "http://www.netflix.com/Job/Lord_of_the_Rings_The_Return_of_the_King_Extended_Edition_Bonus_Material/70024204",
            "Rating": "PG-13"
        }
    )

    App.jobs.add(job);
    console.log(App.jobs.length)
})*/
