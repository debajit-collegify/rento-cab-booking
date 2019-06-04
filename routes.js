const routes = require('next-routes');
module.exports =
    routes()
        .add({
            name: 'admin-Login',
            pattern: '/admin/Login',
            page: '_Auth/NewAdminLogin'
        })
        .add({
            name: 'Login',
            pattern: '/Login',
            page: '_Auth/NewLogin'
        })

        .add({
            name: 'cab-list',
            pattern: '"/cab/list"',
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
        pattern: '"/admin/config"',
        page: '_Admin/MainBuilder'
    })


