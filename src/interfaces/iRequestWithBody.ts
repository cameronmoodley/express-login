import { Request } from 'express';

export interface iRequestWithBody extends Request {
	body: { [key: string]: string | undefined };
}
