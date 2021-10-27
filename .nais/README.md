

### Redis
Bruke som session storage for `hops-behandler`. Deployes manuelt. Deploy wiper instancen
og logger ut alle brukere, så det er ikke ønskelig med automatisert deploy av denne.

```shell
kubectl config use-context dev-gcp
kubectl -nhelseopplysninger apply -f .nais/redis.yaml
```

Hente ut service account for appene for å legge til i ulike google tjenester:
```shell
k get sa hops-behandler-backend -ojson | jq -r '.metadata.annotations."iam.gke.io/gcp-service-account"'

```
