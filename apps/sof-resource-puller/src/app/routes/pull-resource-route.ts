import {Express} from "express";
import {SofPaths, validatePullResourceRequest} from '@navikt/sof-common';
import pullResource from "../utils/pull-resource";

/**
 * This route will pull and bundle a resource.
 *
 * @param app
 */
function pullResourceRoute(app: Express) {
    app.post(SofPaths.PULL_RESOURCE, async (req, res) => {
        const {resource, token} = req.body;
        const errors = validatePullResourceRequest(resource, token);
        console.log(req.body);
        if (errors.length) {
            res.status(400).send(errors);
        } else {
            const resourceUrl = new URL(resource);
            const pulledResource = await pullResource(resourceUrl, token);

            res.send({message: 'I pull that resource', resource: pulledResource});
        }
    })
}

export default pullResourceRoute;
