if ( Bulbs.find().count() === 0 ) {
    Bulbs.insert({
        title: "Panagis",
            synopsis: "Vehicula Tellus Amet Ligula Pellentesque"
    });
    Bulbs.insert({
        title: "Fringilla",
        synopsis: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor."
    });
    Bulbs.insert({
        title: "Javlon",
        synopsis: "Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor."
    });
}

if ( Sparks.find().count() === 0 ) {
    Sparks.insert({
        description: "Vehicula Tellus Amet Ligula Pellentesque"
    });
    Sparks.insert({
        description: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor."
    });
    Sparks.insert({
        description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor."
    });
}
