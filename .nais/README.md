

### Redis
Bruke som session storage for `hops-behandler`. Deployes manuelt. Deploy wiper instancen
og logger ut alle brukere, så det er ikke ønskelig med automatisert deploy av denne.

```
kubectl config use-context dev-gcp
kubectl -nhelseopplysninger apply -f .nais/redis.yaml
```
