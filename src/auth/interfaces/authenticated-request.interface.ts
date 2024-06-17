import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any; // Defina o tipo adequado para o cliente autenticado
}

export default AuthenticatedRequest;