import {
  encodeDate,
  decodeDate,
  encodeBoolean,
  decodeBoolean,
  encodeNumber,
  decodeNumber,
  encodeString,
  decodeString,
  encodeJson,
  decodeJson,
  encodeArray,
  decodeArray,
  encodeObject,
  decodeObject,
  encode,
  decode,
  encodeNumericObject,
  encodeNumericArray,
  decodeNumericObject,
  decodeNumericArray,
} from '../serialize';
import configureUrlQuery from '../configureUrlQuery';

// Resets the global configuration to prevent side-effects in other tests
const resetConfiguration = () =>
  configureUrlQuery({ entrySeparator: '_', keyValSeparator: '-' });

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

    describe('encodeNumber', () => {
      it('produces the correct value', () => {
        expect(encodeNumber(123)).toBe('123');
        expect(encodeNumber(-32.12)).toBe('-32.12');
        expect(encodeNumber()).not.toBeDefined();
      });
    });

    describe('decodeNumber', () => {
      it('produces the correct value', () => {
        expect(decodeNumber('99')).toBe(99);
        expect(decodeNumber('-58.21')).toBe(-58.21);
        expect(decodeNumber()).not.toBeDefined();
        expect(decodeNumber('')).not.toBeDefined();
      });

      it('handles malformed input', () => {
        expect(decodeNumber('foo')).not.toBeDefined();
      });
    });

    describe('encodeString', () => {
      it('produces the correct value', () => {
        expect(encodeString('foo')).toBe('foo');
        expect(encodeString()).not.toBeDefined();
      });
    });

    describe('decodeString', () => {
      it('produces the correct value', () => {
        expect(decodeString('bar')).toBe('bar');
        expect(decodeString('')).toBe('');
        expect(decodeString()).not.toBeDefined();
        expect(decodeString(null)).not.toBeDefined();
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

      it('produces the correct value with a different global separator', () => {
        const input = ['a', 'b', 'c'];
        configureUrlQuery({ entrySeparator: '+' });

        expect(encodeArray(input)).toBe('a+b+c');
        expect(encodeArray()).not.toBeDefined();

        // Revert change so it does not effect other tests
        resetConfiguration();
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

      it('produces the correct value with different global separators', () => {
        configureUrlQuery({ entrySeparator: ',', keyValSeparator: ':' });
        const input = { test: 'bar', foo: 94 };
        const expectedOutput = 'test:bar,foo:94';

        expect(encodeObject(input)).toBe(expectedOutput);
        expect(encodeObject()).not.toBeDefined();
        expect(encodeObject({})).not.toBeDefined();

        // Revert change so it does not effect other tests
        resetConfiguration();
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
        expect(decodeObject('foo-bar-jim-grill')).toEqual({ foo: 'bar' });
        expect(decodeObject('foo_bar_jim_grill')).toEqual({
          foo: undefined,
          bar: undefined,
          jim: undefined,
          grill: undefined,
        });
      });
    });

    describe('encodeNumericArray', () => {
      it('produces the correct value', () => {
        const input = [9, 4, 0];
        expect(encodeNumericArray(input)).toBe('9_4_0');
        expect(encodeNumericArray()).not.toBeDefined();
      });
    });

    describe('decodeNumericArray', () => {
      it('produces the correct value', () => {
        const output = decodeNumericArray('9_4_0');
        const expectedOutput = [9, 4, 0];

        expect(output).toEqual(expectedOutput);
        expect(decodeNumericArray()).not.toBeDefined();
        expect(decodeNumericArray('')).not.toBeDefined();
      });

      it('handles empty values', () => {
        expect(decodeNumericArray('__')).toEqual([
          undefined,
          undefined,
          undefined,
        ]);
      });
    });

    describe('encodeNumericObject', () => {
      it('produces the correct value', () => {
        const input = { test: 55, foo: 94 };
        const expectedOutput = 'test-55_foo-94';
        expect(encodeNumericObject(input, '-', '_')).toBe(expectedOutput);
        expect(encodeNumericObject()).not.toBeDefined();
        expect(encodeNumericObject({})).not.toBeDefined();
      });
    });

    describe('decodeNumericObject', () => {
      it('produces the correct value', () => {
        const output = decodeNumericObject('foo-55_jim-100_iros-94');
        const expectedOutput = {
          foo: 55,
          jim: 100,
          iros: 94,
        };
        expect(output).toEqual(expectedOutput);
        expect(decodeNumericObject()).not.toBeDefined();
        expect(decodeNumericObject('')).not.toBeDefined();
      });

      it('handles malformed input', () => {
        expect(decodeNumericObject('foo-bar-jim-grill')).toEqual({ foo: NaN });
        expect(decodeNumericObject('foo_bar_jim_grill')).toEqual({
          foo: undefined,
          bar: undefined,
          jim: undefined,
          grill: undefined,
        });
      });
    });

    describe('decode', () => {
      it('decodes by type', () => {
        const input = '91';
        expect(decode('number', input)).toBe(91);
      });

      it('decodes using default value', () => {
        const input = undefined;
        expect(decode('number', input, 94)).toBe(94);
        expect(decode('array', 'foo_bar', [])).toEqual(['foo', 'bar']);
        expect(decode('object', 'a-b_c-d', {})).toEqual({ a: 'b', c: 'd' });
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

      it('decodes an invalid number as undefined', () => {
        const input = 'notanumber';
        expect(decode('number', input, 94)).not.toBeDefined();
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

      it('encode(decode(numericObject)) === numericObject', () => {
        const input = 'foo-555_baz-999';
        expect(encode('numericObject', decode('numericObject', input))).toBe(
          input
        );
      });

      it('decode(encode(numericObject)) === numericObject', () => {
        const input = { foo: 3, baz: 777 };
        expect(decode('numericObject', encode('numericObject', input))).toEqual(
          input
        );
      });

      it('encode(decode(numericArray)) === numericArray', () => {
        const input = '1_2_3';
        expect(encode('numericArray', decode('numericArray', input))).toBe(
          input
        );
      });

      it('decode(encode(numericArray)) === numericArray', () => {
        const input = [5, 6, 7];
        expect(decode('numericArray', encode('numericArray', input))).toEqual(
          input
        );
      });
    });
  });
});
