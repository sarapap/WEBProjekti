module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current', // Tämä määrittää Babelin kohdistamaan nykyiseen Node.js -versioon
                },
            },
        ],
    ],
};
