Polymer({
    is: 'election-app',
    properties: {
        hasWinner: {
            type: Boolean,
            computed: 'determineHasWinner(votes.*)'
        }
    },
    vote: function (event) {
        console.log('voted', event.model.item);
        this.push('votes', new Vote(event.model.item, new Date().toLocaleTimeString()));
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
    }
});
