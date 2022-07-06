/* eslint-disable dot-notation */
import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mocked } from 'ts-jest/utils';
import { Volume as VolumeIcon } from '@zarm-design/icons';
import NoticeBar from '../index';
import { addKeyframe, removeKeyframe, existKeyframe } from '../../utils/keyframes';
import { mockRefReturnValueOnce } from '../../../tests/utils';
import Message from '../../message';

jest.mock('../../utils/keyframes');

const mAddKeyframe = mocked(addKeyframe);
const mRemoveKeyframe = mocked(removeKeyframe);
const mExistKeyframe = mocked(existKeyframe);

describe('NoticeBar', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      jest.useFakeTimers();
      const wrapper = mount(<NoticeBar>foo</NoticeBar>);
      jest.runTimersToTime(3000);
      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.unmount();
    });

    it('theme', () => {
      const wrapper = render(<NoticeBar theme="danger">foo</NoticeBar>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('icon', () => {
      const wrapper = render(
        <NoticeBar
          icon={
            <img alt="" src="\\static.zhongan.com/website/health/zarm/images/icons/state.png" />
          }
        >
          foo
        </NoticeBar>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it('should render message component', () => {
      jest.spyOn(NoticeBar.prototype, 'updateScrolling').mockImplementation();
      const wrapper = shallow(<NoticeBar />);
      const messageWrapper = wrapper.find(Message);
      expect(messageWrapper.exists()).toBeTruthy();
      expect(messageWrapper.props()).toEqual(
        expect.objectContaining({
          size: 'lg',
          theme: 'warning',
          icon: <VolumeIcon />,
          hasArrow: false,
          closable: false,
          speed: 50,
          delay: 2000,
        }),
      );
    });

    it('should create ref', () => {
      const wrapper = mount(<NoticeBar />);
      expect(wrapper.instance()['wrapper']).toBeTruthy();
      expect(wrapper.instance()['content']).toBeTruthy();
    });
    it('should add keyframe when component mount', () => {
      let keyframeContent!: string;
      mAddKeyframe.mockImplementationOnce((_, content: string) => {
        keyframeContent = content;
      });
      mExistKeyframe.mockReturnValueOnce(false);
      mockRefReturnValueOnce(NoticeBar, 'wrapper', 'getBoundingClientRect', { width: 50 });
      mockRefReturnValueOnce(NoticeBar, 'content', 'getBoundingClientRect', { width: 100 });
      const wrapper = mount(<NoticeBar />);
      expect(mExistKeyframe).toBeCalledWith('za-notice-bar-scrolling');
      expect(mAddKeyframe).toBeCalledWith('za-notice-bar-scrolling', keyframeContent);
      expect(wrapper.state('animationDuration')).toEqual(6000);
      expect(wrapper.find('.za-notice-bar__body').prop('style')).toEqual({
        WebkitAnimation: 'za-notice-bar-scrolling 6000ms linear infinite',
        animation: `za-notice-bar-scrolling 6000ms linear infinite`,
      });
    });

    it('should remove existed keyframe', () => {
      let keyframeContent!: string;
      mExistKeyframe.mockReturnValueOnce(true);
      mAddKeyframe.mockImplementationOnce((_, content: string) => {
        keyframeContent = content;
      });
      mockRefReturnValueOnce(NoticeBar, 'wrapper', 'getBoundingClientRect', { width: 50 });
      mockRefReturnValueOnce(NoticeBar, 'content', 'getBoundingClientRect', { width: 100 });
      const wrapper = mount(<NoticeBar />);
      expect(mExistKeyframe).toBeCalledWith('za-notice-bar-scrolling');
      expect(mRemoveKeyframe).toBeCalledWith('za-notice-bar-scrolling');
      expect(mAddKeyframe).toBeCalledWith('za-notice-bar-scrolling', keyframeContent);
      expect(wrapper.state('animationDuration')).toEqual(6000);
      expect(wrapper.find('.za-notice-bar__body').prop('style')).toEqual({
        WebkitAnimation: 'za-notice-bar-scrolling 6000ms linear infinite',
        animation: `za-notice-bar-scrolling 6000ms linear infinite`,
      });
    });

    it('should not update scroll if offset width less than wrap width', () => {
      mockRefReturnValueOnce(NoticeBar, 'wrapper', 'getBoundingClientRect', { width: 0 });
      mockRefReturnValueOnce(NoticeBar, 'content', 'getBoundingClientRect', { width: 0 });
      const wrapper = mount(<NoticeBar />);
      expect(mExistKeyframe).not.toBeCalled();
      expect(mRemoveKeyframe).not.toBeCalled();
      expect(mAddKeyframe).not.toBeCalled();
      expect(wrapper.state('animationDuration')).toEqual(0);
      expect(wrapper.find('.za-notice-bar__body').prop('style')).toBeUndefined();
    });

    it('should update scrolling when component did mount', () => {
      const updateScrollingSpy = jest
        .spyOn(NoticeBar.prototype, 'updateScrolling')
        .mockImplementation();
      mount(<NoticeBar />);
      expect(updateScrollingSpy).toBeCalledTimes(1);
    });

    it('should update scrolling when component did update', () => {
      const updateScrollingSpy = jest
        .spyOn(NoticeBar.prototype, 'updateScrolling')
        .mockImplementation();
      const wrapper = mount(<NoticeBar />);
      wrapper.setState({ animationDuration: 100 });
      expect(updateScrollingSpy).toBeCalledTimes(2);
    });
  });
});
