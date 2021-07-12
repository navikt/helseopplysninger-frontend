import {getAuthorizationUrl} from "./helseid";
import validator from "validator";
import {join} from "path";
import {JWK} from "jose";
import {tmpdir} from "os";
import {writeFileSync} from "fs";

test("it should return a client", async () => {
    // just generate a test key.
    const key = JWK.generateSync("RSA", 2048, {}, true).toJWK(true)
    const jwksFilepath = join(tmpdir(), "testing-helseid-jwks.json");
    writeFileSync(jwksFilepath, JSON.stringify(key));
    const url = await getAuthorizationUrl({
        authority: "https://helseid-sts.test.nhn.no",
        clientId: "asdf",
        clientSecret: "asdf",
        codeVerifier: "asdf",
        jwksFilepath,
        redirectUris: "dsaf",
        scopes: "dfasd"

    });
    console.log(url);
    expect(validator.isURL(url)).toBeTruthy()

})
