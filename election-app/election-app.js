Polymer({
    is: 'election-app',
    properties: {

    },
    observers: ['_routeChanged(routeData.view)'],
    _routeChanged: function (view) {
        // lazyload the page
        this.importHref(this.resolveUrl('/' + view + '-page' + '/' + view + '-page.html'))
    },
    goBack: function () {
        this.set('route.path', "/voting");
    },
    showInfo: function (item) {
        this.set('route.path', "/details/" + this.candidates.indexOf(item.detail));
    },
    vote: function (e) {
        this.push('votes', e.detail);
    }
});