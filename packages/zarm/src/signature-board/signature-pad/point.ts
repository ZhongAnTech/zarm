// Interface for point data structure used e.g. in SignaturePad#fromData method

export interface BasicPoint {
  x: number;
  y: number;
  time: number;
}

export class Point implements BasicPoint {
  public x: number;

  public y: number;

  public time: number;

  constructor(x: number, y: number, time?: number) {
    this.x = x;
    this.y = y;
    this.time = time || Date.now();
  }

  public distanceTo(start: BasicPoint): number {
    // eslint-disable-next-line no-restricted-properties
    return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
  }

  public equals(other: BasicPoint): boolean {
    return this.x === other.x && this.y === other.y && this.time === other.time;
  }

  public velocityFrom(start: BasicPoint): number {
    return this.time !== start.time ? this.distanceTo(start) / (this.time - start.time) : 0;
  }
}
