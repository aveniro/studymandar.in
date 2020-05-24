import {h}     from 'preact';
import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import Loader  from '@/component/Loader';

import {loadApi} from 'state/ui';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@/loadingMessages', () => ['TEST_MESSGAGE'], {virtual: true});

describe('<Loader /> component', () => {
    const container = Enzyme.shallow(<Loader />);

    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should stop loading', () => {
        loadApi.stop();
        expect(container.html()).toMatchSnapshot();
    });

    it('should start loading', () => {
        loadApi.start();
        expect(container.html()).toMatchSnapshot();
    });
});