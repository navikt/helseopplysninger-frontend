import {IBundle, IResourceList} from "@ahryman40k/ts-fhir-types/lib/R4";
import {createFhirMessageBundle} from "@navikt/fhir";


function bundleResources(resource: IResourceList[]): IBundle {
    return createFhirMessageBundle(resource, "me");

}

export default bundleResources;
