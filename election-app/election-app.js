Polymer({
    is: 'election-app',
    behaviors: [Polymer.NeonAnimationRunnerBehavior],
    observers: ['_viewChanged(routeChildData.id)'],
    properties: {
        hasWinner: {
            type: Boolean,
            computed: 'determineHasWinner(votes.*)'
        },
        animationConfig: {
            value: function () {
                return {
                    vote: [{
                        name: 'scale-down-animation',
                        node: this.$.candidateGrid
                    }]
                }
            }
        },
    },
    vote: function (event) {
        this.push('votes', new Vote(event.model.item, new Date().toLocaleTimeString()));
        this.playAnimation('vote');
    },
    sortVotes: function (a, b) {
        return a.time < b.time;
    },
    getWinner: function () {
        var filtered = this.votes.filter(function (item) {
            return item.candidate === this.candidates[0];
        }.bind(this));
        if (filtered.length == this.votes.length / 2) {
            return 'not defined, we need one more vote';
        } else if (filtered.length < this.votes.length / 2) {
            return this.candidates[1].name;
        } else {
            return this.candidates[0].name;
        }
    },
    determineHasWinner: function () {
        return this.votes.length > 10;
    },
    _showInfo: function (event) {
        this.set('selectedCandidate', event.model.item);
        // this.$.pages.selected = 'details';
        this.set('route.path', '/details/' + this.candidates.indexOf(event.model.item));
    },
    _voteCount: function () {
        return this.votes.filter(v => v.candidate === this.selectedCandidate).length;
    },
    _goBack: function () {
        this.$.pages.selected = 'vote';
        this.$.candidateGrid.notifyResize(); // notify to refresh... don't ask
    },
    _viewChanged: function (view) {
        setTimeout(function () {
            if (this.routeChildData.id) {
                this.selectedCandidate = this.candidates[parseInt(this.routeChildData.id)];
            }
        }.bind(this));
    },
});
