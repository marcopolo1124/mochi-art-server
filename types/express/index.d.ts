import {AdminUser} from '../custom'
declare global {
    declare namespace Express {
        interface Request {
        state?: boolean;
        admin?: AdminUser;
        fileName?: string;
        User?: {username: string};
        }
    }
}