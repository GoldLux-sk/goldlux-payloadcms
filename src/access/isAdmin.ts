import { Access } from "payload/config";
import { User } from "payload/dist/auth";
import { FieldAccess } from "payload/types";

export const isAdmin: Access<any, User> = ({ req: { user } }) => {
    return Boolean(user && user.role === 'admin')
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({ req: { user } }) => {
    return Boolean(user && user.role === 'admin')
}