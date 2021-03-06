'use strict';

const currify = require('currify');

const success = require('../success');
const ifNotFound = require('../if-not-found');
const addDirectory = currify(require('../directory').add);

module.exports = (runners, runItem, fn) => {
    const {
        name,
        cwd,
    } = runItem;
    
    Promise
        .resolve({name, runners})
        .then(checkName)
        .then(ifNotFound(name))
        .then(addDirectory(name, cwd))
        .then(success(fn))
        .catch(fn);
};

function checkName(options) {
    const {
        name,
        runners,
    } = options;
    
    if (!name)
        throw Error('name could not be empty');
    
    return runners;
}

