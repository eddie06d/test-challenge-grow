export const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: {
            compare: (a, b) => a.username.localeCompare(b.username),
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: {
            compare: (a, b) => a.username.localeCompare(b.username),
        },
    },
    {
        title: 'Full name',
        dataIndex: 'fullname',
        key: 'fullname',
        sorter: {
            compare: (a, b) => a.username.localeCompare(b.username),
        },
    },
];