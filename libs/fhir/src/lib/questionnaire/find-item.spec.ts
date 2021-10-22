import { findItemsBasedOnLinkId } from './find-item';
import { fixtures } from '@navikt/fixtures';
test('prepResponseItems', () => {
  const quest = fixtures.Questionnaire[0];

  const df = findItemsBasedOnLinkId('2.2', quest.item);
  console.log(df);
});
