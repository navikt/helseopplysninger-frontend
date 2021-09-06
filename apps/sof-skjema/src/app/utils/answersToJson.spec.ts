import {
  setValueDate,
  setValueString,
  setValueBoolean,
  setValueInteger,
} from './answersToJson';

// Test for setValueString

test('it should set a string value to questionnaire response', () => {
  const item = {
    linkId: '1',
    text: 'Barnet har følgende diagnoser',
    answer: [
      {
        valueString: '',
      },
    ],
  };
  setValueString(item, 'Vondt i hodet');
  expect(item.answer[0].valueString).toBe('Vondt i hodet');
});

// Tests for setValueDate

const dateItem = {
  linkId: '2.1',
  text: 'Perioder for relevante innleggelser: start',
  answer: [
    {
      valueDate: '',
    },
  ],
};

test('it should set a date as string', () => {
  setValueDate(dateItem, '2020-03-15');
  expect(dateItem.answer[0].valueDate).toBe('2020-03-15');
});

test('It should set two dates', () => {
  setValueDate(dateItem, `["2021-05-04","2013-10-22"]`);
  expect(dateItem.answer).toEqual([
    { valueDate: '2021-05-04' },
    { valueDate: '2013-10-22' },
  ]);
});

test('it should remove date', () => {
  const filledItemDate = {
    linkId: '2.1',
    text: 'Perioder for relevante innleggelser: start',
    answer: [
      {
        valueDate: '2020-02-20',
      },
    ],
  };
  setValueDate(filledItemDate, '');
  expect(filledItemDate.answer[0].valueDate).toBe('');
});

test('it should throw an error when date is 0000-00-00', () => {
  expect(() => {
    setValueDate(dateItem, '0000-00-00');
  }).toThrow(
    new Error(
      'The value is either non existent or it is not on the right format. The format should be YYYY-MM-DD'
    )
  );
});

test('it should throw an error when date is 2020-13-14', () => {
  expect(() => {
    setValueDate(dateItem, '2020-13-14');
  }).toThrow(
    new Error(
      'The value is either non existent or it is not on the right format. The format should be YYYY-MM-DD'
    )
  );
});

test('it should throw an error when date is 2020-12-32', () => {
  expect(() => {
    setValueDate(dateItem, '2020-12-32');
  }).toThrow(
    new Error(
      'The value is either non existent or it is not on the right format. The format should be YYYY-MM-DD'
    )
  );
});

// Test for setValueBoolean

test('it should set the answer to false', () => {
  const booleanItem = {
    linkId: '6.2',
    text: 'Barnets behov skyldes sykdom eller skade',
    answer: [
      {
        valueBoolean: false,
      },
    ],
  };
  setValueBoolean(booleanItem, true);
  expect(booleanItem.answer[0].valueBoolean).toBe(true);
});

// Test for setValueInteger

test('it should set a an answer to an integer', () => {
  const integerItem = {
    linkId: '8.1',
    text: 'Fødselsnummer til første omsorgsperson',
    answer: [
      {
        valueInteger: 0,
      },
    ],
  };
  setValueInteger(integerItem, '123');
  expect(integerItem.answer[0].valueInteger).toBe(123);
});
