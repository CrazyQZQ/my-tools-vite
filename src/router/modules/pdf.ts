export default {
  path: "/pdf",
  redirect: "/pdf/imgToPdf",
  meta: {
    icon: "informationLine",
    title: "pdf工具集",
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/pdf/imgToPdf",
      name: "imgToPdf",
      component: () => import("@/views/pdf/imgToPdf/index.vue"),
      meta: {
        title: "图片<->pdf",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
