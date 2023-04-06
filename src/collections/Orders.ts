import { CollectionConfig } from "payload/types";
import { isAdminOrHasOrderAccess } from "../access/isAdminOrHasOrderAccess";
import { isAdmin } from "../access/isAdmin";

const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: isAdminOrHasOrderAccess('id'),
        create: isAdmin,
    },
    fields: [
        {
            name: "name",
            type: "text",
            defaultValue: "New Test Order",
        }
    ]
};

export default Orders;