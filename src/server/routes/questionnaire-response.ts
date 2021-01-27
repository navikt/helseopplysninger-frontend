import {Application} from "express";
// @ts-ignore
import {QUESTIONNAIRE, QUESTIONNAIRE_RESPONSE, QUESTIONNAIRE_RESPONSES} from "../../paths-server.json";
import testQuestionnaires from "../../fixtures/questionnaires";
import {IQuestionnaire, IQuestionnaireResponse} from "@ahryman40k/ts-fhir-types/lib/R4";
import {v4 as uuidv4} from 'uuid';

export default (app: Application) => {
    const questionnairesResponses: IQuestionnaireResponse[] = [];
    const questionnaires: IQuestionnaire[] = [];
    testQuestionnaires().forEach(questionnaire => {
        const id = uuidv4();
        questionnaires.push({...questionnaire, id})
        questionnairesResponses.push({
            id: uuidv4(),
            resourceType: "QuestionnaireResponse",
            questionnaire: id,
        });
    })

    /**
     * Returnerer ett spørreskjema.
     */
    app.get(QUESTIONNAIRE, (req, res) => {
        const {id} = req.params;
        const found = questionnaires.find(questionnaire => questionnaire.id === id);
        res.send(found);
    })

    /**
     * Returnerer ett svar.
     */
    app.get(QUESTIONNAIRE_RESPONSE, (req, res) => {
        const {id} = req.params;
        const found = questionnairesResponses.find(x => x.id === id);
        res.send(found);
    })
    /**
     * Lagrer ett svar
     */
    app.post(QUESTIONNAIRE_RESPONSE, (req, res) => {
        const questionnairesResponse = req.body as IQuestionnaireResponse;
        const index = questionnairesResponses.findIndex(x => x.id === questionnairesResponse.id);
        questionnairesResponses[index] = questionnairesResponse;
        res.send("ok");
    })

    /**
     * Lister alle questionaires startet av brukeren
     */
    app.get(QUESTIONNAIRE_RESPONSES, (req, res) => {
        res.send(questionnairesResponses);
    })
}
