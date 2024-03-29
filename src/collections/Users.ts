import { CollectionConfig } from 'payload/types';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    depth: 0,
    cookies: {
      sameSite: 'none',
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    }
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
          },
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
      name: 'hourlyRate',
      label: 'Hodinová sadzba',
      type: 'number',
      admin: {
        condition: (data) => {
          if (data.role === 'cleaner') {
            return true;
          } else {
            return false;
          }
        },
        width: '50%',
        placeholder: '€',
      }
    },
  ],
};

export default Users;