const http = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } else {
                        reject('Error ' + xhr.status + ': ' + xhr.statusText);
                    }
                }
            };
        });
    }
};


function track() {
    let lat = document.getElementById('lat').value;
    let lon = document.getElementById('lon').value;
    let url = `https://api.onwater.io/api/v1/results/${lat},${lon}`;

    http.get(url)
        .then(res => {
            let text = document.getElementById('type');
            text.innerHTML = res.water ? 'Water' : 'Land';
            text.style.color = res.water ? '#3877c4' : '#bdc763';
            if (res.water) {
                document.getElementById('water').style.display = 'block';
                document.getElementById('land').style.display = 'none';
            } else {
                document.getElementById('water').style.display = 'none';
                document.getElementById('land').style.display = 'block';
            }

        })
        .catch(err => {
            let text = document.getElementById('type');
            text.innerHTML = err;
            text.style.color = '#82091f';
            document.getElementById('water').style.display = 'none';
            document.getElementById('land').style.display = 'none';
        });
}

let trackButton = document.getElementById('track-button');
trackButton.addEventListener('click', track);