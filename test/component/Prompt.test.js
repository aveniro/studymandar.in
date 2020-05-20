import {h}     from 'preact';
import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';

import Prompt from '@/component/Prompt';

Enzyme.configure({ adapter: new Adapter() });

describe('<Prompt /> component', () => {
    const container = Enzyme.mount(<Prompt />);

    it('should start detached from DOM', () => {
        expect(container.html()).toBe('');
    });

    it('should yesNo properly', () => {
        //Prompt.yesNo('work correctly');
    });
});