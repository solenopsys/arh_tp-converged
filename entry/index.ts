

const hosts=["host1","host2"]

for (const host of hosts) {
    // @ts-ignore
    import("./micros/"+host+"/src").then((module) => {
        module.init( module.MICRO);
    });

}
