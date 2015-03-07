if ( Bulbs.find().count() === 0 ) {
    var bulb1Id = Bulbs.insert({
        title: "Panagis",
        synopsis: "Vehicula Tellus Amet Ligula Pellentesque"
    });
    var bulb2Id = Bulbs.insert({
        title: "Fringilla",
        synopsis: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor."
    });
    var bulb3Id = Bulbs.insert({
        title: "Javlon",
        synopsis: "Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor."
    });
}

if ( Sparks.find().count() === 0 ) {
    Sparks.insert({
        parent: bulb1Id,
        description: "Something is wierd"
    });
    Sparks.insert({
        parent: bulb2Id,
        description: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor."
    });
    Sparks.insert({
        parent: bulb3Id,
        description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor."
    });
}
