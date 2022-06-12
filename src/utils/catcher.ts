/**
 *
 * @param {*} fn
 * @returns {Promise}
 * Automatically handles and catches
 */
export const catcher =
  (fn: Function, cb?: Function) => (req: any, response: any) => {
    Promise.resolve(fn(req, response)).catch((err) => {
      if (cb) {
        cb(req, response);
        return;
      }
      console.log(err);
      response.status(500).send({ msg: err.message || err });
    });
  };
