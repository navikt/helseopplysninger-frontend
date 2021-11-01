import { xmlRsaKeyToJwk } from './xml-rsa-key-to-jwk';
import { JWKRSAKey } from 'jose';

const testXml = `
<RSAKeyValue><Modulus>cE6AOi/NaT8Gis6rwLjZKjywNyEAshYPnwMUJcnHrUP1qjv/tQ2GODaVoJVy0Fb+yPiJSgCl5v2nzhhF9o7plkWlzBQmHvLkiRBe6ic2zhmBxCtukrMjVns6b0AuCjJUbaWOZ4MxyuZ6IzVpTjeipdnQLbB3FSZECZJgxz3sy00=</Modulus><Exponent>AQAB</Exponent><P>37fUGE344v9n1wIZzu/QWG6X3yvoWkX8jRb63OpMd9wtWFXetR/B8s7lGA3u/IfwuWTaCjn817V/TU10xZGSrw==</P><Q>gIMfBf9MhXWoxXEFVnnbPA8E76TZmk+X1w7VhaXfK5dYhhI8B7tN93gU7NeIK8NkFDrBBe2oRhyH4/3921rwww==</Q><DP>VWQ+YZSJdmOUiB32KeWhec+kyntg8ewazOPDl0UbMPjqmfgUzL+1cO+FxFu1J9DfknQrQZIGr3NIhwIUm0DIYw==</DP><DQ>Gsg4vO05q06b/5nQPPdkQx32L2MxnkEcKcuDoDizS8hcwIQoUowscXhrE/jO/h/YSYb9FxkySnpDr7YNI5vONQ==</DQ><InverseQ>2iejuIGixmRWIzIG3V4jnhyF4XCqGOl4eDIf6zizxsGzLW3sVA98tIOZGrbKX4jn4xxYpMp4jT7YvFbru7A13Q==</InverseQ><D>XlURz84nM6gEzsMZ8R9TCe8/9I58DxoItP/ZBISgfCEBUKRk/KcHfmAa/m+JqQXprNVWPBqfP48ATFSHL7qK6M5rGSInq1Jkn0B/Zl10+PHRs15QEO5+E/FfGLH90Nsifo0A1qwiXZ1JO+fMVfBE34blpcOR9gCiAu2ZBSF7AuE=</D></RSAKeyValue>
  `;

describe('xml rsa key to jwk', () => {
  it('should transform to jwk', () => {
    const result = xmlRsaKeyToJwk(testXml) as JWKRSAKey;

    expect(result.e).toBe('AQAB');
    expect(result.kty).toBe('RSA');
    expect(result.kid).toBe('X-GwSabVAB7aq2RK31GT_ZQDIBTvINKSY6XtnzrcU08');
    expect(result.n).toBe(
      'cE6AOi_NaT8Gis6rwLjZKjywNyEAshYPnwMUJcnHrUP1qjv_tQ2GODaVoJVy0Fb-yPiJSgCl5v2nzhhF9o7plkWlzBQmHvLkiRBe6ic2zhmBxCtukrMjVns6b0AuCjJUbaWOZ4MxyuZ6IzVpTjeipdnQLbB3FSZECZJgxz3sy00'
    );

    expect(result.d).toBeDefined();
    expect(result.p).toBeDefined();
    expect(result.q).toBeDefined();
    expect(result.dp).toBeDefined();
  });
});
