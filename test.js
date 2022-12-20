import expect from 'expect.js';
import { createFilter as filter, isFeatureFilter } from './index.js';
/*!
    Feature Filter by

    (c) mapbox 2016
    www.mapbox.com
    License: MIT, header required.
*/

describe('FeatureFilter', function () {

    it('degenerate', function () {
        expect(filter()()).to.be.ok();
        expect(filter(undefined)()).to.be.ok();
        expect(filter(null)()).to.be.ok();

    });

    it('==, string', function () {
        var condition = ['==', 'foo', 'bar'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 'bar' }})).to.be.ok();
        expect(f({ properties: { foo: 'baz' }})).not.to.be.ok();

    });

    it('==, number', function () {
        var condition = ['==', 'foo', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();
        expect(f({ properties: {}})).not.to.be.ok();

    });

    it('==, null', function () {
        var condition = ['==', 'foo', null];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();
        expect(f({ properties: {}})).not.to.be.ok();

    });

    it('==, $type', function () {
        var condition = ['==', '$type', 'LineString'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ type: 1 })).not.to.be.ok();
        expect(f({ type: 2 })).to.be.ok();

    });

    it('!=, string', function () {
        var condition = ['!=', 'foo', 'bar'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 'bar' }})).not.to.be.ok();
        expect(f({ properties: { foo: 'baz' }})).to.be.ok();

    });

    it('!=, number', function () {
        var condition = ['!=', 'foo', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).to.be.ok();
        expect(f({ properties: { foo: '0' }})).to.be.ok();
        expect(f({ properties: { foo: true }})).to.be.ok();
        expect(f({ properties: { foo: false }})).to.be.ok();
        expect(f({ properties: { foo: null }})).to.be.ok();
        expect(f({ properties: { foo: undefined }})).to.be.ok();
        expect(f({ properties: {}})).to.be.ok();

    });

    it('!=, null', function () {
        var condition = ['!=', 'foo', null];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: 1 }})).to.be.ok();
        expect(f({ properties: { foo: '0' }})).to.be.ok();
        expect(f({ properties: { foo: true }})).to.be.ok();
        expect(f({ properties: { foo: false }})).to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).to.be.ok();
        expect(f({ properties: {}})).to.be.ok();

    });

    it('!=, $type', function () {
        var condition = ['!=', '$type', 'LineString'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ type: 1 })).to.be.ok();
        expect(f({ type: 2 })).not.to.be.ok();

    });

    it('<, number', function () {
        var condition = ['<', 'foo', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: -1 }})).to.be.ok();
        expect(f({ properties: { foo: '1' }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: '-1' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();
        expect(f({ properties: {}})).not.to.be.ok();

    });

    it('<, string', function () {
        var condition = ['<', 'foo', '0'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: -1 }})).not.to.be.ok();
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '1' }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: '-1' }})).to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();

    });

    it('<=, number', function () {
        var condition = ['<=', 'foo', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: -1 }})).to.be.ok();
        expect(f({ properties: { foo: '1' }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: '-1' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();
        expect(f({ properties: {}})).not.to.be.ok();

    });

    it('<=, string', function () {
        var condition = ['<=', 'foo', '0'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: -1 }})).not.to.be.ok();
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '1' }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).to.be.ok();
        expect(f({ properties: { foo: '-1' }})).to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();

    });

    it('>, number', function () {
        var condition = ['>', 'foo', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 1 }})).to.be.ok();
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: -1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '1' }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: '-1' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();
        expect(f({ properties: {}})).not.to.be.ok();

    });

    it('>, string', function () {
        var condition = ['>', 'foo', '0'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: -1 }})).not.to.be.ok();
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '1' }})).to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: '-1' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();

    });

    it('>=, number', function () {
        var condition = ['>=', 'foo', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 1 }})).to.be.ok();
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: -1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '1' }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: '-1' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();
        expect(f({ properties: {}})).not.to.be.ok();

    });

    it('>=, string', function () {
        var condition = ['>=', 'foo', '0'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: -1 }})).not.to.be.ok();
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '1' }})).to.be.ok();
        expect(f({ properties: { foo: '0' }})).to.be.ok();
        expect(f({ properties: { foo: '-1' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();

    });

    it('in, degenerate', function () {
        var condition = ['in', 'foo'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();

    });

    it('in, string', function () {
        var condition = ['in', 'foo', '0'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();
        expect(f({ properties: {}})).not.to.be.ok();

    });

    it('in, number', function () {
        var condition = ['in', 'foo', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();

    });

    it('in, null', function () {
        var condition = ['in', 'foo', null];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: true }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();

    });

    it('in, multiple', function () {
        var condition = ['in', 'foo', 0, 1];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: 1 }})).to.be.ok();
        expect(f({ properties: { foo: 3 }})).not.to.be.ok();

    });

    it('in, large_multiple', function () {
        var condition = ['in', 'foo'].concat(Array.apply(null, { length: 2000 }).map(Number.call, Number));
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: 1 }})).to.be.ok();
        expect(f({ properties: { foo: 1999 }})).to.be.ok();
        expect(f({ properties: { foo: 2000 }})).not.to.be.ok();

    });

    it('in, $type', function () {
        var condition = ['in', '$type', 'LineString', 'Polygon'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ type: 1 })).not.to.be.ok();
        expect(f({ type: 2 })).to.be.ok();
        expect(f({ type: 3 })).to.be.ok();

        var f1 = filter(['in', '$type', 'Polygon', 'LineString', 'Point']);
        expect(f1({ type: 1 })).to.be.ok();
        expect(f1({ type: 2 })).to.be.ok();
        expect(f1({ type: 3 })).to.be.ok();


    });

    it('!in, degenerate', function () {
        var condition = ['!in', 'foo'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 1 }})).to.be.ok();

    });

    it('!in, string', function () {
        var condition = ['!in', 'foo', '0'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).to.be.ok();
        expect(f({ properties: { foo: undefined }})).to.be.ok();
        expect(f({ properties: {}})).to.be.ok();

    });

    it('!in, number', function () {
        var condition = ['!in', 'foo', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).to.be.ok();
        expect(f({ properties: { foo: null }})).to.be.ok();
        expect(f({ properties: { foo: undefined }})).to.be.ok();

    });

    it('!in, null', function () {
        var condition = ['!in', 'foo', null];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: '0' }})).to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).to.be.ok();

    });

    it('!in, multiple', function () {
        var condition = ['!in', 'foo', 0, 1];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: 3 }})).to.be.ok();

    });

    it('!in, large_multiple', function () {
        var condition = ['!in', 'foo'].concat(Array.apply(null, { length: 2000 }).map(Number.call, Number));
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1999 }})).not.to.be.ok();
        expect(f({ properties: { foo: 2000 }})).to.be.ok();

    });

    it('!in, $type', function () {
        var condition = ['!in', '$type', 'LineString', 'Polygon'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ type: 1 })).to.be.ok();
        expect(f({ type: 2 })).not.to.be.ok();
        expect(f({ type: 3 })).not.to.be.ok();

    });

    it('any', function () {
        var condition1 = ['any'];
        expect(isFeatureFilter(condition1)).to.be.ok();
        var f1 = filter(condition1);
        expect(f1({ properties: { foo: 1 }})).not.to.be.ok();

        var condition2 = ['any', ['==', 'foo', 1]];
        expect(isFeatureFilter(condition2)).to.be.ok();
        var f2 = filter(condition2);
        expect(f2({ properties: { foo: 1 }})).to.be.ok();

        var condition3 = ['any', ['==', 'foo', 0]];
        expect(isFeatureFilter(condition3)).to.be.ok();
        var f3 = filter(condition3);
        expect(f3({ properties: { foo: 1 }})).not.to.be.ok();

        var condition4 = ['any', ['==', 'foo', 0], ['==', 'foo', 1]];
        expect(isFeatureFilter(condition4)).to.be.ok();
        var f4 = filter(condition4);
        expect(f4({ properties: { foo: 1 }})).to.be.ok();


    });

    it('all', function () {
        var f1 = filter(['all']);
        expect(f1({ properties: { foo: 1 }})).to.be.ok();

        var f2 = filter(['all', ['==', 'foo', 1]]);
        expect(f2({ properties: { foo: 1 }})).to.be.ok();

        var f3 = filter(['all', ['==', 'foo', 0]]);
        expect(f3({ properties: { foo: 1 }})).not.to.be.ok();

        var f4 = filter(['all', ['==', 'foo', 0], ['==', 'foo', 1]]);
        expect(f4({ properties: { foo: 1 }})).not.to.be.ok();


    });

    it('none', function () {
        var f1 = filter(['none']);
        expect(f1({ properties: { foo: 1 }})).to.be.ok();

        var f2 = filter(['none', ['==', 'foo', 1]]);
        expect(f2({ properties: { foo: 1 }})).not.to.be.ok();

        var f3 = filter(['none', ['==', 'foo', 0]]);
        expect(f3({ properties: { foo: 1 }})).to.be.ok();

        var f4 = filter(['none', ['==', 'foo', 0], ['==', 'foo', 1]]);
        expect(f4({ properties: { foo: 1 }})).not.to.be.ok();
    });

    it('has', function () {
        var condition = ['has', 'foo'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).to.be.ok();
        expect(f({ properties: { foo: 1 }})).to.be.ok();
        expect(f({ properties: { foo: '0' }})).to.be.ok();
        expect(f({ properties: { foo: true }})).to.be.ok();
        expect(f({ properties: { foo: false }})).to.be.ok();
        expect(f({ properties: { foo: null }})).to.be.ok();
        expect(f({ properties: { foo: undefined }})).to.be.ok();
        expect(f({ properties: {}})).not.to.be.ok();

    });

    it('!has', function () {
        var condition = ['!has', 'foo'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: 0 }})).not.to.be.ok();
        expect(f({ properties: { foo: 1 }})).not.to.be.ok();
        expect(f({ properties: { foo: '0' }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: false }})).not.to.be.ok();
        expect(f({ properties: { foo: null }})).not.to.be.ok();
        expect(f({ properties: { foo: undefined }})).not.to.be.ok();
        expect(f({ properties: {}})).to.be.ok();

    });

    it('==, $id', function () {
        var condition = ['==', '$id', 1];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ id: 1 })).to.be.ok();
        expect(f({ id: 2 })).not.to.be.ok();

    });

    it('==, $subType', function () {
        var condition = ['==', '$subType', 'Label'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ subType: 'Label' })).to.be.ok();
        expect(f({ subType: 'Circle' })).not.to.be.ok();

    });

    it('contains, item', function () {
        var condition = ['contains', 'foo', 'bar'];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: '1b0ar2' }})).not.to.be.ok();
        expect(f({ properties: { foo: '1bar2' }})).to.be.ok();
    });

    it('contains, item at start', function () {
        var condition = ['contains', 'foo', 'bar', 0];
        expect(isFeatureFilter(condition)).to.be.ok();
        var f = filter(condition);
        expect(f({ properties: { foo: '1bar21' }})).not.to.be.ok();
        expect(f({ properties: { foo: 'bar21' }})).to.be.ok();
    });

    const feature = { properties: { name: 123 }};
    const proWithfun = { property: 'name', op: 'length' };

    it('> with length fun', function () {
        var condition1 = ['>', proWithfun, 1];
        expect(isFeatureFilter(condition1)).to.be.ok();

        var f = filter(condition1);
        expect(f(feature)).to.be.ok();

        var f1 = filter(['>', proWithfun, 4]);
        expect(f1(feature)).not.to.be.ok();
    });

    it('>= with length fun', function () {
        var f = filter(['>=', proWithfun, 3]);
        expect(f(feature)).to.be.ok();

        var f1 = filter(['>=', proWithfun, 4]);
        expect(f1(feature)).not.to.be.ok();
    });

    it('< with length fun', function () {
        var f = filter(['<', proWithfun, 5]);
        expect(f(feature)).to.be.ok();

        var f1 = filter(['<', proWithfun, 2]);
        expect(f1(feature)).not.to.be.ok();
    });

    it('<= with length fun', function () {
        var f = filter(['<=', proWithfun, 3]);
        expect(f(feature)).to.be.ok();

        var f1 = filter(['<=', proWithfun, 2]);
        expect(f1(feature)).not.to.be.ok();
    });

    it('== with length fun', function () {
        var f = filter(['==', proWithfun, 3]);
        expect(f(feature)).to.be.ok();

        var f1 = filter(['==', proWithfun, 4]);
        expect(f1(feature)).not.to.be.ok();
    });
    it('!= with length fun', function () {
        var f = filter(['!=', proWithfun, 1]);
        expect(f(feature)).to.be.ok();

        var f1 = filter(['!=', proWithfun, 3]);
        expect(f1(feature)).not.to.be.ok();
    });

});
