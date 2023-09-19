import {defineConfig, splitVendorChunkPlugin} from "vite";

import path from "path";
import * as fs from "fs";

import { TsCompilerPlugin } from "./node_modules/@solenopsys/vite-federation-plugin/index";

const loadTsConfig = () => {
    const tsconfigPath = path.resolve(__dirname, 'tsconfig.base.json');
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    const paths = tsconfig.compilerOptions.paths;
    const aliases = {};
    for (const [key, value] of Object.entries(paths)) {
        if (!key.includes('/mf-') && !key.includes('/fr-'))
            aliases[key] = value[0];
    }
    return aliases;
}
export default defineConfig({
    plugins: [TsCompilerPlugin, splitVendorChunkPlugin()],
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