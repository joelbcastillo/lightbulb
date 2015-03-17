Template.bulbsList.helpers({
    bulbs: function() {
        bulbs = Bulbs.find({});
        rows = [];
        row_len = Bulbs.find({}).count();
        while (bulbs.length > row_len) {
            rows.push({
                row: bulbs.slice(0,row_len)
            });
            bulbs = bulbs.slice(row_len);
        }
        rows.push({row: bulbs});
        return rows;
    }
});