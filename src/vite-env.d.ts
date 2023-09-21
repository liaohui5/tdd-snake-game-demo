/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// docs: https://cn.vitejs.dev/guide/env-and-mode.html#modes
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<object, object, any>;
  export default component;
}


