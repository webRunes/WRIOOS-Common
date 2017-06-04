/**
 * Created by michbil on 04.06.17.
 */
const CORSomainMatch = require('../src/server/CORSDomainMatch');
const should = require('should');

describe("should allow correct domains access to the XHR requrests", ()=>{
    it('should allow dev server to use cors headers', () => {
        CORSomainMatch('http://core_d.wrioos.com','.wrioos.com').should.be.true();
        CORSomainMatch('http://core_d.wrioos.com:3033','.wrioos.com').should.be.true();
        CORSomainMatch('http://core_d.wriodos.com:3033','.wrioos.com').should.be.false();
        CORSomainMatch('http://core_d.wrioos.local','.wrioos.com').should.be.false();
        CORSomainMatch('https://core_d.wrioos.local','.wrioos.com').should.be.false();
        CORSomainMatch('http://core_d.wrioos.local:3034','.wrioos.com').should.be.false();
    });
});
