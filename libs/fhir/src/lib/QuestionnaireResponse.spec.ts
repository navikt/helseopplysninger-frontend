import { IQuestionnaireResponse, IReference } from '@ahryman40k/ts-fhir-types/lib/R4';
import { QuestionnaireResponse } from './QuestionnaireResponse';
import { fixtures } from '@navikt/fixtures';
import { createQuestionnaireResponseItem } from '@navikt/fhir';

test('it should initialize', async () => {
  const response: IQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
  };
  const patient: IReference = {
    reference: 'Patient/1',
  };
  const practitioner: IReference = {
    reference: 'Practitioner/1',
  };
  fixtures.Questionnaire.forEach((questionnaire) => {
    const qr = new QuestionnaireResponse(questionnaire, response, patient, practitioner);
    //expect(qr.getQuestionnaire().item.length).toBe(qr.getResponse().item.length);
    //expect(qr.getQuestionnaire().item.length).toBeGreaterThan(0);

    const qItem = qr.findQuestionnaireItemByLinkId('52dc75da-6710-487d-82ac-847b272be87f');
    if (qItem) {
      const newItem = createQuestionnaireResponseItem(qItem);
      qr.setResponseItem(newItem);
      console.log(JSON.stringify(qr.getResponse().item, null, 2));
    }
  });
});
