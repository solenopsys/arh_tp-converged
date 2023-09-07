import {defineConfig, splitVendorChunkPlugin} from "vite";
import {angular} from "../tools/vite-micro-federation/src";


const loadTsConfig = () => {
    const tsconfig = require('./tsconfig.base.json');
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
            '/dag': 'http://solenopsys.org',
            '/ipfs':
          {
                target: 'https://alpha.node.solenopsys.org', // Replace with your target server URL
                changeOrigin: true, // Set this to true if you want to change the origin (might not be needed)
            },
        },
    },

});



