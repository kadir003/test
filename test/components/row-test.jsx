'use strict';

var assert = require('assert');

describe('Row', () => {
  describe('defaults', () => {
    var row;

    beforeEach(() => {
      row = renderComponent(<Row />);
    });

    it('should be able to accept styles', () => {
      row = renderComponent(<Row style={{marginTop: 20}} />);
      assert(row.style._values.hasOwnProperty('margin-top')
          && row.style._values['margin-top'] === '20px');
    });

    it('should be able to accept classes', () => {
      row = renderComponent(<Row className='extra-class-name' />);
      assert(row.className.search('row') !== -1);
      assert(row.className.search('extra-class-name') !== -1);
    });

    it('should be able to accept children', () => {
      assert(row.childNodes.length === 0); // default row
      row = renderComponent(<Row><div>child node</div></Row>); // added 1 child node
      assert(row.className.search('row') !== -1);
      assert(row.childNodes.length === 1);
    });

    it('should have class row by default', () => {
      assert(row.className.search('row') !== -1);
    });
  });
});
