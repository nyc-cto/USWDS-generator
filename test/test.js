/* eslint-env mocha */ 
// eslint-disable-next-line spaced-comment
/*eslint linebreak-style: ["error", "windows"] */

let assert = require('assert');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// to run your use 
// npm test 
// npm run lint
