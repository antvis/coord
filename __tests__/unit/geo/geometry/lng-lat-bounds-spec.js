import { LngLatBounds, toLngLatBounds } from '../../../../src/coord/geo/geometry/lng-lat-bounds';
import { LngLat } from '../../../../src/coord/geo/geometry/lng-lat';
import { expect } from 'chai';
let a,
  d;
describe('Geo lngLatBounds', () => {
  beforeEach(() => {
    a = new LngLatBounds([ 112, 20 ], [ 120, 40 ]);
    d = new LngLatBounds();
  });
  it('constructor', () => {
    const b = new LngLatBounds([
      new LngLat(112, 20),
      new LngLat(120, 40),
    ]);
    expect(b).to.eql(a);
    expect(b.getNorthWest()).to.eql(new LngLat(112, 40));
    expect(d).to.be.an.instanceof(LngLatBounds);
  });
  it('#extend', () => {
    a.extend(new LngLat(110, 10));
    expect(a.getSouthWest()).to.eql(new LngLat(110, 10));
    a.extend([ [ 110, 10 ], [ 120, 50 ] ]);
    expect(a.getSouthEast()).to.eql(new LngLat(120, 10));
    expect(a.extend()).to.eql(a);
  });
  it('isValid', () => {
    expect(a.isValid()).to.be.true;
    expect(d.isValid()).to.be.false;
  });
  it('#pad', () => {
    const b = a.pad(0.5);
    expect(b).to.eql(new LngLatBounds([ [ 108, 10 ], [ 124, 50 ] ]));
  });
  it('#getCenter', () => {
    expect(a.getCenter()).to.eql(new LngLat(116, 30));
  });
  it('#getSouthWest', () => {
    expect(a.getSouthWest()).to.eql(new LngLat(112, 20));
  });
  it('#getNorthEast', () => {
    expect(a.getNorthEast()).to.eql(new LngLat(120, 40));
  });
  it('#getNorthWest', () => {
    expect(a.getNorthWest()).to.eql(new LngLat(112, 40));
  });
  it('#getSouthEast', () => {
    expect(a.getSouthEast()).to.eql(new LngLat(120, 20));
  });
  it('#getWest', () => {
    expect(a.getWest()).to.eql(112);
  });
  it('#getSouth', () => {
    expect(a.getSouth()).to.eql(20);
  });
  it('#getNorth', () => {
    expect(a.getNorth()).to.eql(40);
  });
  it('#getEast', () => {
    expect(a.getEast()).to.eql(120);
  });
  it('#contains', () => {
    expect(a.contains([ 115, 30 ])).to.eql(true);
    expect(a.contains([ 100, 20 ])).to.eql(false);
    expect(a.contains({ lng: 115, lat: 30 })).to.eql(true);
    expect(a.contains({ lng: 100, lat: 20 })).to.eql(false);
  });
  it('#intersects', () => {
    expect(a.intersects([ [ 115, 25 ], [ 117, 30 ] ])).to.eql(true);
    expect(a.intersects([ [ 120, 40 ], [ 121, 50 ] ])).to.eql(true);
  });
  it('#overlaps', () => {
    expect(a.overlaps([ [ 115, 25 ], [ 117, 30 ] ])).to.eql(true);
    expect(a.overlaps([ [ 120, 40 ], [ 121, 50 ] ])).to.eql(false);
  });
  it('#toBBoxString', () => {
    expect(a.toBBoxString()).to.eql('112,20,120,40');
  });
  it('#equals', () => {
    expect(a.equals([ [ 112, 20 ], [ 120, 40 ] ])).to.eql(true);
    expect(a.equals([ [ 112, 13 ], [ 120, 40 ] ])).to.eql(false);
    expect(a.equals(null)).to.eql(false);
  });
  it('#toLngLatBounds', () => {
    expect(toLngLatBounds([ 112, 20 ], [ 120, 40 ])).to.eql(a);
    expect(toLngLatBounds([ [ 112, 20 ], [ 120, 40 ] ])).to.eql(a);
    expect(toLngLatBounds(a)).to.eql(a);
  });


});
