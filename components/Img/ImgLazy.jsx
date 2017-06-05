import { addStack, removeStack } from '../utils/lazyload';
import Img from './Img';

class ImgLazy extends Img {
  componentDidMount() {
    this._lazyId = addStack(this);
  }

  componentWillUnmount() {
    removeStack(this._lazyId);
  }
}

export default ImgLazy;
