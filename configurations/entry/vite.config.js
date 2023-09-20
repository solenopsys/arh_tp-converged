import {defineConfig, splitVendorChunkPlugin} from "vite";
import {angular} from "../tools/solenopsys/vite-micro-federation/src/index";

export default defineConfig({
    plugins: [angular(),splitVendorChunkPlugin()], //
});
