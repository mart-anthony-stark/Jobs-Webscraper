"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catcher = void 0;
/**
 *
 * @param {*} fn
 * @returns {Promise}
 * Automatically handles and catches
 */
const catcher = (fn, cb) => (req, response) => {
    Promise.resolve(fn(req, response)).catch((err) => {
        if (cb) {
            cb(req, response);
            return;
        }
        console.log(err);
        response.status(500).send({ msg: err.message || err });
    });
};
exports.catcher = catcher;
