import { CollectionBeforeChangeHook, CollectionConfig } from "payload/types";
import { isAdminOrHasOrderAccess } from "../access/isAdminOrHasOrderAccess";
import { isAdmin } from "../access/isAdmin";
import payload from "payload";

const calculateRealDuration: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
}) => {
  if (data.real_start && data.real_end) {
    const start = new Date(data.real_start);
    const end = new Date(data.real_end);
    const duration = Math.abs(end.getTime() - start.getTime()) / 3600000; // Convert milliseconds to hours
    return {
      ...data,
      real_duration_h: duration,
    };
  }
  return data;
};
const calculateManualPrice: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
}) => {
  if (data.real_duration_h && data.cleaner) {
    const cleaner = await payload.findByID({
      collection: "users",
      id: data.cleaner,
    });

    if (cleaner && cleaner.hourlyRate) {
      const price = data.real_duration_h * cleaner.hourlyRate;
      return {
        ...data,
        manual_price: price,
      };
    }
  }
  return data;
};

const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAdminOrHasOrderAccess(),
    create: isAdmin,
    delete: isAdmin,
    update: isAdminOrHasOrderAccess(),
  },
  hooks: {
    beforeChange: [calculateRealDuration, calculateManualPrice],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "customer",
          label: "Zakaznik",
          type: "relationship",
          relationTo: "users",
          filterOptions: ({ relationTo }) => {
            if (relationTo === "users") {
              return {
                role: { equals: "customer" },
              };
            }
          },
          hasMany: false,
          required: true,
        },
        {
          name: "cleaner",
          label: "Upratovač",
          type: "relationship",
          relationTo: "users",
          filterOptions: ({ relationTo }) => {
            if (relationTo === "users") {
              return {
                role: { equals: "cleaner" },
              };
            }
          },
          hasMany: false,
          required: true,
        },
        {
          name: "status",
          label: "Stav",
          type: "select",
          required: true,
          options: [
            {
              label: "Začatá",
              value: "started",
            },
            {
              label: "Plánovaná",
              value: "planned",
            },
            {
              label: "Skončená",
              value: "ended",
            },
            {
              label: "Zrušená",
              value: "cancelled",
            },
            {
              label: "Opakujúca sa",
              value: "template",
            },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "start_end_date",
          label: "Dátum",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "dd.MM.yyyy",
            },
            condition: (data) => {
              if (data.status !== "template") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        {
          name: "start_date",
          label: "Začiatočný dátum",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "dd.MM.yyyy",
            },
            condition: (data) => {
              if (data.status === "template") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        {
          name: "end_date",
          label: "Konečný dátum",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "dd.MM.yyyy",
            },
            condition: (data) => {
              if (data.status === "template") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "monday",
          type: "checkbox",
          label: "Pondelok",
          defaultValue: false,
        },
        {
          name: "tuesday",
          type: "checkbox",
          label: "Utorok",
          defaultValue: false,
        },
        {
          name: "wednesday",
          type: "checkbox",
          label: "Streda",
          defaultValue: false,
        },
        {
          name: "thrursday",
          type: "checkbox",
          label: "Stvrtok",
          defaultValue: false,
        },
        {
          name: "friday",
          type: "checkbox",
          label: "Piatok",
          defaultValue: false,
        },
        {
          name: "saturday",
          type: "checkbox",
          label: "Sobota",
          defaultValue: false,
        },
        {
          name: "sunday",
          type: "checkbox",
          label: "Nedela",
          defaultValue: false,
        },
      ],
      admin: {
        condition: (data) => {
          if (data.status === "template") {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "estimated_start",
          label: "Odhadovany zaciatok",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "timeOnly",
              displayFormat: "HH:mm",
            },
            width: "33%",
          },
        },
        {
          name: "estimated_end",
          label: "Odhadovany koniec",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "timeOnly",
              displayFormat: "HH:mm",
            },
            width: "33%",
          },
        },
        {
          name: "estimated_duration_h",
          label: "Odhadovany cas v hodinach",
          type: "number",
          max: 24,
          min: 0,
          required: true,
          admin: {
            width: "33%",
          },
        },
      ],
    },

    {
      type: "row",
      fields: [
        {
          name: "real_start",
          label: "Skutocny zaciatok",
          type: "date",
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
              displayFormat: "dd.MM. HH:mm",
            },
            width: "33%",
          },
        },
        {
          name: "real_end",
          label: "Skutocny koniec",
          type: "date",
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
              displayFormat: "dd.MM. HH:mm",
            },
            width: "33%",
          },
        },
        {
          name: "real_duration_h",
          label: "Realny cas v hodinach",
          type: "number",
          min: 0,
          required: false,
          admin: {
            width: "33%",
          },
        },
      ],
    },
    {
      name: "manual_price",
      label: "Manualna cena",
      type: "number",
      admin: {
        width: "50%",
      },
    },
    {
      name: "timer_state",
      type: "json",
      admin: {
        hidden: true,
      },
    },
  ],
};

export default Orders;
