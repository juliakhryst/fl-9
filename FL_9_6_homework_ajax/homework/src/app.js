const http = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                       console.log('xhr done successfully');
                       var response = JSON.parse(xhr.responseText);
                       resolve(response);
                    } else {
                       reject('Error ' + xhr.status + ': ' + xhr.statusText);
                       console.log('xhr failed');
                    }
                } else {
                    console.log('xhr processing going on');
                }
            }
        })
    }
}


function track() {
    console.log('track');
    let lat = document.getElementById('lat').value;
    let lon = document.getElementById('lon').value;
    let url = `https://api.onwater.io/api/v1/results/${lat},${lon}`;

    http.get(url)
        .then(res => {
            console.log(res);
            let text = document.getElementById('text');
            text.innerHTML = res.water ? 'Water' : 'Land';
        })
        .catch(err => {
            console.log(err);
        });

}