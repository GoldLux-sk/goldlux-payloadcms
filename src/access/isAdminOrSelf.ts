import { Access } from "payload/config";
import payload from "payload";

export const isAdminOrSelf: Access = async ({ req: { user }, data }) => {
  if (user) {
    if (user.role === "admin") {
      return true;
    }

    if (user.role === "cleaner") {
      // Fetch all orders where the cleaner is the current user
      const orders = await payload.find({
        collection: "orders",
        where: {
          cleaner: {
            equals: user.id,
          },
        },
        depth: 1,
      });

      const users = await payload.find({
        collection: "users",
        where: {
          role: {
            equals: "customer",
          },
        },
      });

      // If the cleaner has orders, return the customer IDs associated with those orders
      if (orders && orders.docs.length > 0 && users && users.docs.length > 0) {
        return {
          id: {
            in: orders.docs.map((order) => order.customer.id),
          },
        };
      } else {
        return {
          id: {
            equals: user.id,
          },
        };
      }
    }

    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};
