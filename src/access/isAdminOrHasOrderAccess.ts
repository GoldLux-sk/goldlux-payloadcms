import { Access } from "payload/config"

export const isAdminOrHasOrderAccess = (orderIDFieldName: string = 'order'): Access => ({ req: { user } }) => {
    if (user) {
        if (user.role === 'admin' || user.role === 'cleaner') {
            return true
        }

        if (user.role === 'customer' && user.orders?.length > 0) {
            return {
                or: [
                    {
                        [orderIDFieldName]: {
                            in: user.orders
                        }
                    },
                    {
                        [orderIDFieldName]: {
                            exists: false
                        }
                    }
                ]
            }
        }
    }

    return false
}