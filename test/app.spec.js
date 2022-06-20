const assert = require('assert');
const { expect } = require('chai');
const { add, sub } = require('../src/app')

describe('the add function', function () {
  it('should add 2 function together', function () {
    const result = add(2, 2)
    expect(result).to.be.eq(4);
  })
  it('should be able to handle one number', function () {
    const result = add(2);
    expect(result).to.be.eq(2);
  })

  it('should be handle no inputs', function () {
    const result = add();
    expect(result).to.be.eq(0);
  })

  it('should return zero if either arg is not a number', function () {
    const result = add('a', 2);
    expect(result).to.be.eq(0);
  })
})

describe('the subtract function', function () {
  it('should subtract 2 numbers together', function () {
    const result = sub(2, 2)
    expect(result).to.be.eq(0);
  })
  it('should be able to handle one number', function () {
    const result = sub(2);
    expect(result).to.be.eq(2);
  })

  it('should be handle no inputs', function () {
    const result = sub();
    expect(result).to.be.eq(0);
  })

  it('should return zero if either arg is not a number', function () {
    const result = sub('a', 2);
    expect(result).to.be.eq(0);
  })
})
