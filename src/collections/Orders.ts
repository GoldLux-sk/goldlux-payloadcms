import { CollectionConfig } from "payload/types";

const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        useAsTitle: "email",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "email",
            type: "text",
        }
    ]
};

export default Orders;