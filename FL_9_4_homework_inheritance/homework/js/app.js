function assign(target) {
    if (target === null || target === undefined) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    let toObj = Object(target);
    for (let i = 0; i < arguments.length; i++) {
        let sourceObj = arguments[i];

        if (sourceObj) {
            for (const key in sourceObj) {
                if (sourceObj.hasOwnProperty(key)) {
                    toObj[key] = sourceObj[key];
                }
            }
        }
    }

    return toObj;
}


function Bot(config) {
    if (!config) {
        return;
    }

    this.name = config.name || 'defaultBot';
    this.defaultSpeed = this.speed = config.speed || 1;
    this.x = config.x || 0;
    this.y = config.y || 0;
}

Bot.prototype.getName = function () {
    return this.name;
}

Bot.prototype.setName = function (name) {
    this.name = name;
}

Bot.prototype.getSpeed = function () {
    return this.speed;
}

Bot.prototype.setSpeed = function (newSpeed) {
    this.speed = newSpeed;
}

Bot.prototype.getDefaultSpeed = function () {
    return this.defaultSpeed;
}

Bot.prototype.getCoordinates = function () {
    return { x: this.x, y: this.y };
}

Bot.prototype.setCoordinates = function (newCoordinatesObj) {
    this.x = newCoordinatesObj.x;
    this.y = newCoordinatesObj.y;
}

Bot.prototype.move = function (direction) {
    switch (direction) {
        case 'up':
            this.y += this.getSpeed();
            break;
        case 'down':
            this.y -= this.getSpeed();
            break;
        case 'left':
            this.x -= this.getSpeed();
            break;
        case 'right':
            this.x += this.getSpeed();
            break;
        default: console.log('Wrong direction has been set');
            break;
    }
}

Bot.prototype.showPosition = function () {
    return console.log(`I am ${this.constructor.name} '${this.name}'.\
I am located at: ${this.getCoordinates().x}:${this.getCoordinates().y} `);
}

function Racebot(config) {
    Bot.call(this, config);
    this.previousMove = '';
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;

Racebot.prototype.move = function (direction) {
    const newSpeed = direction === this.previousMove ? this.getSpeed() + 1 : this.getDefaultSpeed();
    this.setSpeed(newSpeed);
    Bot.prototype.move.call(this, direction);
    this.previousMove = direction;
}

function Speedbot(config) {
    Bot.call(this, config);
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;

Speedbot.prototype.prepareEngine = function () {
    this.setSpeed(this.getSpeed() + 2);
}

Speedbot.prototype.move = function (direction) {
    Bot.prototype.move.call(this, direction);

    if (this.getSpeed() > this.getDefaultSpeed()) {
        this.setSpeed(this.getSpeed() - 1);
    }
}
