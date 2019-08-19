import { expect } from 'chai';
import { LngLat, toLngLat } from '../../../../src/coord/geo/geometry/lng-lat';
import { LngLatBounds } from '../../../../src/coord/geo/geometry/lng-lat-bounds';
describe('Geo lngLat', () => {
  it('constructor', () => {
    let lnglat = new LngLat(120.2, 30.56);
    expect(lnglat.lng).to.eql(120.2);
    expect(lnglat.lat).to.eql(30.56);
    lnglat = new LngLat(120.2, 30.56, 300);
    expect(lnglat.lng).to.eql(120.2);
    expect(lnglat.lat).to.eql(30.56);
    expect(lnglat.alt).to.eql(300);
    expect(function() {
      new LngLat(NaN, NaN);
    }).to.throw();

  });
  it('#equal', () => {
    const lnglat1 = new LngLat(112.12, 30.56);
    const lnglat2 = new LngLat(112.12, 30.500);
    expect(lnglat1.equals(lnglat1)).to.be.true;
    expect(lnglat1.equals(lnglat2)).to.be.false;
    expect(lnglat1.equals()).to.be.false;
    expect(lnglat1.equals(lnglat2, 1)).to.be.true;

  });
  it('#toString', () => {
    const a = new LngLat(10.333333333, 20.2222222);
    expect(a.toString(3)).to.eql('LngLat(10.333, 20.222)');
    expect(a.toString()).to.eql('LngLat(10.333333, 20.222222)');
  });
  it('#distanceTo', () => {
    const a = new LngLat(112.45, 30.5),
      b = new LngLat(110.46, 31.33);
    expect(Math.abs(Math.round(a.distanceTo(b) / 1000) - 211.3173) < 1).to.eql(true);
  });
  it('#clone', () => {
    const a = new LngLat(50.5, 30.5, 100),
      b = a.clone();
    expect(b.lat).to.equal(30.5);
    expect(b.lng).to.equal(50.5);
    expect(b.alt).to.equal(100);
  });
  it('#warp', () => {
    const a = new LngLat(60.0, 10);
    const b = new LngLat(181.0, 91);
    expect(a.wrap()).to.eql(a);
    expect(b.wrap()).to.eql(new LngLat(-179, 91));
  });
  it('#toBounds', () => {
    const a = new LngLat(112.32, 30.11);
    const b = new LngLatBounds([ [ 112.3148078, 30.10550842 ], [ 112.32519219043, 30.11449157 ] ]);
    expect(b.equals(a.toBounds(1000), 0.000001)).to.be.true;

  });
  it('#toLnglat', () => {
    const a = new LngLat(112.32, 30.11);
    const b = new LngLat(112.32, 30.11, 123);
    expect(toLngLat(a)).to.eql(a);
    expect(toLngLat([ 112.32, 30.11 ])).to.eql(a);
    expect(toLngLat([ 112.32, 30.11, 123 ])).to.eql(b);
    expect(toLngLat({ lng: 112.32, lat: 30.11, alt: 123 })).to.eql(b);
    expect(toLngLat({ lng: 112.32, lat: 30.11 })).to.eql(a);
  });

});
