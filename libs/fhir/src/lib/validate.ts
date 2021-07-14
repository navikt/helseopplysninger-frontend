export const validateFhirCanonical = (canonical: string) => {
    const errors = []
    const [resourceType, id] = canonical.split("/");
    if (!["Questionnaire", "QuestionnaireResponse"].includes(resourceType)) errors.push("ResourceType is invalid for canonical reference.");
    if (!id) errors.push("Canonical doesn't have a resolveable id")
    return errors;
}
