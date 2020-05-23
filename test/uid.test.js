import {uid} from '@/uid';

describe('uid', () => {
    it('should not repeat random numbers', () => {
        const testValues = [];
        for(let i = 0; i < 20; i++) {
            const val = uid();
            expect(testValues.indexOf(val)).toBe(-1);
            testValues.push(val);
        }
    });

    it('should not allow a length of less than 8', () => {
        expect(() => { uid(7); }).toThrow();
    });
});