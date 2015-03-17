Template.bulbsList.helpers({
    bulbs: function() {
        bulbs = Bulbs.find({}).fetch();
        rows = [];
        row_len = 3;
        while (bulbs.length > row_len) {
            rows.push({
                row: bulbs.slice(0,row_len)
            });
            bulbs = bulbs.slice(row_len);
        }
        rows.push({row: bulbs});
        //console.log(bulbs);
        return rows;
    }
});