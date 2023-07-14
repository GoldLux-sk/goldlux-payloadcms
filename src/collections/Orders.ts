import { CollectionConfig } from "payload/types";
import { isAdminOrHasOrderAccess } from "../access/isAdminOrHasOrderAccess";
import { isAdmin } from "../access/isAdmin";

const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: isAdminOrHasOrderAccess(),
        create: isAdmin,
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'customer',
                    label: 'Zakaznik',
                    type: 'relationship',
                    relationTo: 'users',
                    hasMany: false,
                    required: false,
                },
                {
                    name: 'status',
                    label: 'Stav',
                    type: 'select',
                    required: true,
                    options: [
                        {
                            label: 'Started',
                            value: 'started',
                        },
                        {
                            label: 'Planned',
                            value: 'planned',
                        },
                        {
                            label: 'Ended',
                            value: 'ended',
                        },
                        {
                            label: 'Cancelled',
                            value: 'cancelled',
                        },
                        {
                            label: 'Template',
                            value: 'template',
                        },
                    ],
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'start_end_date',
                    label: 'Dátum',
                    type: 'date',
                    required: true,
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'dd.MM.yyyy',
                        },
                        condition: (data) => {
                            if (data.status !== 'template') {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                },
                {
                    name: 'start_date',
                    label: 'Začiatočný dátum',
                    type: 'date',
                    required: true,
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'dd.MM.yyyy',
                        },
                        condition: (data) => {
                            if (data.status === 'template') {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                },
                {
                    name: 'end_date',
                    label: 'Konečný dátum',
                    type: 'date',
                    required: true,
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'dd.MM.yyyy',
                        },
                        condition: (data) => {
                            if (data.status === 'template') {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'monday',
                    type: 'checkbox',
                    label: 'Pondelok',
                    defaultValue: false
                },
                {
                    name: 'tuesday',
                    type: 'checkbox',
                    label: 'Utorok',
                    defaultValue: false
                },
                {
                    name: 'wednesday',
                    type: 'checkbox',
                    label: 'Streda',
                    defaultValue: false
                },
                {
                    name: 'thrursday',
                    type: 'checkbox',
                    label: 'Stvrtok',
                    defaultValue: false
                },
                {
                    name: 'friday',
                    type: 'checkbox',
                    label: 'Piatok',
                    defaultValue: false
                },
                {
                    name: 'saturday',
                    type: 'checkbox',
                    label: 'Sobota',
                    defaultValue: false
                },
                {
                    name: 'sunday',
                    type: 'checkbox',
                    label: 'Nedela',
                    defaultValue: false
                },
            ],
            admin: {
                condition: (data) => {
                    if (data.status === 'template') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'estimated_start',
                    label: 'Odhadovany zaciatok',
                    type: 'date',
                    required: true,
                    admin: {
                        date: {
                            pickerAppearance: 'timeOnly',
                            displayFormat: 'HH:mm',
                        },
                        width: '33%'
                    },
                },
                {
                    name: 'estimated_end',
                    label: 'Odhadovany koniec',
                    type: 'date',
                    required: true,
                    admin: {
                        date: {
                            pickerAppearance: 'timeOnly',
                            displayFormat: 'HH:mm',
                        },
                        width: '33%'
                    },
                },
                {
                    name: 'estimated_duration_h',
                    label: 'Odhadovany cas v hodinach',
                    type: 'number',
                    max: 24,
                    min: 0,
                    required: true,
                    admin: {
                        width: '33%'
                    },
                },
            ]
        },

        {
            type: 'row',
            fields: [
                {
                    name: 'real_start',
                    label: 'Skutocny zaciatok',
                    type: 'date',
                    admin: {
                        date: {
                            pickerAppearance: 'timeOnly',
                            displayFormat: 'HH:mm',
                        },
                        width: '33%'
                    },
                },
                {
                    name: 'real_end',
                    label: 'Skutocny koniec',
                    type: 'date',
                    admin: {
                        date: {
                            pickerAppearance: 'timeOnly',
                            displayFormat: 'HH:mm',
                        },
                        width: '33%'
                    },
                },
                {
                    name: 'real_duration_h',
                    label: 'Realny cas v hodinach',
                    type: 'number',
                    min: 0,
                    required: false,
                    admin: {
                        width: '33%'
                    },
                },
            ]
        },
        {
            name: 'manual_price',
            label: 'Manualna cena',
            type: 'number',
            admin: {
                width: '50%',
            },
        },
        {
            name: 'timer_state',
            type: 'json',
            admin: {
                hidden: true,
            }
        }
    ],
};

export default Orders;