import { Request, Response } from 'express';
import {
  controller,
  get,
  RequestWithBody,
  post,
  bodyValidator,
} from './decorators';

@controller('/auth')
export class LoginController {
  @get('/')
  add(a: number, b: number): number {
    return a + b;
  }

  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
    <Form method="POST">
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
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response): void {
    const { email, password } = req.body;

    if (email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}
