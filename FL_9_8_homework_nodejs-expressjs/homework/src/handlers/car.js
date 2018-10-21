const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../../db/data.json');

const getData = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
}

const createCarModel = (car) => {
    return {
        id: car.id,
        brand: car.brand,
        model: car.model,
        engineVolume: car.engineVolume,
        year: car.year
    };
}

const create = (req, res) => {
    let newCar = createCarModel(req.body);
    const carList = getData();

    if (carList.find((car) => car.id === req.body.id)) {
        res.status(409).send({ 'message': 'Car already exists.' });
    }

    carList.push(newCar);
    fs.writeFile(dbPath, JSON.stringify(carList));
    res.status(201).send(JSON.stringify(newCar));
}

const getAll = (req, res) => {
    const carList = getData();
    res.status(200).send(JSON.stringify(carList));
}

const getById = (req, res) => {
    const searchId = parseInt(req.params.id);
    const carList = getData();
    const findCar = carList.find(car => car.id === searchId);

    if (findCar) {
        res.status(200).send(JSON.stringify(findCar));
    } else {
        res.status(404).send({ 'message': 'There is no car with such id in the DB' });
    }
}

const update = (req, res) => {
    let carList = getData();
    const newCarData = createCarModel(req.body);
    const carToUpdate = carList.find(car => car.id === parseInt(req.params.id));

    if (carToUpdate) {
        carList = carList.map((car) => {
            return car.id === parseInt(req.params.id) ? Object.assign({ id: car.id }, newCarData) : car;
        });

        fs.writeFile(dbPath, JSON.stringify(carList));
        res.status(200).send(JSON.stringify(newCarData));
    } else {
        res.status(404).send();
    }
};


const remove = (req, res) => {
    const carList = getData();
    const carToRemove = carList.find(car => car.id === parseInt(req.params.id));

    if (carToRemove) {
        carList.splice(carList.indexOf(carToRemove), 1);
        fs.writeFile(dbPath, JSON.stringify(carList));
        res.status(200).send({ 'message': 'The car has been successfully removed' });
    } else {
        res.status(404).send();
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}