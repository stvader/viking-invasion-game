const map = {
    bg: {
        sx: 1,
        sy: 0 
    },

    goal: {
        sx: 5,
        sy: 7,
        sWidth: 2,
        sHeight: 2,        
        dx: 18,
        dy: 0
    },

    bariers: [ {x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}, 
            {x: 10, y: 3}, {x: 11, y: 3}, {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, 
            {x: 15, y: 3}, {x: 16, y: 3}, {x: 17, y: 3}, {x: 18, y: 3}, {x: 19, y: 3},
            {x: 0, y: 7}, {x: 1, y: 7}, {x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}, {x: 5, y: 7},
            {x: 6, y: 7}, {x: 7, y: 7}, {x: 8, y: 7}, {x: 9, y: 7}, {x: 10,y: 7}, {x: 11, y: 7},
            {x: 12, y: 7}, {x: 13, y: 7}, {x: 14, y: 7}        
    ]
};

const playerTuning = {
    imgId: 'hero-slider',
    pos: [50, 570]
};

const enemyTuning = [
    {
        startCoord: [350, 60],
        endCoords: [800, 60],
        speed: 4
    },
    {
        startCoord: [350, 175],
        endCoords: [550, 175],
        speed: 2
    },
    {
        startCoord: [120, 330],
        endCoords: [600, 330],
        speed: 3
    },
    {
        startCoord: [950, 370],
        endCoords: [1130, 370],
        speed: 2
    },
    {
        startCoord: [500, 570],
        endCoords: [1100, 570],
        speed: 3
    }
    
];

const ammunitionTuning = [
    {
        pos: [100, 110]
    },
    {
        pos: [50, 300]
    },
    {
        pos: [600, 270]
    },
    {        
        pos: [500, 500]
    }
];

export {map, playerTuning, enemyTuning, ammunitionTuning};
