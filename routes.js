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
            pattern: `/cabList`,
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
        pattern: `/adminConfig`,
        page: '_Admin/MainBuilder'
    })


