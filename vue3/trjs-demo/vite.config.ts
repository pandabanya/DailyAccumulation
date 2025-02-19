import { templateCompilerOptions } from "@tresjs/core";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    define: {
        // enable hydration mismatch details in production build
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    },
    plugins: [
        vue({
            ...templateCompilerOptions
        })
    ]
})