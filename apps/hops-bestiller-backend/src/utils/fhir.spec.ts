import {createFhirMessageBundle, createFhirQuestionaire, createFhirTask} from "./fhir";

test("it should create bundle", async () => {
    const result = createFhirMessageBundle([
        createFhirTask("Fyll ut dette!","123abc"),
        createFhirQuestionaire("test",[])
    ]);
    console.log(JSON.stringify(result));
    expect(1).toBe(1)
})
