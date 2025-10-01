const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'station/:id', component: () => import('pages/StationDetail.vue') },
      { path: 'nosotros', component: () => import('pages/NosotrosPage.vue') },
      { path: 'contacto', component: () => import('pages/ContactoPage.vue') },
      { path: 'tunoticia', component: () => import('pages/PageEjemplo.vue') }

    ],
  },
];

export default routes;
