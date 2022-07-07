import * as React from 'react';
import { render } from '@testing-library/react';

import Grid from '../index';

describe('Grid', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Grid columns={2} gutter={10} square>
        <Grid.Item />
        <Grid.Item />
        <Grid.Item />
      </Grid>,
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
