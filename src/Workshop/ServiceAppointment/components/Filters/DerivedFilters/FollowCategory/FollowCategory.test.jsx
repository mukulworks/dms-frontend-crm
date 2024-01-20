import React, { setState } from 'react'
import { shallow } from 'enzyme'
import FollowCategory from './FollowCategory'

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<FollowCategory />', () => {
    it('render followCategory dropdownlist', () => {
        const editor = shallow(<FollowCategory />)
        expect(editor.find('select').length).toEqual(1);
    });
});