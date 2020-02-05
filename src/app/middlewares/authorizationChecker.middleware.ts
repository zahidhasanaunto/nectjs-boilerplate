import { Context } from 'koa';
import { Container } from 'typedi';
import { JWTService } from '../../services';
import { extractToken } from '../../utils';

const jwtService = Container.get(JWTService);

export async function authorizationChecker(ctx: Context): Promise<boolean> {
  const token = extractToken(ctx.request.headers);
  const payload: any = await jwtService.verify(token);
  if (!payload) {
    return false;
  }
  return true;
}
