let login;
let passw;

do {
    login = prompt('Please enter your login:');
    if (!login) {
        alert('Canceled');
        break;
    }

    if (login.length < 4) {
        alert('I don\'t know any users having name length less than 4 symbols');
        continue;
    }

    if (login !== 'User') {
        alert('I don’t know you.');
    }
} while (login !== 'User');

if (login) {
    do {
        passw = prompt('Please enter your password:');
        if (!passw) {
            alert('Canceled');
            break;
        }
        if (passw !== 'SuperUser') {
            alert('Wrong password');
        }
    } while (passw !== 'SuperUser');
}

if (passw) {
    alert(new Date().getHours() < 20 ? 'Good day!' : 'Good evening!');
}