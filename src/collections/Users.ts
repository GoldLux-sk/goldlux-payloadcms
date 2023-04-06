import { CollectionConfig } from 'payload/types';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrHasOrderAccess } from '../access/isAdminOrHasOrderAccess';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    depth: 0,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrSelf,
    create: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          label: "Meno",
          type: "text",
          admin: {
            width: "50%",
          }
        },
        {
          name: "lastName",
          label: "Priezvisko",
          type: "text",
          admin: {
            width: "50%",
          }
        },
      ],
    },
    {
      name: 'role',
      label: 'Rola',
      saveToJWT: true,
      type: 'radio',
      defaultValue: 'customer',
      access: {
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Zákazník',
          value: 'customer',
        },
        {
          label: 'Upratovač',
          value: 'cleaner',
        },
      ],
    },
    {
      name: 'orders',
      label: 'Objednávky',
      type: 'relationship',
      relationTo: 'orders',
      hasMany: true,
    },
  ],
};

export default Users;