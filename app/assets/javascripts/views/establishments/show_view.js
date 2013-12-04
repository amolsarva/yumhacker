EstablishmentsShowView = Backbone.View.extend({
	
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();

    },

    render: function () {
        this.$el.html(render('establishments/show', this.model));

        this.establishments_show_establishment_info_view = new EstablishmentsShowEstablishmentInfoView({
            el: '#establishment_container',
            model: this.model
        });

        this.establishments_show_endorsers_list_view = new EstablishmentsShowEndorsersListView({
            el: '#endorsers_list',
            model: this.model
        });

        MapView.el = '#map_canvas_container';
        MapView.model = this.model;
        MapView.renderEstablishmentMap();
	}
});
