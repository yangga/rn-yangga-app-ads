// __tests__/Intro-test.js
import React from 'react';
import BannerTest from './com/banner';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<BannerTest />).toJSON();
    expect(tree).toMatchSnapshot();
});
