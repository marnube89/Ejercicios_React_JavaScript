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
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            resolve(success(JSON.parse(req.response)));
        }
        else {
            reject(error());
        }
    };
        req.send();
    })
}

getData('https://swapi.dev/api/films', (result) => console.log(result), (error) => console.log(error))
 */

/**
 * async function getData(url, success, error) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            resolve(success(JSON.parse(req.response)));
        }
        else {
            reject(error());
        }
    };
        req.send();
    })
}

getData('https://swapi.dev/api/films', (result) => console.log('Bien'), (error) => console.log('Mal'))
getData('https://swapi.dev/api/people', (result) => console.log('Bien'), (error) => console.log('Mal'))
getData('https://swapi.dev/api/species', (result) => console.log('Bien'), (error) => console.log('Mal'))
 */

/**
 * async function getData(url, success, error) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            resolve(success(JSON.parse(req.response)));
        }
        else {
            reject(error());
        }
    };
        req.send();
    })
}


let prom1 = getData('https://swapi.dev/api/films', (result) => console.log('Bien1'), (error) => console.log('Mal'))

let prom2 = getData('https://swapi.dev/api/people', (result) => console.log('Bien2'), (error) => console.log('Mal'))

let prom3 = getData('https://swapi.dev/api/species', (result) => console.log('Bien3'), (error) => console.log('Mal'))

await Promise.all([prom1,prom2,prom3]).then(result => console.log('Resuelto'))
 */

/**
 * async function getData(url, success, error) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            resolve(success(JSON.parse(req.response)));
        }
        else {
            reject(error());
        }
    };
        req.send();
    })
}


let prom1 = getData('https://swapi.dev/api/films', (result) => result = 'promesa1', (error) => console.log('Mal'))

let prom2 = getData('https://swapi.dev/api/people', (result) => result = 'promesa2', (error) => console.log('Mal'))

let prom3 = getData('https://swapi.dev/api/species', (result) => result = 'promesa3', (error) => console.log('Mal'))

await Promise.race([prom1,prom2,prom3]).then(result => console.log(result)).catch((error) => console.log('Fallo'))
 */

/**
 * async function getData(url, success, error) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
    req.open('GET', url); //

    req.onload = function() {
        if (req.status == 200) {
            resolve(success(JSON.parse(req.response)));
        }
        else {
            reject(error());
        }
    };
        req.send();
    })
}


let prom1 = getData('https://swapi.dev/api/films', (result) => console.log('Bien1'), (error) => console.log('Mal'))

let prom2 = getData('https://swapi.dev/api/people', (result) => console.log('Bien2'), (error) => console.log('Mal'))

let prom3 = getData('https://swapi.dev/api/species', (result) => console.log('Bien3'), (error) => console.log('Mal'))

prom1.then(prom2).then(prom3).catch('Fallo')
 */