import { JwtValidatedUser } from '../src/modules/shortener/application/dto/jwt-validated-user.dto';

declare global {
  namespace Express {
    interface User extends JwtValidatedUser {}
  }
}
