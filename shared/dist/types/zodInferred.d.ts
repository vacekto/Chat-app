import * as schemas from '../util/zodSchemas';
import { z } from 'zod';
export type TRegisterData = z.infer<typeof schemas.registerFormZS>;
export type TLoginData = z.infer<typeof schemas.loginFormZS>;
export type TTokenPayload = z.infer<typeof schemas.tokenPayloadZS>;
