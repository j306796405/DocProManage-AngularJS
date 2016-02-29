//office
//myApp.constant('FAKE_URL', '/docmapp/');
//myApp.constant('STATIC_URL', '/docmapp/');

//home
myApp.constant('FAKE_URL', '');

//dev
//myApp.constant('FAKE_URL', '/docmapp_beta/');
//myApp.constant('STATIC_URL', 'http://hfdoc.qa.nt.ctripcorp.com/static/docmapp_static.beta/');

//release
myApp.constant('FAKE_URL', '/docmapp/');
myApp.constant('STATIC_URL', 'http://hfdoc.qa.nt.ctripcorp.com/static/docmapp_static/');

myApp.constant('DOC_TYPE_LOGO', [
    {
        name: '项目',
        url: 'img/doc-type-project.png'
    },
    {
        name: '团队',
        url: 'img/doc-type-team.png'
    },
    {
        name: '变更',
        url: 'img/doc-type-update.png'
    }
])

myApp.constant('LOGIN', '');
myApp.constant('LOGOUT', 'https://cas.ctripcorp.com/caso/logout?service=');
