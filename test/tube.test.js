import Tube from '@/tube';

describe('class Tube', () => {
    it('should add items', () => {
        const testTube = new Tube();

        testTube.add(1);
        testTube.add(2);
        testTube.add(3);

        expect(testTube.size()).toBe(3);
    });

    it('should dump items', () => {
        const testTube = new Tube();

        testTube.add(1);
        testTube.add(2);
        testTube.add(3);

        testTube.dump();

        expect(testTube.size()).toBe(0);
    });

    it('should display tube-like behavior', () => {
        const testTube = new Tube();

        testTube.add(1);
        testTube.add(2);
        testTube.add(3);

        expect(testTube.front()).toBe(3);
    });

    it('should display drop correctly', () => {
        const testTube = new Tube();

        testTube.add(1);
        testTube.add(2);
        testTube.add(3);

        testTube.drop();

        expect(testTube.front()).toBe(2);
    });

    it('should chain', () => {
        const testTube = new Tube();

        expect(testTube.add(3).add(2).drop().dump()).toBe(testTube);
    });
});