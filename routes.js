const routes = require('next-routes');
module.exports =
    routes()
        .add({
            name: 'auth',
            pattern: '/auth/login',
            page: '_Auth/Login'
        })

        .add({
            name: 'cab-list',
            pattern: '/cab/list',
            page: '_Cab/List'
        })

        .add({
        name: 'my-booking',
        pattern: '/cab/my-bookings',
        page: '_Cab/MyBookings'
    })

    .add({
        name: 'welcome-cab',
        pattern: '/',
        page: '_Cab/Welcome'
    })

    .add({
        name: 'admin-section',
        pattern: '/admin/config',
        page: '_Admin/MainBuilder'
    })


