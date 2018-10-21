const fs = require('fs');
const dbPath = '/db/data.json';

const getData = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
}

const create = (req, res) => {
    // let newCar = {
    //     id: req.body.id,
    //     brand: req.body.brand,
    //     model: req.body.model,
    //     engineVolume: req.body.engineVolume,
    //     year: req.body.year
    // };

    const newCar = req.body;
    const carList = getData();

    //(carList.find((car) => car.id === newCar.id)
    if (carList.find((car) => car.id === req.body.id)) {
        res.status(409).send({ 'message': 'Car already exists.' });
    }

    carList.push(newCar);
    fs.writeFile(dbPath, JSON.stringify(carList));
    res.status(201).send(JSON.stringify(newCar));
}

const getAll = (req, res) => {
    const carList = getData();
    res.status(200).send(JSON.stringify(carsList));
}

// .get(function(req, res) {
//     Bear.findById(req.params.bear_id, function(err, bear) {
//         if (err)
//             res.send(err);
//         res.json(bear);
//     });
// });

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
    // const carData = {
    //     id: req.body.id,
    //     brand: req.body.brand,
    //     model: req.body.model,
    //     engineVolume: req.body.engineVolume,
    //     year: req.body.year
    // };

    const newCarData = req.body;
    //const carId = req.params.id;
    let carList = getData();

    if (!carList.find((car) => car.id === parseInt(newCarData.id))) {
        res.status(404);
    }
    carList = carList.map((car) => {
        if (car.id === parseInt(newCarData.id)) {
            return Object.assign({ id: car.id }, newCarData);
        } else {
            return car;
        }
    });

    fs.writeFile(dbPath, JSON.stringify(carList));
    res.status(200).send(JSON.stringify(newCarData));
};

const remove = (req, res) => {
    const carId = parseInt(req.params.id);
    const carList = getData();
    const carToRemove = carList.find(car => car.id === carId);
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