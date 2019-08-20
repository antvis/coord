import { expect } from 'chai';
import { getCRS } from '../../../../src/coord/geo/crs/index';
import { Point } from '../../../../src/coord/geo/geometry/point';
import { LngLat, toLngLat } from '../../../../src/coord/geo/geometry/lng-lat';
import { LngLatBounds } from '../../../../src/coord/geo/geometry/lng-lat-bounds';
const simple = getCRS('simple');
const epsg3857 = getCRS('EPSG3857');
const earth = getCRS('Earth');

/**
 * 地理坐标系
 */
describe('CRS-earth', () => {

  it('#distance', () => {
    const a = new LngLat(112.45, 30.5),
      b = new LngLat(110.46, 31.33);
    expect(Math.abs(Math.round(earth.distance(a, b) / 1000) - 211.3173) < 1).to.eql(true);
  });
});
describe('CRS-Simple', () => {

  it('#lnglatToPoint', () => {

    expect(simple.lngLatToPoint(new LngLat(0, 0), 0).equals(new Point(0, 0), 0.001)).to.be.true;
    expect(simple.lngLatToPoint(new LngLat(300, 700), 0).equals(new Point(300, -700), 0.01)).to.be.true;
    expect(simple.lngLatToPoint(new LngLat(1000, -200), 1).equals(new Point(2000, 400), 0.01)).to.be.true;
  });
  it('#pointToLngLat', () => {
    expect(simple.pointToLngLat(new Point(0, 0), 0).equals(new LngLat(0, 0), 0.001)).to.be.true;
    expect(simple.pointToLngLat(new Point(300, -700), 0).equals(new LngLat(300, 700), 0.001)).to.be.true;
    expect(simple.pointToLngLat(new Point(2000, 400), 1).equals(new LngLat(1000, -200), 0.001)).to.be.true;
  });
  it('#getProjectedBounds', () => {

  });
  it('#wrapLatLng', () => {

  });
  it('#scale&zoom', () => {
    expect(simple.scale(5)).to.eql(32);
    expect(simple.zoom(32)).to.eql(5);

  });
  it('#distance', () => {
    expect(simple.distance(new LngLat(0, 0), new LngLat(30, 40))).to.eql(50);
  });
});
describe('CRS-3857', () => {
  it('#lnglatToPoint', () => {
    expect(epsg3857.lngLatToPoint(toLngLat(180, 85.0511287798), 0).round().equals(new Point(256, 0), 0)).to.be.true;
    expect(epsg3857.lngLatToPoint(toLngLat(0, 0), 0)).to.eql(new Point(128, 128));
    expect(epsg3857.lngLatToPoint(toLngLat(180, 85.0511287798), 1).round().equals(new Point(512, 0), 0)).to.be.true;
    expect(epsg3857.lngLatToPoint(toLngLat(0, 0), 1)).to.eql(new Point(256, 256));

  });
  it('#pointToLngLat', () => {
    expect(epsg3857.pointToLngLat(new Point(128, 128), 0)).to.eql(new LngLat(0, 0), 0.01);
    expect(epsg3857.pointToLngLat(new Point(256, 256), 1)).to.eql(new LngLat(0, 0), 0.01);
    expect(epsg3857.pointToLngLat(new Point(256, 0), 0).equals(new LngLat(180, 85.0511287798), 0.001)).to.be.true;
    expect(epsg3857.pointToLngLat(new Point(512, 0), 1).equals(new LngLat(180, 85.0511287798), 0.001)).to.be.true;

  });
  it('#project', () => {
    expect(epsg3857.project(new LngLat(30, 50)).equals(new Point(3339584.7238, 6446275.84102), 0.01)).to.be.true;
    expect(epsg3857.project(new LngLat(180, 85.0511287798)).equals(new Point(20037508.34279, 20037508.34278), 0.01)).to.be.true;
    expect(epsg3857.project(new LngLat(-180, -85.0511287798)).equals(new Point(-20037508.34279, -20037508.34278), 0.01)).to.be.true;

  });
  it('#unproject', () => {
    expect(epsg3857.unproject(new Point(3339584.7238, 6446275.84102)).equals(new LngLat(30, 50), 0.01)).to.be.true;
    expect(epsg3857.unproject(new Point(20037508.34279, 20037508.34278)).equals(new LngLat(180, 85.0511287798), 0.01)).to.be.true;
    expect(epsg3857.unproject(new Point(-20037508.34279, -20037508.34278)).equals(new LngLat(-180, -85.0511287798), 0.01)).to.be.true;
  });
  it('#zoom && scale', () => {
    const zoom = 5;
    const scale = epsg3857.scale(zoom);
    expect(epsg3857.zoom(scale)).to.eql(zoom);
  });

  it('#getProjectedBounds', () => {
    let i,
      worldSize = 256,
      crsSize;
    for (i = 0; i <= 22; i++) {
      crsSize = epsg3857.getProjectedBounds(i).getSize();
      expect(crsSize.x).equal(worldSize);
      expect(crsSize.y).equal(worldSize);
      worldSize *= 2;
    }
  });
  it('#wrapLngLat', () => {

    expect(epsg3857.wrapLngLat(new LngLat(190, 0)).lng).to.eql(-170);
    expect(epsg3857.wrapLngLat(new LngLat(360, 0)).lng).to.eql(0);
    expect(epsg3857.wrapLngLat(new LngLat(380, 0)).lng).to.eql(20);
    expect(epsg3857.wrapLngLat(new LngLat(-190, 0)).lng).to.eql(170);
    expect(epsg3857.wrapLngLat(new LngLat(-360, 0)).lng).to.eql(0);
    expect(epsg3857.wrapLngLat(new LngLat(-380, 0)).lng).to.eql(-20);
    expect(epsg3857.wrapLngLat(new LngLat(90, 0)).lng).to.eql(90);
    expect(epsg3857.wrapLngLat(new LngLat(180, 0)).lng).to.eql(180);
    expect(epsg3857.wrapLngLat(new LngLat(190, 0, 1234)).lng).to.eql(-170);
  });
  it('#wrapLngLatBounds', () => {
    let bounds1 = new LngLatBounds([ -185, 0 ], [ -170, 10 ]);
    let bounds2 = new LngLatBounds([ -190, 0 ], [ -175, 10 ]);

    bounds1 = epsg3857.wrapLngLatBounds(bounds1);
    bounds2 = epsg3857.wrapLngLatBounds(bounds2);

    expect(bounds1.getSouth()).to.eql(0);
    expect(bounds1.getWest()).to.eql(-185);
    expect(bounds1.getNorth()).to.eql(10);
    expect(bounds1.getEast()).to.eql(-170);

    expect(bounds2.getSouth()).to.eql(0);
    expect(bounds2.getWest()).to.eql(170);
    expect(bounds2.getNorth()).to.eql(10);
    expect(bounds2.getEast()).to.eql(185);
  });

});
describe('CRS-4326', () => {
  // console.log(EPSG4326.lngLatToPoint(new LngLat(0, 0), 0));
  //  expect(EPSG4326.lngLatToPoint(new LngLat(0, 0), 0).equals(new Point(0, 0),0.001)).to.be.true;
});
