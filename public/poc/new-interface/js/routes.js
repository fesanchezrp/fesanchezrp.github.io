const routes = [
    {path: '/entities/new', alias: '/entidades/nuevo', name: 'new-entity', component: newEntity},
    {path: '/entities/:entityId', alias: '/entidades/:entityId', name: 'entity', component: entity, props: true},
    {path: '/customize', alias: '/personalizar', name: 'customize', component: customizeApplication},
    {path: '/reporter', alias: '/reporteador', name: 'reporter', component: reporter},
    {path: '/entities', alias: '/entidades', name: 'entities', component: entities},
    {path: '/edit', alias: '/editor', name: 'edit', component: helpEditor},
    {path: '/', component: mainMenu, props: true}
];

const router = new VueRouter({
    routes: routes
});