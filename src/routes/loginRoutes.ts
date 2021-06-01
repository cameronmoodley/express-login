import { requireAuth } from './../Utils/utils';
import { iRequestWithBody } from './../interfaces/iRequestWithBody';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response): void => {
	res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post('/login', (req: iRequestWithBody, res: Response): void => {
	const { email, password } = req.body;
	if (email && password && email === 'hi@hi.com' && password === '123') {
		req.session = {
			loggedIn: true,
		};
		res.redirect('/');
	} else {
		res.send('Invalid credentials');
	}
});

router.get('/', (req: Request, res: Response) => {
	if (req.session && req.session.loggedIn) {
		res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
	} else {
		res.send(`
    <div>
      <div>You are not logged in</div>
      <a href="/login">Login</a>
    </div>
  `);
	}
});

router.get('/logout', (req: Request, res: Response) => {
	req.session = undefined;
	res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
	res.send('Hi welcome to the site');
});

export { router };
