/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { render } from '@testing-library/react';
import Popup from '../Popup';

describe('Popup', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const onMaskClick = jest.fn();
      const afterClose = jest.fn();
      const { container } = render(
        <Popup direction="bottom" onMaskClick={onMaskClick} afterClose={afterClose}>
          foo
        </Popup>,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders mount node correctly', () => {
      const onMaskClick = jest.fn();
      const afterClose = jest.fn();
      const { container } = render(
        <Popup
          visible
          direction="bottom"
          onMaskClick={onMaskClick}
          afterClose={afterClose}
          mountContainer={() => document.body}
        >
          foo
        </Popup>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
