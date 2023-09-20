const {withNativeFederation, shareAll} = require('@angular-architects/native-federation/config');


function load(name) {

    const externals = [
        "@angular/router",
        "@angular/compiler",
        "@angular/forms",
        "@angular/common",
        "@angular/common/http",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/core",
        "rxjs",
        "rxjs/operators",
        "canvas-txt"
    ]

    const externalShared = {};

    for (const external of externals) {
        externalShared[external] = {
            singleton: true,
            strictVersion: true,
            requiredVersion: '>=12.0.0'
        }
    }

    externalShared["@ngxs/store"] =
        {
            singleton: true,
            strictVersion: true,
            requiredVersion: '>=1.0.0'
        };
    externalShared["zone.js"] = {
        singleton: true,
        strictVersion: true,
        requiredVersion: '>=0.0.0'
    };

//...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),

    const federationConfig = withNativeFederation({
        name: name,
        exposes: {},
        shared: externalShared,
        sharedMappings: [name],
        skip: [
            'rxjs/ajax',
            'rxjs/fetch',
            'rxjs/testing',
            'rxjs/webSocket',
            // Add further packages you don't need at runtime
        ]
    });
    return {federationConfig, externals, name}
}


module.exports = {load}

