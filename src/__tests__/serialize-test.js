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

      it('handles null and undefined', () => {
        const result = encodeDate(null);
        expect(result).toBeNull();
        expect(encodeDate()).not.toBeDefined();
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

      it('handles null and undefined', () => {
        const result = decodeDate(null);
        expect(result).not.toBeDefined();
        expect(decodeDate()).not.toBeDefined();
        expect(decodeDate('')).not.toBeDefined();
      });

      it('handles malformed input', () => {
        const result = decodeDate('foo-one-two');
        expect(result).not.toBeDefined();
      });
    });

    describe('encodeBoolean', () => {
      it('produces the correct value', () => {
        expect(encodeBoolean(true)).toBe('1');
        expect(encodeBoolean(false)).toBe('0');
        expect(encodeBoolean()).not.toBeDefined();
      });
    });

    describe('decodeBoolean', () => {
      it('produces the correct value', () => {
        expect(decodeBoolean('1')).toBe(true);
        expect(decodeBoolean('0')).toBe(false);
        expect(decodeBoolean()).not.toBeDefined();
        expect(decodeBoolean('')).not.toBeDefined();
      });

      it('handles malformed input', () => {
        expect(decodeBoolean('foo')).not.toBeDefined();
      });
    });

    describe('encodeJson', () => {
      it('produces the correct value', () => {
        const input = { test: '123', foo: [1, 2, 3] };
        expect(encodeJson(input)).toBe(JSON.stringify(input));
        expect(encodeJson()).not.toBeDefined();
        expect(encodeJson(null)).not.toBeDefined();
        expect(encodeJson(0)).toBe('0');
        expect(encodeJson(false)).toBe('false');
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
        expect(decodeJson()).not.toBeDefined();
        expect(decodeJson('')).not.toBeDefined();
      });

      it('handles malformed input', () => {
        expect(decodeJson('foo')).not.toBeDefined();
      });
    });

    describe('encodeArray', () => {
      it('produces the correct value', () => {
        const input = ['a', 'b', 'c'];
        expect(encodeArray(input)).toBe('a_b_c');
        expect(encodeArray()).not.toBeDefined();
      });
    });

    describe('decodeArray', () => {
      it('produces the correct value', () => {
        const output = decodeArray('a_b_c');
        const expectedOutput = ['a', 'b', 'c'];

        expect(output).toEqual(expectedOutput);
        expect(decodeArray()).not.toBeDefined();
        expect(decodeArray('')).not.toBeDefined();
      });

      it('handles empty values', () => {
        expect(decodeArray('__')).toEqual([undefined, undefined, undefined]);
      });
    });

    describe('encodeObject', () => {
      it('produces the correct value', () => {
        const input = { test: 'bar', foo: 94 };
        const expectedOutput = 'test-bar_foo-94';
        expect(encodeObject(input, '-', '_')).toBe(expectedOutput);
        expect(encodeObject()).not.toBeDefined();
        expect(encodeObject({})).not.toBeDefined();
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
        expect(decodeObject()).not.toBeDefined();
        expect(decodeObject('')).not.toBeDefined();
      });

      it('handles malformed input', () => {
        expect(decodeJson('foo-bar-jim-grill')).not.toBeDefined();
        expect(decodeJson('foo_bar_jim_grill')).not.toBeDefined();
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
