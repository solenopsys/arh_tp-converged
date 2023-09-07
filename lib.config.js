import {defineConfig, splitVendorChunkPlugin} from "vite";
import {angular} from "../tools/vite-micro-federation/src";


const currentPath=process.cwd();

let pathSplit = currentPath.split("\\");
const libName=pathSplit.pop();
const company=pathSplit.pop();
const toRoot="../../../";

import {resolve,join} from "path";
import tsconfig from "./tsconfig.develop.json";
console.log("ENV",currentPath);

const indexFile=join(currentPath,"src/index.ts");

const external =
    ['rxjs', "@angular/core", "zonejs",
         "@angular/router",
        "@angular/platform-browser-dynamic",
        "three"
    ];

const loadTsConfig = () => {
    const tsconfig = require('./tsconfig.base.json');
    const paths = tsconfig.compilerOptions.paths;
    const aliases = {};
    for (const [key, value] of Object.entries(paths)) {
        if (!key.includes('/mf-') && !key.includes('/fr-'))
            aliases[key] = toRoot+ value[0];
    }
    return aliases;
}

export default defineConfig({
    plugins: [angular(), splitVendorChunkPlugin()], //
    resolve: {
        alias: loadTsConfig(),
    },
    build: {

        outDir:toRoot+ 'dist',
        lib: {
            entry: indexFile,
            name:   libName,
            formats: ['es'],
            fileName: (format) =>  `${company}/${libName}/index.js`
        },
        rollupOptions: {
            external: external,
            output: {
                // The 'manualChunks' option allows you to create custom chunks
                // In this example, we create a separate vendor chunk for 'lodash' library
                manualChunks: (id)=>{
                    // if (id.includes('@angular/platform-browser')) {
                    //     console.log("OK",id );
                    //     return `${company}/${libName}/pb.js`;
                    // }
                    if (id.includes('@angular/router')) {
                        console.log("OK",id );
                        return `${company}/${libName}/router.js`;
                    }
                    // if (id.includes('node_modules')) {
                    //     return `${company}/${libName}/vendor.js`;
                    // }

                },
            },
        },

    }
});
