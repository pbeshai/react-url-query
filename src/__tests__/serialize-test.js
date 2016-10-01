import {
  encodeDate,
  decodeDate,
  encodeBoolean,
  decodeBoolean,
  encodeJson,
  decodeJson,
  encodeArray,
  decodeArray,
  encodeObject,
  decodeObject,
  encode,
  decode,
} from '../serialize';

describe('utils', () => {
  describe('serialization', () => {
    describe('encodeDate', () => {
      it('produces the correct value', () => {
        const date = new Date(2016, 2, 1);
        const result = encodeDate(date);
        expect(result).toBe('2016-03-01');
      });

      it('handles null', () => {
        const result = encodeDate(null);
        expect(result).toBeNull();
      });
    });

    describe('decodeDate', () => {
      it('produces the correct value', () => {
        let result = decodeDate('2016-03-01');
        // result is a Date object
        expect(result.getFullYear()).toBe(2016);
        expect(result.getMonth()).toBe(2);
        expect(result.getDate()).toBe(1);

        // javascript likes to give us 2015-12-31 19:00, so test this doesn't.
        result = decodeDate('2016');
        expect(result.getFullYear()).toBe(2016);
        expect(result.getMonth()).toBe(0);
        expect(result.getDate()).toBe(1);
      });

      it('handles null', () => {
        const result = decodeDate(null);
        expect(result).toBeNull();
      });
    });

    describe('encodeBoolean', () => {
      it('produces the correct value', () => {
        expect(encodeBoolean(true)).toBe('1');
        expect(encodeBoolean(false)).toBe('0');
      });
    });

    describe('decodeBoolean', () => {
      it('produces the correct value', () => {
        expect(decodeBoolean('1')).toBe(true);
        expect(decodeBoolean('0')).toBe(false);
      });
    });

    describe('encodeJson', () => {
      it('produces the correct value', () => {
        const input = { test: '123', foo: [1, 2, 3] };
        expect(encodeJson(input)).toBe(JSON.stringify(input));
      });
    });

    describe('decodeJson', () => {
      it('produces the correct value', () => {
        const output = decodeJson('{"foo": "bar", "jim": ["grill"]}');
        const expectedOutput = {
          foo: 'bar',
          jim: ['grill'],
        };
        expect(output).toEqual(expectedOutput);
      });
    });

    describe('encodeArray', () => {
      it('produces the correct value', () => {
        const input = ['a', 'b', 'c'];
        expect(encodeArray(input)).toBe('a_b_c');
      });
    });

    describe('decodeArray', () => {
      it('produces the correct value', () => {
        const output = decodeArray('a_b_c');
        const expectedOutput = ['a', 'b', 'c'];

        expect(output).toEqual(expectedOutput);
      });
    });

    describe('encodeObject', () => {
      it('produces the correct value', () => {
        const input = { test: 'bar', foo: 94 };
        const expectedOutput = 'test-bar_foo-94';
        expect(encodeObject(input, '-', '_')).toBe(expectedOutput);
      });
    });

    describe('decodeObject', () => {
      it('produces the correct value', () => {
        const output = decodeObject('foo-bar_jim-grill_iros-91');
        const expectedOutput = {
          foo: 'bar',
          jim: 'grill',
          iros: '91',
        };
        expect(output).toEqual(expectedOutput);
      });
    });

    describe('decode', () => {
      it('decodes by type', () => {
        const input = '91';
        expect(decode('number', input)).toBe(91);
      });

      it('decodes using default value', () => {
        const input = undefined;
        expect(decode('number', input, '94')).toBe('94');
      });

      it('decodes using custom function', () => {
        const input = '94';
        expect(decode(d => parseInt(d + d, 10), input)).toBe(9494);
      });

      it('decodes using object with .decode custom function', () => {
        const input = '94';
        expect(decode({ decode: d => parseInt(d + d, 10) }, input)).toBe(9494);
      });

      it('handles no decoder found', () => {
        const input = '94';
        expect(decode('fancy', input)).toBe(input);
      });
    });

    describe('encode', () => {
      it('encodes by type', () => {
        const input = 91;
        expect(encode('number', input)).toBe('91');
      });

      it('encodes using custom function', () => {
        const input = 94;
        expect(encode(d => `${d}${d}`, input)).toBe('9494');
      });

      it('encodes using object with .encode custom function', () => {
        const input = 94;
        expect(encode({ encode: d => `${d}${d}` }, input)).toBe('9494');
      });

      it('handles no encoder found', () => {
        const input = 94;
        expect(encode('fancy', input)).toBe(input);
      });
    });

    describe('decode+encode', () => {
      it('encode(decode(number)) === number', () => {
        const input = '91';
        expect(encode('number', decode('number', input))).toBe(input);
      });

      it('decode(encode(number)) === number', () => {
        const input = 91;
        expect(decode('number', encode('number', input))).toBe(input);
      });

      it('encode(decode(boolean)) === boolean', () => {
        const input = '0';
        expect(encode('boolean', decode('boolean', input))).toBe(input);
      });

      it('decode(encode(boolean)) === boolean', () => {
        const input = true;
        expect(decode('boolean', encode('boolean', input))).toBe(input);
      });

      it('encode(decode(date)) === date', () => {
        const input = '2016-03-01';
        expect(encode('date', decode('date', input))).toBe(input);
      });

      it('decode(encode(date)) === date', () => {
        const input = new Date(2016, 2, 1);
        expect(decode('date', encode('date', input))).toEqual(input);
      });

      it('encode(decode(json)) === json', () => {
        const input = '{"foo":"bar","baz":["jim"]}';
        expect(encode('json', decode('json', input))).toBe(input);
      });

      it('decode(encode(json)) === json', () => {
        const input = { foo: 'bar', baz: ['jim'] };
        expect(decode('json', encode('json', input))).toEqual(input);
      });

      it('encode(decode(object)) === object', () => {
        const input = 'foo-bar_baz-jim';
        expect(encode('object', decode('object', input))).toBe(input);
      });

      it('decode(encode(object)) === object', () => {
        const input = { foo: 'bar', baz: 'jim' };
        expect(decode('object', encode('object', input))).toEqual(input);
      });

      it('encode(decode(array)) === array', () => {
        const input = 'A_R_R_A_Y';
        expect(encode('array', decode('array', input))).toBe(input);
      });

      it('decode(encode(array)) === array', () => {
        const input = ['A', 'R', 'R', 'A', 'Y'];
        expect(decode('array', encode('array', input))).toEqual(input);
      });
    });
  });
});
