import payload from "payload";
import { Access } from "payload/config";

export const isAdminOrHasOrderAccess = (): Access => async ({ req: { user, } }) => {
    if (user) {
        // If the user has 'admin' or 'cleaner' roles, return true
        if (user.role === 'admin' || user.role === 'cleaner') {
            return true;
        }

        // If the user has 'customer' role
        if (user.role === 'customer') {

            // Fetch all orders where the customer is the current user
            const orders = await payload.find({
                collection: 'orders',
                where: {
                    customer: {
                        equals: user.id
                    }
                },
                depth: 0,
            });


            // returns only orders assigned to the current user
            if (orders && orders.docs.length > 0) {
                return {
                    id: {
                        in: orders.docs.map(order => order.id)
                    }
                }
            }
        }

    }

    // If user is not logged in, return false
    return false;
}
