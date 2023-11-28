type Axis = 'x' | 'y' | 'both';

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface DraggableOptions {
  id?: string;
  bounds?: Bounds | ((state: DraggableState) => Bounds);
  axis?: Axis;
  from?: [number, number] | ((state: DraggableState) => [number, number]);
  enabled?: boolean;
}

interface DraggableState {
  id?: string;
  dragging: boolean;
  down: boolean;
  movement: [number, number];
  delta: [number, number];
  initialPosition: [number, number];
  startTime: number;
  elapsedTime: number;
  first: boolean;
  last: boolean;
  lastPosition: [number, number];
  offset: [number, number];
  distance: number;
  direction: string;
  moving: boolean;
}

class Draggable {
  private state: DraggableState;

  private bounds: Bounds | ((state: DraggableState) => Bounds);

  private boundsValue: Bounds;

  private axis: Axis;

  private from: [number, number] | ((state: DraggableState) => [number, number]);

  private fromValue: [number, number] = [0, 0];

  private enabled: boolean;

  private callback: (state: DraggableState) => void;

  constructor(callback: (state: DraggableState) => void, options: DraggableOptions = {}) {
    const {
      id,
      bounds = { left: -Infinity, top: -Infinity, right: Infinity, bottom: Infinity },
      axis = 'both',
      from,
      enabled = true,
    } = options;

    this.state = {
      id,
      dragging: false,
      down: false,
      movement: [0, 0],
      delta: [0, 0],
      initialPosition: [0, 0],
      startTime: 0,
      elapsedTime: 0,
      first: false,
      last: false,
      lastPosition: [0, 0],
      offset: [0, 0],
      distance: 0,
      direction: '',
      moving: false,
    };

    this.callback = callback;

    this.bounds = bounds;
    this.axis = axis;
    this.from = from;
    this.enabled = enabled;

    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  private computeBounds(): Bounds {
    if (typeof this.bounds === 'function') {
      return this.bounds(this.state);
    }
    return this.bounds;
  }

  private computeFrom(): [number, number] {
    if (typeof this.from === 'function') {
      return this.from(this.state);
    }
    return this.from || [0, 0];
  }

  private reset() {
    this.state = {
      dragging: false,
      down: false,
      initialPosition: [0, 0],
      movement: [0, 0],
      delta: [0, 0],
      startTime: 0,
      elapsedTime: 0,
      first: false,
      last: false,
      lastPosition: [0, 0],
      offset: [0, 0],
      direction: '',
      moving: false,
      distance: 0,
    };
  }

  private updateState(newState: Partial<DraggableState>) {
    const { movement, offset, distance } = this.state;

    // onsole.log(state.elapsedTime)
    const delta: [number, number] = [
      movement[0] - newState.movement![0],
      movement[1] - newState.movement![1],
    ];
    const newOffset: [number, number] = [offset[0] - delta[0], offset[1] - delta[1]];
    const newDistance = distance + Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);

    const directionX = delta[0] < 0 ? 'left' : 'right';
    const directionY = delta[1] < 0 ? 'up' : 'down';
    const direction = directionX || directionY;

    const moving = newDistance > 0;

    this.state = {
      ...this.state,
      ...newState,
      delta,
      offset: newOffset,
      distance: newDistance,
      direction,
      moving,
    };

    this.callback(this.state);
  }

  async handleStart(e) {
    if (!this.enabled) {
      return false;
    }
    // e.preventDefault();
    this.reset();
    const { clientX, clientY } = e.touches[0];
    this.fromValue = await this.computeFrom();
    const initialX = this.fromValue[0] || clientX;
    const initialY = this.fromValue[1] || clientY;

    this.boundsValue = await this.computeBounds();

    this.updateState({
      dragging: true,
      down: true,
      initialPosition: [initialX - this.state.movement[0], initialY - this.state.movement[1]],
      startTime: Date.now(),
      first: !this.state.down,
      last: false,
      lastPosition: [initialX, initialY],
      movement: [0, 0],
    });
  }

  handleMove(e) {
    if (!this.enabled) {
      return false;
    }
    if (!this.state.dragging) return;
    const { clientX, clientY } = e.touches[0];
    const [initialX, initialY] = this.state.initialPosition;

    let [newX, newY] = [clientX - initialX, clientY - initialY];

    if (this.axis === 'x') {
      newY = 0;
    } else if (this.axis === 'y') {
      newX = 0;
    }

    const { left, top, right, bottom } = this.boundsValue;
    newX = Math.max(left, Math.min(newX, right));
    newY = Math.max(top, Math.min(newY, bottom));

    const movement: [number, number] = [newX, newY];

    this.updateState({
      ...this.state,
      movement,
      first: false,
      last: false,
      //  lastPosition: [clientX, clientY],
    });
  }

  handleEnd() {
    if (!this.enabled) {
      return false;
    }
    const elapsedTime = Date.now() - this.state.startTime;
    if (this.state.down) {
      this.updateState({
        ...this.state,
        dragging: false,
        down: false,
        elapsedTime,
        last: true,
      });
    }
  }

  handleCancel() {
    this.reset();
  }
}

export default Draggable;
