import React, { setState } from 'react'
import { shallow } from 'enzyme'
import DataPool from './DataPool'

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<DataPool />', () => {
    it('renders datapool list items', () => {
        const element = shallow(<DataPool />);
        expect(element.find('div.col-sm-auto.pl-0').length).toEqual(1);
    });
    it('renders datapool list items', () => {
        const element = shallow(<DataPool />);
        expect(element.find('ul.nav.top-list').length).toEqual(1);
    });
});

