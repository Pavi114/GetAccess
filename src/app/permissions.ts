export let List = [
    {
        name: 'location',
        isAccessible: false
    },
    {
        name: 'camera',
        isAccessible: false
    },
    {
        name: 'microphone',
        isAccessible: false
    },
    {
        name: 'notifications',
        isAccessible: false
    },
    {
        name: 'bg-sync',
        isAccessible: false
    },
    {
        name: 'clipboard',
        isAccessible: false
    }
];

export interface Permission {
    name: string,
    isAccessible: boolean
};