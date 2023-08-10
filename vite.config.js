import {defineConfig, splitVendorChunkPlugin} from "vite";
import {angular} from "../tools/vite-micro-federation/src/plugin";


const loadTsConfig = () => {
    const tsconfig = require('./tsconfig.develop.json');
    const paths = tsconfig.compilerOptions.paths;
    const aliases = {};
    for (const [key, value] of Object.entries(paths)) {
        if (!key.includes('/mf-') && !key.includes('/fr-'))
            aliases[key] = value[0];
    }
    return aliases;
}
export default defineConfig({
    plugins: [angular(["@ngxs_store"]), splitVendorChunkPlugin()], //
    resolve: {
        alias: loadTsConfig()
    },
    test: {
        globals: true,
        environment: "jsdom",
    },
    server: {
        proxy: {
            '/dag': 'http://solenopsys.org'
        },
    },

});



