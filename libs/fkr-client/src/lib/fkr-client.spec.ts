import {fkrGetPatient, getCache} from './fkr-client';


describe('fkrClient', () => {


    it('should work', async () => {
        await getCache().destroy();

        const result = await fkrGetPatient({
            "fhirUrl": "https://example.local/fgsdf",
            "stsUrl": "https://example.local/fgsdf",
            "clientId": "xxx",
            "accessKey": "xxx"
        }, {
            name: "Michael"
        })
        expect(result).toEqual([]);
    });
});
