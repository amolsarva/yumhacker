EstablishmentsPhotosIndexView = Backbone.View.extend({
	events:{
        'click #biz_name': 'goToEstablishmentShow',
	},

	initialize: function () {
        this.collection = new PhotoCollection({
            establishment_id: this.model.get('id')
        });

        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({ reset: true });       
    },

    render: function () {
        this.$el.html(render('establishments/photos_index', this.model)); 
        this.changeHeadInfo();

        this.photos_gallery_view = new PhotosGalleryView({
            collection: this.collection,
            model: this.model,
            el: '#photos_gallery_container'
        });
        
        this.collection.fetch({ 
            reset: true, 
            data: { 
                id: this.model.get('id'), 
                type: 'establishment' 
            } 
        });            
    },

    goToEstablishmentShow: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    },

    changeHeadInfo: function () {
        this.title = this.model.get('name') + '\'s Photos | ' + this.model.get('city') + ' Restaurants | YumHacker';       
        this.description = 'Photos of ' + this.model.get('name') + ' in ' + this.model.get('city') + ', ' + this.model.get('state') + ' on YumHacker.'

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});
