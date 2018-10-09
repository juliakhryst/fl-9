let victimDataSource = (name) => {
    const victimsByName = {
        'John': {
            name: 'John',
            surname: 'Doe',
            age: '99',
            jobTitle: 'Victim'
        },
        'Jennifer': {
            name: 'Jennifer',
            surname: 'Nicker',
            age: '21',
            jobTitle: 'Artist'
        }
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (victimsByName.hasOwnProperty(name)) {
                resolve(victimsByName[name]);
            } else {
                reject('unknown victim');
            }
        }, 1000);
    });
}

let crimeDataSource = (surname) => {
    return new Promise((resolve, reject) => {
        const crimeBySurname = {
            'Doe': {
                title: 'dank memes',
                place: '9gag'
            },
            'Nicker': {
                title: 'robbery',
                place: 'NYC'
            }
        };

        setTimeout(() => {
            if (crimeBySurname.hasOwnProperty(surname)) {
                resolve(crimeBySurname[surname]);
            } else {
                reject('unknown surname');
            }
        }, 500);
    });
}

let loadVictimData = (name) => {
    return new Promise((resolve, reject) => {
        victimDataSource(name).then((victimObj) => {
            crimeDataSource(victimObj.surname).then(crimeObj => {
                if (victimObj && crimeObj) {
                    const { name, surname, age, jobTitle } = victimObj;
                    const { title, place } = crimeObj;

                    resolve(`${name} ${surname}(${jobTitle}, ${age}) suffered from ${title} in ${place}.`);
                } else {
                    reject('Invalid request');
                }
            });
        }).catch(error => resolve(`An error occured: ${error}`));
    });

}

loadVictimData('John').then(msg => console.log(msg));
loadVictimData('Jennifer').then(msg => console.log(msg));
loadVictimData('Jss').then(msg => console.log(msg));