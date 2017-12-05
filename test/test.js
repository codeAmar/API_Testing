// import { assert } from 'chai';
// import { expect } from 'chai';
import {describe,it} from 'mocha';
import { should } from 'chai';
should();

describe('just an random test',()=>{
    it('test one ',()=>{
        ([1,2,3]).should.be.an('array');
    })
})


