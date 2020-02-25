import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

@controller('')
export class Rootcontroller {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session?.loggedIn) {
      res.send(`
      <div>
        <div>You are logged in </div>
        <a href="/auth/logout">Logout</a>
      </div>
    `);
    } else {
      res.redirect('/auth/login');
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send(`
    <p>Welcome to protected route</p>
  `);
  }
}
