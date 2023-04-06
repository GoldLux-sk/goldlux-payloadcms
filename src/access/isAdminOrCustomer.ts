import { Access } from "payload/config";
import { User } from "payload/dist/auth";

export const isAdminOrCustomer: Access<any, User> = ({ req: { user } }) => {
    return Boolean(user && (user.role === 'admin' || user.role === 'customer'))
}