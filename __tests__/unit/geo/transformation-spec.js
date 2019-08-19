import { expect } from 'chai';
import { Transformation } from '../../../src/coord/geo/transformation';
import { Point } from '../../../src/coord/geo/geometry/point';
describe('transformation', () => {
  it('#constructor', () => {
    const a = new Transformation([ 1 / 180, 1, -1 / 180, 0.5 ]);
    const b = new Transformation(1 / 180, 1, -1 / 180, 0.5);
    expect(a.a).to.eql(1 / 180);
    expect(b.a).to.eql(1 / 180);
  });
  it('transform', () => {
    const a = new Transformation([ 1 / 180, 1, -1 / 180, 0.5 ]);
    const p1 = a.transform(new Point(0, 0));
    expect(p1.x).to.eql(1);
  });
  it('transform', () => {
    const a = new Transformation([ 1 / 180, 1, -1 / 180, 0.5 ]);
    const p1 = a.untransform(new Point(0, 0));
    expect(p1.x).to.eql(-180);
  });
});
