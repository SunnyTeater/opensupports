const _ = require('lodash');
const APIUtils = require('lib-core/APIUtils');
const SessionStore = require('lib-app/session-store');

const root = 'http://localhost:3000/api/';

function processData (data) {
    return _.extend(SessionStore.getSessionData(), data);
}

module.exports = {
    call: function ({path, data}) {
        return new Promise(function (resolve, reject) {
            APIUtils.post(root + path, processData(data)).then(function (result) {
                console.log(result);

                if (result.status === 'success') {
                    resolve(result);
                } else if (reject) {
                    reject(result);
                }
            });
        });
    }
};