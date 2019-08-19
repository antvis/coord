import { expect } from 'chai';
import Geo from '../../src/coord/geo';
import { toLngLat, LngLat } from '../../src/coord/geo/geometry/lng-lat';
import { Point } from '../../src/coord/geo/geometry/point';
describe('Geo', () => {
  const a = new Geo({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 200,
      y: 0,
    },
    center: [ 120, 32 ],
  });
  const b = new Geo({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 200,
      y: 0,
    },
    center: [ 120, 32 ],
    projection: 'simple',
  });
  it('constructor', () => {
    expect(a.center).to.eql(toLngLat([ 120, 32 ]));
    expect(a.zoom).to.eql(7);
    expect(a.projection).to.eql('EPSG3857');
    expect(b.center).to.eql(toLngLat([ 120, 32 ]));
    expect(b.zoom).to.eql(7);
    expect(b.projection).to.eql('simple');
  });
  it('#getZoom', () => {
    expect(a.getZoom()).to.eql(7);
  });
  it('#getZoom', () => {
    a.setZoom(8);
    expect(a.getZoom()).to.eql(8);
  });
  it('#setCenter', () => {
    a.setCenter([ 110, 20 ]);
    b.setCenter([ 110, 20 ]);
    expect(a.getCenter()).to.eql(new LngLat(110, 20));
    expect(b.getCenter()).to.eql(new LngLat(110, 20));
  });
  it('#convertPoint', () => {
    const { lng, lat } = a.getCenter();
    const lnglat = { x: lng, y: lat };
    expect(a.convertPoint(lnglat).x - 100).lt(1);
    expect(a.convertPoint(lnglat).y - 100).lt(1);
  });
  it('#invertPoint', () => {
    const point = { x: 100, y: 100 };
    const { lng, lat } = a.getCenter();
    expect(a.invertPoint(point).x - lng).lt(1);
    expect(a.invertPoint(point).y - lat).lt(1);
  });
  it('#latLngToLayerPoint', () => {
    expect(a.latLngToLayerPoint(a.getCenter()).equals(new Point(100, 100), 1)).to.be.true;
  });
  it('#layerPointToLatLng', () => {
    expect(a.layerPointToLatLng(new Point(100, 100)).equals(a.getCenter(), 0.001)).to.be.true;
  });
  it('#getPixelOrigin', () => {
    expect(a.getPixelOrigin().add(new Point(100, 100))).eql(a.project(a.getCenter()));
  });
  it('#project', () => {
    expect(a.project(toLngLat(180, 85.0511287798), 0).round().equals(new Point(256, 0), 0)).to.be.true;
    expect(a.project(toLngLat(0, 0), 0)).to.eql(new Point(128, 128));
    expect(a.project(toLngLat(180, 85.0511287798), 1).round().equals(new Point(512, 0), 0)).to.be.true;
    expect(a.project(toLngLat(0, 0), 1)).to.eql(new Point(256, 256));
    a.setZoom(0);
    expect(a.project(toLngLat(180, 85.0511287798)).round().equals(new Point(256, 0), 0)).to.be.true;
  });
  it('#unproject', () => {
    expect(a.unproject(new Point(128, 128), 0)).to.eql(new LngLat(0, 0), 0.01);
    expect(a.unproject(new Point(256, 256), 1)).to.eql(new LngLat(0, 0), 0.01);
    expect(a.unproject(new Point(256, 0), 0).equals(new LngLat(180, 85.0511287798), 0.001)).to.be.true;
    expect(a.unproject(new Point(512, 0), 1).equals(new LngLat(180, 85.0511287798), 0.001)).to.be.true;
    a.setZoom(0);
    expect(a.unproject(new Point(128, 128))).to.eql(new LngLat(0, 0), 0.01);

  });
  it('#distance', () => {
    const l1 = new LngLat(112.45, 30.5),
      l2 = new LngLat(110.46, 31.33);
    expect(Math.abs(Math.round(a.distance(l1, l2) / 1000) - 211.3173) < 1).to.eql(true);
  });
});
