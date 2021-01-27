import questionnaires from "./questionnaires"
test('should return some questions', async () => {
    const qs = questionnaires();

    console.log(qs);
})
