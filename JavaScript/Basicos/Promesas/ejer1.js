/**
 * function getData(url, success, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            success(JSON.parse(req.response));
        }
        else {
            error();
        }
    };
        req.send();
}

getData('https://swapi.dev/api/films', (result) => console.log(result), (error) => console.log(error))
 */


/**
 * async function getData(url, success, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            success(JSON.parse(req.response));
        }
        else {
            error();
        }
    };
        req.send();
}

getData('https://swapi.dev/api/films', (result) => console.log(result), (error) => console.log(error))
 */

/**
 * async function getData(url, success, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            success(JSON.parse(req.response));
        }
        else {
            error();
        }
    };
        req.send();
}


getData('https://swapi.dev/api/films', (result) => console.log('Bien'), (error) => console.log('Mal'))
getData('https://swapi.dev/api/people', (result) => console.log('Bien'), (error) => console.log('Mal'))
getData('https://swapi.dev/api/species', (result) => console.log('Bien'), (error) => console.log('Mal'))
 */

/**
 * async function getData(url, success, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            success(JSON.parse(req.response));
        }
        else {
            error();
        }
    };
        req.send();
}


let prom1 = getData('https://swapi.dev/api/films', (result) => console.log('Bien'), (error) => console.log('Mal'))

let prom2 = getData('https://swapi.dev/api/people', (result) => console.log('Bien'), (error) => console.log('Mal'))

let prom3 = getData('https://swapi.dev/api/species', (result) => console.log('Bien'), (error) => console.log('Mal'))

Promise.all([prom1,prom2,prom3]).then(console.log('Resuelto'))
 */

/**
 * async function getData(url, success, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            success(JSON.parse(req.response));
        }
        else {
            error();
        }
    };
        req.send();
}


let prom1 = getData('https://swapi.dev/api/films', (result) => console.log('Bien'), (error) => console.log('Mal')).then(console.log('Primera'))

let prom2 = getData('https://swapi.dev/api/people', (result) => console.log('Bien'), (error) => console.log('Mal'))

let prom3 = getData('https://swapi.dev/api/species', (result) => console.log('Bien'), (error) => console.log('Mal'))

Promise.all([prom1,prom2,prom3]).then(console.log('Resuelto'))
 */

/**
 * async function getData(url, success, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            success(JSON.parse(req.response));
        }
        else {
            error();
        }
    };
        req.send();
}


let prom1 = getData('https://swapi.dev/api/films', (result) => console.log('Bien'), (error) => console.log('Mal')).then(console.log('Primera'))

let prom2 = getData('https://swapi.dev/api/people', (result) => console.log('Bien'), (error) => console.log('Mal'))

let prom3 = getData('https://swapi.dev/api/species', (result) => console.log('Bien'), (error) => console.log('Mal'))

prom1.then(prom2).then(prom3).catch('Fallo')
 */