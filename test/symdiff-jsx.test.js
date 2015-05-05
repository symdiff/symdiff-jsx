var extract = require('../index'),
    fs = require('fs'),
    path = require('path'),
    FIXTURE_PATH = path.resolve('./test/fixtures'),
    goodJSX = String(fs.readFileSync( FIXTURE_PATH + '/good.jsx')),
    invalidJSX = String(fs.readFileSync( FIXTURE_PATH + '/invalid.jsx'));


describe('symdiff-jsx', function() {
    it('should work with empty jsx', function() {
        var result = extract('');
        expect(result.length).to.equal(0);
    });

    it('should work with invalid jsx', function() {
        var result = extract(invalidJSX);
        expect(result.length).to.equal(0);
    })

    it('should extract literal classes', function() {
        var result = extract(goodJSX);
        expect(result.length).to.equal(2);
        expect(result.indexOf('ape')).to.not.equal(-1);
        expect(result.indexOf('abraham')).to.not.equal(-1);
    });
});