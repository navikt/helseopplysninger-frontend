import { Express } from 'express';
import { configureAuthentication, ensureLoggedIn } from '@navikt/helseid';

export async function authRoutes(app: Express): Promise<void> {
  await configureAuthentication(app);
  app.use(ensureLoggedIn);
  app.get('/api', (req, res) => res.send('Should be logged in'));
  app.get('/', (req, res) => res.send(req.session));
  app.get('/some', (req, res) => {
    req.session['some'] = req.query.hello;
    res.redirect('/');
  });
}
