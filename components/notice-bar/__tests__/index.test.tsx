/* eslint-disable dot-notation */
import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mocked } from 'ts-jest/utils';
import NoticeBar from '../index';
import { addKeyframe, removeKeyframe, existKeyframe } from '../../utils/keyframes';

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
    });
    it('should add keyframe when component mount', () => {
      mExistKeyframe.mockReturnValueOnce(false);
      let wrapperRef: HTMLDivElement;
      let contentRef: HTMLDivElement;
      Object.defineProperty(NoticeBar.prototype, 'wrapper', {
        get() {
          return this.wrapperRef;
        },
        set(ref) {
          wrapperRef = ref;
          if (wrapperRef) {
            jest
              .spyOn(wrapperRef, 'getBoundingClientRect')
              .mockReturnValueOnce(({ width: 50 } as unknown) as DOMRect);
          }
          this.wrapperRef = ref;
        },
      });
      Object.defineProperty(NoticeBar.prototype, 'content', {
        get() {
          return this.contentRef;
        },
        set(ref) {
          contentRef = ref;
          if (contentRef) {
            jest
              .spyOn(contentRef, 'getBoundingClientRect')
              .mockReturnValueOnce(({ width: 100 } as unknown) as DOMRect);
          }
          this.contentRef = ref;
        },
      });

      const wrapper = mount(<NoticeBar />);
      expect(wrapper.instance()['wrapper']).toBeTruthy();
      expect(wrapper.instance()['content']).toBeTruthy();
      expect(mAddKeyframe).toBeCalledWith('za-notice-bar-scrolling', expect.any(String));
    });
  });
});
