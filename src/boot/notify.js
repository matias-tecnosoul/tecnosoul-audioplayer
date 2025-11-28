import { Notify } from "quasar";

export default ({ app }) => {
  app.config.globalProperties.$q = {
    ...app.config.globalProperties.$q,
    notify: Notify.create,
  };
};
