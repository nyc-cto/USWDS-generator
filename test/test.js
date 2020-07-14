/* eslint-env mocha */
// eslint-disable-next-line spaced-comment
/*eslint linebreak-style: ["error", "windows"] */

const assert = require('assert');

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// npm test 
// npm run lint
