"use strict";
// A naive attempt at getting the global `this`. Don’t use `this`!
const getGlobalThis = function () {
    // @ts-ignore
    if (typeof globalThis !== 'undefined')
        return globalThis;
    // @ts-ignore
    if (typeof self !== 'undefined')
        return self;
    // @ts-ignore
    if (typeof window !== 'undefined')
        return window;
    // Note: this might still return the wrong result!
    // @ts-ignore
    if (typeof this !== 'undefined')
        return this;
    throw new Error('Unable to locate global `this`');
};
const globalObject = getGlobalThis();
var loader;
(function (loader) {
    'use strict';
    const MODULE_LOADING = 1;
    const MODULE_READY = 2;
    let unnamedModules = 0;
    const anonymousQueue = [];
    const cycles = [];
    const settings = {
        baseUrl: ''
    };
    const registeredModules = {};
    function config(config) {
        if (typeof config === 'object') {
            for (const x in config) {
                if (config.hasOwnProperty(x)) {
                    ;
                    settings[x] = config[x];
                }
            }
        }
    }
    loader.config = config;
    function define(first, second, third) {
        let moduleToLoad = null;
        let factory = {};
        let dependencies = null;
        if (typeof first === 'function') {
            factory = first;
        }
        else if (typeof first === 'string') {
            moduleToLoad = first;
            if (typeof second === 'function') {
                factory = second;
            }
            else if (second instanceof Array) {
                dependencies = second;
                factory = third;
            }
        }
        else if (first instanceof Array) {
            dependencies = first;
            if (typeof second === 'function') {
                factory = second;
            }
        }
        dependencies = dependencies || ['require', 'exports', 'module'];
        if (moduleToLoad === null) {
            moduleToLoad = `unnamed-module-${unnamedModules++}`;
        }
        moduleToLoad = normalizeModuleId(moduleToLoad);
        function ready(deps) {
            const module = registeredModules[moduleToLoad];
            if (!module)
                throw new Error('Could not access registered module ' + moduleToLoad);
            let exports = module.exports;
            exports =
                typeof factory === 'function'
                    ? factory.apply(globalObject, deps) || exports
                    : factory;
            module.exports = exports;
            moduleReady(moduleToLoad);
        }
        dependencies = (dependencies || []).map((dep) => resolve(moduleToLoad, dep));
        if (!registeredModules[moduleToLoad]) {
            registeredModules[moduleToLoad] = {
                name: moduleToLoad,
                parent: null,
                dclamd: MODULE_LOADING,
                dependencies,
                handlers: [],
                exports: {},
                dependants: new Set()
            };
        }
        registeredModules[moduleToLoad].dependencies = dependencies;
        require(dependencies, ready, (err) => {
            if (typeof onerror === 'function') {
                onerror(err);
            }
            else {
                throw err;
            }
        }, moduleToLoad);
    }
    loader.define = define;
    (function (define) {
        define.amd = {};
        define.modules = registeredModules;
    })(define = loader.define || (loader.define = {}));
    function moduleReady(moduleName) {
        const module = registeredModules[moduleName];
        if (!module)
            throw new Error('Could not access registered module ' + moduleName);
        module.dclamd = MODULE_READY;
        const handlers = module.handlers;
        if (handlers && handlers.length) {
            for (let x = 0; x < handlers.length; x++) {
                handlers[x](registeredModules[moduleName]);
            }
        }
    }
    /**
     * Walks (recursively) the dependencies of 'from' in search of 'to'.
     * Returns cycle as array.
     */
    function getCyclePath(fromModule, toModule, depth) {
        if (!registeredModules[fromModule]) {
            return null;
        }
        if (fromModule === toModule || depth === 50)
            return [fromModule];
        const dependencies = registeredModules[fromModule].dependencies;
        for (let i = 0, len = dependencies.length; i < len; i++) {
            const path = getCyclePath(dependencies[i], toModule, depth + 1);
            if (path !== null) {
                path.push(fromModule);
                return path;
            }
        }
        return null;
    }
    /**
     * Walks (recursively) the dependencies of 'from' in search of 'to'.
     * Returns true if there is such a path or false otherwise.
     * @param from Module id to start at
     * @param to Module id to look for
     */
    function hasDependencyPath(fromId, toId) {
        const from = registeredModules[fromId];
        if (!from) {
            return false;
        }
        const inQueue = {};
        for (const i in registeredModules) {
            inQueue[i] = false;
        }
        const queue = [];
        // Insert 'from' in queue
        queue.push(from);
        inQueue[fromId] = true;
        while (queue.length > 0) {
            // Pop first inserted element of queue
            const element = queue.shift();
            const dependencies = element.dependencies;
            if (dependencies) {
                // Walk the element's dependencies
                for (let i = 0, len = dependencies.length; i < len; i++) {
                    const dependency = dependencies[i];
                    if (dependency === toId) {
                        // There is a path to 'to'
                        return true;
                    }
                    const dependencyModule = registeredModules[dependency];
                    if (dependencyModule && !inQueue[dependency]) {
                        // Insert 'dependency' in queue
                        inQueue[dependency] = true;
                        queue.push(dependencyModule);
                    }
                }
            }
        }
        // There is no path to 'to'
        return false;
    }
    function require(dependencies, callback, errorCallback, parentModule) {
        const dependenciesResults = new Array(dependencies.length).fill(null);
        let loadedCount = 0;
        let hasLoaded = false;
        if (typeof dependencies === 'string') {
            if (registeredModules[dependencies]) {
                if (registeredModules[dependencies].dclamd === MODULE_LOADING) {
                    throw new Error(`Trying to load ${dependencies} from ${parentModule}. The first module is still loading.`);
                }
                return registeredModules[dependencies];
            }
            throw new Error(dependencies +
                ' has not been defined. Please include it as a dependency in ' +
                parentModule +
                "'s define()");
        }
        const depsLength = dependencies.length;
        for (let index = 0; index < depsLength; index++) {
            switch (dependencies[index]) {
                case 'require':
                    const _require = function (new_module, callback, errorCallback) {
                        return require(new_module, callback, errorCallback, parentModule);
                    };
                    _require.toUrl = function (module) {
                        return toUrl(module, parentModule);
                    };
                    dependenciesResults[index] = _require;
                    loadedCount++;
                    break;
                case 'exports':
                    if (!registeredModules[parentModule]) {
                        throw new Error('Parent module ' + parentModule + ' not registered yet');
                    }
                    dependenciesResults[index] = registeredModules[parentModule].exports;
                    loadedCount++;
                    break;
                case 'module':
                    dependenciesResults[index] = {
                        id: parentModule,
                        uri: toUrl(parentModule)
                    };
                    loadedCount++;
                    break;
                default: {
                    // If we have a circular dependency, then we resolve the module even if it hasn't loaded yet
                    const dependency = dependencies[index];
                    const hasCycles = hasDependencyPath(dependency, parentModule);
                    const handleLoadedModule = () => {
                        dependenciesResults[index] = registeredModules[dependency].exports;
                        loadedCount++;
                        if (loadedCount === depsLength && callback) {
                            hasLoaded = true;
                            callback(dependenciesResults);
                        }
                    };
                    if (hasCycles) {
                        const cyclePath = getCyclePath(dependency, parentModule, 0);
                        if (cyclePath) {
                            cyclePath.reverse();
                            cyclePath.push(dependency);
                            cycles.push(cyclePath);
                        }
                        load(dependency, () => { }, errorCallback, parentModule);
                        handleLoadedModule();
                    }
                    else {
                        load(dependency, handleLoadedModule, errorCallback, parentModule);
                    }
                    break;
                }
            }
        }
        if (!hasLoaded && loadedCount === depsLength && callback) {
            callback(dependenciesResults);
        }
    }
    loader.require = require;
    function createMethodHandler(rpcHandle, method) {
        return function () {
            return dcl.callRpc(rpcHandle, method.name, 
            // eslint-disable-next-line prefer-rest-params
            anonymousQueue.slice.call(arguments, 0));
        };
    }
    // returns: resolvedModuleName
    function resolve(fromModule, toModule) {
        return fromModule ? toUrl(toModule, fromModule) : toModule;
    }
    function load(moduleName, callback, errorCallback, parentModule) {
        if (registeredModules[moduleName]) {
            registeredModules[moduleName].dependants.add(parentModule);
            if (registeredModules[moduleName].dclamd === MODULE_LOADING) {
                callback && registeredModules[moduleName].handlers.push(callback);
            }
            else {
                callback && callback(registeredModules[moduleName]);
            }
            return;
        }
        else {
            registeredModules[moduleName] = {
                name: moduleName,
                parent: parentModule,
                dclamd: MODULE_LOADING,
                handlers: [callback],
                dependencies: [],
                dependants: new Set([parentModule]),
                exports: {}
            };
        }
        if (moduleName.indexOf('@') === 0) {
            const exports = registeredModules[moduleName].exports;
            if (typeof dcl.loadModule === 'function') {
                dcl
                    .loadModule(moduleName, exports)
                    .then((descriptor) => {
                    for (const i in descriptor.methods) {
                        const method = descriptor.methods[i];
                        exports[method.name] = createMethodHandler(descriptor.rpcHandle, method);
                    }
                    moduleReady(moduleName);
                })
                    .catch((e) => {
                    errorCallback(e);
                });
            }
            else {
                throw new Error('Asynchronous modules will not work because loadModule function is not present');
            }
        }
    }
    if (typeof dcl !== 'undefined') {
        dcl.onStart(() => {
            const unknownModules = new Set();
            const notLoadedModules = [];
            for (const i in registeredModules) {
                if (registeredModules[i]) {
                    if (registeredModules[i].dclamd === MODULE_LOADING) {
                        notLoadedModules.push(registeredModules[i]);
                    }
                    registeredModules[i].dependencies.forEach(($) => {
                        if ($ === 'require' || $ === 'exports' || $ === 'module')
                            return;
                        if (!registeredModules[$])
                            unknownModules.add($);
                    });
                }
            }
            const errorParts = [];
            if (cycles.length) {
                errorParts.push(`\n> Cyclic dependencies: ${cycles
                    .map(($) => '\n  - ' + $.join(' -> '))
                    .join('')}`);
            }
            if (unknownModules.size) {
                errorParts.push(`\n> Undeclared/unknown modules: ${Array.from(unknownModules)
                    .map(($) => '\n  - ' + $)
                    .join('')}`);
            }
            if (notLoadedModules.length) {
                errorParts.push(`\n> These modules didn't load: ${notLoadedModules
                    .map(($) => '\n  - ' + $.name)
                    .join('')}.\n`);
            }
            if (errorParts.length) {
                throw new Error(errorParts.join('\n'));
            }
        });
    }
    /**
     * Normalize 'a/../name' to 'name', etc.
     */
    function normalizeModuleId(moduleId) {
        let r = moduleId, pattern;
        // replace /./ => /
        pattern = /\/\.\//;
        while (pattern.test(r)) {
            r = r.replace(pattern, '/');
        }
        // replace ^./ => nothing
        r = r.replace(/^\.\//g, '');
        // replace /aa/../ => / (BUT IGNORE /../../)
        pattern =
            /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
        while (pattern.test(r)) {
            r = r.replace(pattern, '/');
        }
        // replace ^aa/../ => nothing (BUT IGNORE ../../)
        r = r.replace(/^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//, '');
        // replace ^/ => nothing
        r = r.replace(/^\//g, '');
        return r;
    }
    /**
     * Resolve relative module ids
     */
    function resolveModule(moduleId, parentModule) {
        let result = moduleId;
        if (!result.startsWith('@')) {
            if (result.startsWith('./') || result.startsWith('../')) {
                const currentPath = parentModule.split('/');
                currentPath.pop();
                result = normalizeModuleId(currentPath.join('/') + '/' + result);
            }
        }
        return result;
    }
    function toUrl(moduleName, parentModule) {
        switch (moduleName) {
            case 'require':
            case 'exports':
            case 'module':
                return moduleName;
        }
        if (parentModule) {
            return resolveModule(moduleName, parentModule);
        }
        return normalizeModuleId(moduleName);
    }
    require.toUrl = toUrl;
})(loader || (loader = {}));
globalObject.define = loader.define;
globalObject.dclamd = loader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FtZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBZ0JBLGtFQUFrRTtBQUNsRSxNQUFNLGFBQWEsR0FBRztJQUNwQixhQUFhO0lBQ2IsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXO1FBQUUsT0FBTyxVQUFVLENBQUE7SUFDeEQsYUFBYTtJQUNiLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBQzVDLGFBQWE7SUFDYixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVc7UUFBRSxPQUFPLE1BQU0sQ0FBQTtJQUNoRCxrREFBa0Q7SUFDbEQsYUFBYTtJQUNiLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRCxDQUFDLENBQUE7QUFFRCxNQUFNLFlBQVksR0FBSSxhQUFxQixFQUFFLENBQUE7QUFFN0MsSUFBVSxNQUFNLENBc2ZmO0FBdGZELFdBQVUsTUFBTTtJQUNkLFlBQVksQ0FBQTtJQUVaLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQTtJQUN4QixNQUFNLFlBQVksR0FBRyxDQUFDLENBQUE7SUFFdEIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFBO0lBRXRCLE1BQU0sY0FBYyxHQUFVLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLE1BQU0sR0FBZSxFQUFFLENBQUE7SUFFN0IsTUFBTSxRQUFRLEdBQUc7UUFDZixPQUFPLEVBQUUsRUFBRTtLQUNaLENBQUE7SUFFRCxNQUFNLGlCQUFpQixHQUEyQixFQUFFLENBQUE7SUFFcEQsU0FBZ0IsTUFBTSxDQUFDLE1BQTJCO1FBQ2hELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLEtBQUssTUFBTSxDQUFDLElBQUksTUFBTSxFQUFFO2dCQUN0QixJQUFJLE1BQU0sQ0FBQyxjQUFj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LENBQUMsQ0FBQTtTQUMvQztRQUNELE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ3ZCLENBQUMsRUF0ZlMsTUFBTSxLQUFOLE1BQU0sUUFzZmY7QUFFRCxZQUFZLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDbkMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXMgKi9cbnR5cGUgTW9kdWxlID0ge1xuICBuYW1lOiBzdHJpbmdcbiAgZGNsYW1kOiAxIHwgMlxuICBwYXJlbnQ6IHN0cmluZyB8IG51bGxcbiAgZGVwZW5kYW50czogU2V0PHN0cmluZz5cbiAgZGVwZW5kZW5jaWVzOiBBcnJheTxzdHJpbmc+XG4gIGhhbmRsZXJzOiBNb2R1bGVMb2FkZWRIYW5kbGVyW11cbiAgZXhwb3J0czogYW55XG59XG5cbnR5cGUgTW9kdWxlTG9hZGVkSGFuZGxlciA9IChtb2R1bGU6IE1vZHVsZSkgPT4gdm9pZFxuXG5kZWNsYXJlIGxldCBvbmVycm9yOiAoKGVycjogRXJyb3IpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbi8vIEEgbmFpdmUgYXR0ZW1wdCBhdCBnZXR0aW5nIHRoZSBnbG9iYWwgYHRoaXNgLiBEb27igJl0IHVzZSBgdGhpc2AhXG5jb25zdCBnZXRHbG9iYWxUaGlzID0gZnVuY3Rpb24gKCkge1xuICAvLyBAdHMtaWdub3JlXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBnbG9iYWxUaGlzXG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHNlbGZcbiAgLy8gQHRzLWlnbm9yZVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiB3aW5kb3dcbiAgLy8gTm90ZTogdGhpcyBtaWdodCBzdGlsbCByZXR1cm4gdGhlIHdyb25nIHJlc3VsdCFcbiAgLy8gQHRzLWlnbm9yZVxuICBpZiAodHlwZW9mIHRoaXMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGhpc1xuICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBsb2NhdGUgZ2xvYmFsIGB0aGlzYCcpXG59XG5cbmNvbnN0IGdsb2JhbE9iamVjdCA9IChnZXRHbG9iYWxUaGlzIGFzIGFueSkoKVxuXG5uYW1lc3BhY2UgbG9hZGVyIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgY29uc3QgTU9EVUxFX0xPQURJTkcgPSAxXG4gIGNvbnN0IE1PRFVMRV9SRUFEWSA9IDJcblxuICBsZXQgdW5uYW1lZE1vZHVsZXMgPSAwXG5cbiAgY29uc3QgYW5vbnltb3VzUXVldWU6IGFueVtdID0gW11cbiAgY29uc3QgY3ljbGVzOiBzdHJpbmdbXVtdID0gW11cblxuICBjb25zdCBzZXR0aW5ncyA9IHtcbiAgICBiYXNlVXJsOiAnJ1xuICB9XG5cbiAgY29uc3QgcmVnaXN0ZXJlZE1vZHVsZXM6IFJlY29yZDxzdHJpbmcsIE1vZHVsZT4gPSB7fVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjb25maWcoY29uZmlnOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGNvbnN0IHggaW4gY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkoeCkpIHtcbiAgICAgICAgICA7KHNldHRpbmdzIGFzIGFueSlbeF0gPSBjb25maWdbeF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBkZWZpbmUoZmFjdG9yeTogRnVuY3Rpb24pOiB2b2lkXG4gIGV4cG9ydCBmdW5jdGlvbiBkZWZpbmUoaWQ6IHN0cmluZywgZmFjdG9yeTogRnVuY3Rpb24pOiB2b2lkXG4gIGV4cG9ydCBmdW5jdGlvbiBkZWZpbmUoZGVwZW5kZW5jaWVzOiBzdHJpbmdbXSwgZmFjdG9yeTogRnVuY3Rpb24pOiB2b2lkXG4gIGV4cG9ydCBmdW5jdGlvbiBkZWZpbmUoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBkZXBlbmRlbmNpZXM6IHN0cmluZ1tdLFxuICAgIGZhY3Rvcnk6IEZ1bmN0aW9uXG4gICk6IHZvaWRcbiAgZXhwb3J0IGZ1bmN0aW9uIGRlZmluZShcbiAgICBmaXJzdDogc3RyaW5nIHwgRnVuY3Rpb24gfCBzdHJpbmdbXSxcbiAgICBzZWNvbmQ/OiBzdHJpbmdbXSB8IHN0cmluZyB8IEZ1bmN0aW9uLFxuICAgIHRoaXJkPzogRnVuY3Rpb24gfCBvYmplY3RcbiAgKTogdm9pZCB7XG4gICAgbGV0IG1vZHVsZVRvTG9hZDogc3RyaW5nIHwgbnVsbCA9IG51bGxcbiAgICBsZXQgZmFjdG9yeTogRnVuY3Rpb24gfCBvYmplY3QgPSB7fVxuICAgIGxldCBkZXBlbmRlbmNpZXM6IHN0cmluZ1tdIHwgbnVsbCA9IG51bGxcblxuICAgIGlmICh0eXBlb2YgZmlyc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZhY3RvcnkgPSBmaXJzdFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0ID09PSAnc3RyaW5nJykge1xuICAgICAgbW9kdWxlVG9Mb2FkID0gZmlyc3RcblxuICAgICAgaWYgKHR5cGVvZiBzZWNvbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmFjdG9yeSA9IHNlY29uZFxuICAgICAgfSBlbHNlIGlmIChzZWNvbmQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBkZXBlbmRlbmNpZXMgPSBzZWNvbmRcbiAgICAgICAgZmFjdG9yeSA9IHRoaXJkIVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZmlyc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgZGVwZW5kZW5jaWVzID0gZmlyc3RcbiAgICAgIGlmICh0eXBlb2Ygc2Vjb25kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZhY3RvcnkgPSBzZWNvbmRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXMgfHwgWydyZXF1aXJlJywgJ2V4cG9ydHMnLCAnbW9kdWxlJ11cblxuICAgIGlmIChtb2R1bGVUb0xvYWQgPT09IG51bGwpIHtcbiAgICAgIG1vZHVsZVRvTG9hZCA9IGB1bm5hbWVkLW1vZHVsZS0ke3VubmFtZWRNb2R1bGVzKyt9YFxuICAgIH1cblxuICAgIG1vZHVsZVRvTG9hZCA9IG5vcm1hbGl6ZU1vZHVsZUlkKG1vZHVsZVRvTG9hZClcblxuICAgIGZ1bmN0aW9uIHJlYWR5KGRlcHM6IGFueVtdKSB7XG4gICAgICBjb25zdCBtb2R1bGUgPSByZWdpc3RlcmVkTW9kdWxlc1ttb2R1bGVUb0xvYWQhXVxuXG4gICAgICBpZiAoIW1vZHVsZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgYWNjZXNzIHJlZ2lzdGVyZWQgbW9kdWxlICcgKyBtb2R1bGVUb0xvYWQpXG5cbiAgICAgIGxldCBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHNcblxuICAgICAgZXhwb3J0cyA9XG4gICAgICAgIHR5cGVvZiBmYWN0b3J5ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyBmYWN0b3J5LmFwcGx5KGdsb2JhbE9iamVjdCwgZGVwcykgfHwgZXhwb3J0c1xuICAgICAgICAgIDogZmFjdG9yeVxuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNcblxuICAgICAgbW9kdWxlUmVhZHkobW9kdWxlVG9Mb2FkISlcbiAgICB9XG5cbiAgICBkZXBlbmRlbmNpZXMgPSAoZGVwZW5kZW5jaWVzIHx8IFtdKS5tYXAoKGRlcCkgPT5cbiAgICAgIHJlc29sdmUobW9kdWxlVG9Mb2FkISwgZGVwKVxuICAgIClcblxuICAgIGlmICghcmVnaXN0ZXJlZE1vZHVsZXNbbW9kdWxlVG9Mb2FkXSkge1xuICAgICAgcmVnaXN0ZXJlZE1vZHVsZXNbbW9kdWxlVG9Mb2FkXSA9IHtcbiAgICAgICAgbmFtZTogbW9kdWxlVG9Mb2FkISxcbiAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICBkY2xhbWQ6IE1PRFVMRV9MT0FESU5HLFxuICAgICAgICBkZXBlbmRlbmNpZXMsXG4gICAgICAgIGhhbmRsZXJzOiBbXSxcbiAgICAgICAgZXhwb3J0czoge30sXG4gICAgICAgIGRlcGVuZGFudHM6IG5ldyBTZXQoKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyZWRNb2R1bGVzW21vZHVsZVRvTG9hZF0uZGVwZW5kZW5jaWVzID0gZGVwZW5kZW5jaWVzXG5cbiAgICByZXF1aXJlKGRlcGVuZGVuY2llcywgcmVhZHksIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIG9uZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb25lcnJvcihlcnIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIH1cbiAgICB9LCBtb2R1bGVUb0xvYWQhKVxuICB9XG5cbiAgZXhwb3J0IG5hbWVzcGFjZSBkZWZpbmUge1xuICAgIGV4cG9ydCBjb25zdCBhbWQgPSB7fVxuICAgIGV4cG9ydCBjb25zdCBtb2R1bGVzID0gcmVnaXN0ZXJlZE1vZHVsZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vZHVsZVJlYWR5KG1vZHVsZU5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IG1vZHVsZSA9IHJlZ2lzdGVyZWRNb2R1bGVzW21vZHVsZU5hbWVdXG5cbiAgICBpZiAoIW1vZHVsZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGFjY2VzcyByZWdpc3RlcmVkIG1vZHVsZSAnICsgbW9kdWxlTmFtZSlcblxuICAgIG1vZHVsZS5kY2xhbWQgPSBNT0RVTEVfUkVBRFlcblxuICAgIGNvbnN0IGhhbmRsZXJzOiBNb2R1bGVMb2FkZWRIYW5kbGVyW10gPSBtb2R1bGUuaGFuZGxlcnNcblxuICAgIGlmIChoYW5kbGVycyAmJiBoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgaGFuZGxlcnMubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgaGFuZGxlcnNbeF0ocmVnaXN0ZXJlZE1vZHVsZXNbbW9kdWxlTmFtZV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdhbGtzIChyZWN1cnNpdmVseSkgdGhlIGRlcGVuZGVuY2llcyBvZiAnZnJvbScgaW4gc2VhcmNoIG9mICd0bycuXG4gICAqIFJldHVybnMgY3ljbGUgYXMgYXJyYXkuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRDeWNsZVBhdGgoXG4gICAgZnJvbU1vZHVsZTogc3RyaW5nLFxuICAgIHRvTW9kdWxlOiBzdHJpbmcsXG4gICAgZGVwdGg6IG51bWJlclxuICApOiBzdHJpbmdbXSB8IG51bGwge1xuICAgIGlmICghcmVnaXN0ZXJlZE1vZHVsZXNbZnJvbU1vZHVsZV0pIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKGZyb21Nb2R1bGUgPT09IHRvTW9kdWxlIHx8IGRlcHRoID09PSA1MCkgcmV0dXJuIFtmcm9tTW9kdWxlXVxuXG4gICAgY29uc3QgZGVwZW5kZW5jaWVzID0gcmVnaXN0ZXJlZE1vZHVsZXNbZnJvbU1vZHVsZV0uZGVwZW5kZW5jaWVzXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZGVwZW5kZW5jaWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBwYXRoID0gZ2V0Q3ljbGVQYXRoKGRlcGVuZGVuY2llc1tpXSwgdG9Nb2R1bGUsIGRlcHRoICsgMSlcbiAgICAgIGlmIChwYXRoICE9PSBudWxsKSB7XG4gICAgICAgIHBhdGgucHVzaChmcm9tTW9kdWxlKVxuICAgICAgICByZXR1cm4gcGF0aFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogV2Fsa3MgKHJlY3Vyc2l2ZWx5KSB0aGUgZGVwZW5kZW5jaWVzIG9mICdmcm9tJyBpbiBzZWFyY2ggb2YgJ3RvJy5cbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIHN1Y2ggYSBwYXRoIG9yIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHBhcmFtIGZyb20gTW9kdWxlIGlkIHRvIHN0YXJ0IGF0XG4gICAqIEBwYXJhbSB0byBNb2R1bGUgaWQgdG8gbG9vayBmb3JcbiAgICovXG4gIGZ1bmN0aW9uIGhhc0RlcGVuZGVuY3lQYXRoKGZyb21JZDogc3RyaW5nLCB0b0lkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBmcm9tID0gcmVnaXN0ZXJlZE1vZHVsZXNbZnJvbUlkXVxuICAgIGlmICghZnJvbSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgaW5RdWV1ZTogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSB7fVxuICAgIGZvciAoY29uc3QgaSBpbiByZWdpc3RlcmVkTW9kdWxlcykge1xuICAgICAgaW5RdWV1ZVtpXSA9IGZhbHNlXG4gICAgfVxuICAgIGNvbnN0IHF1ZXVlOiBNb2R1bGVbXSA9IFtdXG5cbiAgICAvLyBJbnNlcnQgJ2Zyb20nIGluIHF1ZXVlXG4gICAgcXVldWUucHVzaChmcm9tKVxuICAgIGluUXVldWVbZnJvbUlkXSA9IHRydWVcblxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBQb3AgZmlyc3QgaW5zZXJ0ZWQgZWxlbWVudCBvZiBxdWV1ZVxuICAgICAgY29uc3QgZWxlbWVudCA9IHF1ZXVlLnNoaWZ0KCkhXG4gICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBlbGVtZW50LmRlcGVuZGVuY2llc1xuICAgICAgaWYgKGRlcGVuZGVuY2llcykge1xuICAgICAgICAvLyBXYWxrIHRoZSBlbGVtZW50J3MgZGVwZW5kZW5jaWVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkZXBlbmRlbmNpZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkZXBlbmRlbmN5ID0gZGVwZW5kZW5jaWVzW2ldXG5cbiAgICAgICAgICBpZiAoZGVwZW5kZW5jeSA9PT0gdG9JZCkge1xuICAgICAgICAgICAgLy8gVGhlcmUgaXMgYSBwYXRoIHRvICd0bydcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGVwZW5kZW5jeU1vZHVsZSA9IHJlZ2lzdGVyZWRNb2R1bGVzW2RlcGVuZGVuY3ldXG4gICAgICAgICAgaWYgKGRlcGVuZGVuY3lNb2R1bGUgJiYgIWluUXVldWVbZGVwZW5kZW5jeV0pIHtcbiAgICAgICAgICAgIC8vIEluc2VydCAnZGVwZW5kZW5jeScgaW4gcXVldWVcbiAgICAgICAgICAgIGluUXVldWVbZGVwZW5kZW5jeV0gPSB0cnVlXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGRlcGVuZGVuY3lNb2R1bGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhlcmUgaXMgbm8gcGF0aCB0byAndG8nXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcmVxdWlyZShcbiAgICBkZXBlbmRlbmNpZXM6IHN0cmluZyB8IHN0cmluZ1tdLFxuICAgIGNhbGxiYWNrOiAoZGVwczogYW55W10pID0+IHZvaWQsXG4gICAgZXJyb3JDYWxsYmFjazogRnVuY3Rpb24sXG4gICAgcGFyZW50TW9kdWxlOiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jaWVzUmVzdWx0czogYW55W10gPSBuZXcgQXJyYXkoZGVwZW5kZW5jaWVzLmxlbmd0aCkuZmlsbChudWxsKVxuICAgIGxldCBsb2FkZWRDb3VudCA9IDBcbiAgICBsZXQgaGFzTG9hZGVkID0gZmFsc2VcblxuICAgIGlmICh0eXBlb2YgZGVwZW5kZW5jaWVzID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHJlZ2lzdGVyZWRNb2R1bGVzW2RlcGVuZGVuY2llc10pIHtcbiAgICAgICAgaWYgKHJlZ2lzdGVyZWRNb2R1bGVzW2RlcGVuZGVuY2llc10uZGNsYW1kID09PSBNT0RVTEVfTE9BRElORykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBUcnlpbmcgdG8gbG9hZCAke2RlcGVuZGVuY2llc30gZnJvbSAke3BhcmVudE1vZHVsZX0uIFRoZSBmaXJzdCBtb2R1bGUgaXMgc3RpbGwgbG9hZGluZy5gXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWdpc3RlcmVkTW9kdWxlc1tkZXBlbmRlbmNpZXNdXG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGRlcGVuZGVuY2llcyArXG4gICAgICAgICAgJyBoYXMgbm90IGJlZW4gZGVmaW5lZC4gUGxlYXNlIGluY2x1ZGUgaXQgYXMgYSBkZXBlbmRlbmN5IGluICcgK1xuICAgICAgICAgIHBhcmVudE1vZHVsZSArXG4gICAgICAgICAgXCIncyBkZWZpbmUoKVwiXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgZGVwc0xlbmd0aCA9IGRlcGVuZGVuY2llcy5sZW5ndGhcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkZXBzTGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBzd2l0Y2ggKGRlcGVuZGVuY2llc1tpbmRleF0pIHtcbiAgICAgICAgY2FzZSAncmVxdWlyZSc6XG4gICAgICAgICAgY29uc3QgX3JlcXVpcmU6IHR5cGVvZiByZXF1aXJlID0gZnVuY3Rpb24gKFxuICAgICAgICAgICAgbmV3X21vZHVsZTogc3RyaW5nIHwgc3RyaW5nW10sXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdm9pZCxcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9uXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZShuZXdfbW9kdWxlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgcGFyZW50TW9kdWxlKVxuICAgICAgICAgIH0gYXMgYW55XG4gICAgICAgICAgX3JlcXVpcmUudG9VcmwgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9VcmwobW9kdWxlLCBwYXJlbnRNb2R1bGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGRlcGVuZGVuY2llc1Jlc3VsdHNbaW5kZXhdID0gX3JlcXVpcmVcbiAgICAgICAgICBsb2FkZWRDb3VudCsrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnZXhwb3J0cyc6XG4gICAgICAgICAgaWYgKCFyZWdpc3RlcmVkTW9kdWxlc1twYXJlbnRNb2R1bGVdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICdQYXJlbnQgbW9kdWxlICcgKyBwYXJlbnRNb2R1bGUgKyAnIG5vdCByZWdpc3RlcmVkIHlldCdcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZXBlbmRlbmNpZXNSZXN1bHRzW2luZGV4XSA9IHJlZ2lzdGVyZWRNb2R1bGVzW3BhcmVudE1vZHVsZV0uZXhwb3J0c1xuICAgICAgICAgIGxvYWRlZENvdW50KytcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdtb2R1bGUnOlxuICAgICAgICAgIGRlcGVuZGVuY2llc1Jlc3VsdHNbaW5kZXhdID0ge1xuICAgICAgICAgICAgaWQ6IHBhcmVudE1vZHVsZSxcbiAgICAgICAgICAgIHVyaTogdG9VcmwocGFyZW50TW9kdWxlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBsb2FkZWRDb3VudCsrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBjaXJjdWxhciBkZXBlbmRlbmN5LCB0aGVuIHdlIHJlc29sdmUgdGhlIG1vZHVsZSBldmVuIGlmIGl0IGhhc24ndCBsb2FkZWQgeWV0XG4gICAgICAgICAgY29uc3QgZGVwZW5kZW5jeSA9IGRlcGVuZGVuY2llc1tpbmRleF1cblxuICAgICAgICAgIGNvbnN0IGhhc0N5Y2xlcyA9IGhhc0RlcGVuZGVuY3lQYXRoKGRlcGVuZGVuY3ksIHBhcmVudE1vZHVsZSlcblxuICAgICAgICAgIGNvbnN0IGhhbmRsZUxvYWRlZE1vZHVsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGRlcGVuZGVuY2llc1Jlc3VsdHNbaW5kZXhdID0gcmVnaXN0ZXJlZE1vZHVsZXNbZGVwZW5kZW5jeV0uZXhwb3J0c1xuICAgICAgICAgICAgbG9hZGVkQ291bnQrK1xuICAgICAgICAgICAgaWYgKGxvYWRlZENvdW50ID09PSBkZXBzTGVuZ3RoICYmIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIGhhc0xvYWRlZCA9IHRydWVcbiAgICAgICAgICAgICAgY2FsbGJhY2soZGVwZW5kZW5jaWVzUmVzdWx0cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaGFzQ3ljbGVzKSB7XG4gICAgICAgICAgICBjb25zdCBjeWNsZVBhdGggPSBnZXRDeWNsZVBhdGgoZGVwZW5kZW5jeSwgcGFyZW50TW9kdWxlLCAwKVxuICAgICAgICAgICAgaWYgKGN5Y2xlUGF0aCkge1xuICAgICAgICAgICAgICBjeWNsZVBhdGgucmV2ZXJzZSgpXG4gICAgICAgICAgICAgIGN5Y2xlUGF0aC5wdXNoKGRlcGVuZGVuY3kpXG4gICAgICAgICAgICAgIGN5Y2xlcy5wdXNoKGN5Y2xlUGF0aClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvYWQoZGVwZW5kZW5jeSwgKCkgPT4ge30sIGVycm9yQ2FsbGJhY2ssIHBhcmVudE1vZHVsZSlcbiAgICAgICAgICAgIGhhbmRsZUxvYWRlZE1vZHVsZSgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWQoZGVwZW5kZW5jeSwgaGFuZGxlTG9hZGVkTW9kdWxlLCBlcnJvckNhbGxiYWNrLCBwYXJlbnRNb2R1bGUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaGFzTG9hZGVkICYmIGxvYWRlZENvdW50ID09PSBkZXBzTGVuZ3RoICYmIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayhkZXBlbmRlbmNpZXNSZXN1bHRzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU1ldGhvZEhhbmRsZXIocnBjSGFuZGxlOiBzdHJpbmcsIG1ldGhvZDogTWV0aG9kRGVzY3JpcHRvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZGNsLmNhbGxScGMoXG4gICAgICAgIHJwY0hhbmRsZSxcbiAgICAgICAgbWV0aG9kLm5hbWUsXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcbiAgICAgICAgYW5vbnltb3VzUXVldWUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLy8gcmV0dXJuczogcmVzb2x2ZWRNb2R1bGVOYW1lXG4gIGZ1bmN0aW9uIHJlc29sdmUoZnJvbU1vZHVsZTogc3RyaW5nLCB0b01vZHVsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZyb21Nb2R1bGUgPyB0b1VybCh0b01vZHVsZSwgZnJvbU1vZHVsZSkgOiB0b01vZHVsZVxuICB9XG5cbiAgZnVuY3Rpb24gbG9hZChcbiAgICBtb2R1bGVOYW1lOiBzdHJpbmcsXG4gICAgY2FsbGJhY2s6IE1vZHVsZUxvYWRlZEhhbmRsZXIsXG4gICAgZXJyb3JDYWxsYmFjazogRnVuY3Rpb24sXG4gICAgcGFyZW50TW9kdWxlOiBzdHJpbmdcbiAgKSB7XG4gICAgaWYgKHJlZ2lzdGVyZWRNb2R1bGVzW21vZHVsZU5hbWVdKSB7XG4gICAgICByZWdpc3RlcmVkTW9kdWxlc1ttb2R1bGVOYW1lXS5kZXBlbmRhbnRzLmFkZChwYXJlbnRNb2R1bGUpXG5cbiAgICAgIGlmIChyZWdpc3RlcmVkTW9kdWxlc1ttb2R1bGVOYW1lXS5kY2xhbWQgPT09IE1PRFVMRV9MT0FESU5HKSB7XG4gICAgICAgIGNhbGxiYWNrICYmIHJlZ2lzdGVyZWRNb2R1bGVzW21vZHVsZU5hbWVdLmhhbmRsZXJzLnB1c2goY2FsbGJhY2spXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZWdpc3RlcmVkTW9kdWxlc1ttb2R1bGVOYW1lXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlZ2lzdGVyZWRNb2R1bGVzW21vZHVsZU5hbWVdID0ge1xuICAgICAgICBuYW1lOiBtb2R1bGVOYW1lLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudE1vZHVsZSxcbiAgICAgICAgZGNsYW1kOiBNT0RVTEVfTE9BRElORyxcbiAgICAgICAgaGFuZGxlcnM6IFtjYWxsYmFja10sXG4gICAgICAgIGRlcGVuZGVuY2llczogW10sXG4gICAgICAgIGRlcGVuZGFudHM6IG5ldyBTZXQoW3BhcmVudE1vZHVsZV0pLFxuICAgICAgICBleHBvcnRzOiB7fVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb2R1bGVOYW1lLmluZGV4T2YoJ0AnKSA9PT0gMCkge1xuICAgICAgY29uc3QgZXhwb3J0cyA9IHJlZ2lzdGVyZWRNb2R1bGVzW21vZHVsZU5hbWVdLmV4cG9ydHNcbiAgICAgIGlmICh0eXBlb2YgZGNsLmxvYWRNb2R1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZGNsXG4gICAgICAgICAgLmxvYWRNb2R1bGUobW9kdWxlTmFtZSwgZXhwb3J0cylcbiAgICAgICAgICAudGhlbigoZGVzY3JpcHRvcjogTW9kdWxlRGVzY3JpcHRvcikgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGRlc2NyaXB0b3IubWV0aG9kcykge1xuICAgICAgICAgICAgICBjb25zdCBtZXRob2QgPSBkZXNjcmlwdG9yLm1ldGhvZHNbaV1cbiAgICAgICAgICAgICAgZXhwb3J0c1ttZXRob2QubmFtZV0gPSBjcmVhdGVNZXRob2RIYW5kbGVyKFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3IucnBjSGFuZGxlLFxuICAgICAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vZHVsZVJlYWR5KG1vZHVsZU5hbWUpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlKVxuICAgICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0FzeW5jaHJvbm91cyBtb2R1bGVzIHdpbGwgbm90IHdvcmsgYmVjYXVzZSBsb2FkTW9kdWxlIGZ1bmN0aW9uIGlzIG5vdCBwcmVzZW50J1xuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBkY2wgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZGNsLm9uU3RhcnQoKCkgPT4ge1xuICAgICAgY29uc3QgdW5rbm93bk1vZHVsZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICAgICAgY29uc3Qgbm90TG9hZGVkTW9kdWxlczogTW9kdWxlW10gPSBbXVxuXG4gICAgICBmb3IgKGNvbnN0IGkgaW4gcmVnaXN0ZXJlZE1vZHVsZXMpIHtcbiAgICAgICAgaWYgKHJlZ2lzdGVyZWRNb2R1bGVzW2ldKSB7XG4gICAgICAgICAgaWYgKHJlZ2lzdGVyZWRNb2R1bGVzW2ldLmRjbGFtZCA9PT0gTU9EVUxFX0xPQURJTkcpIHtcbiAgICAgICAgICAgIG5vdExvYWRlZE1vZHVsZXMucHVzaChyZWdpc3RlcmVkTW9kdWxlc1tpXSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZWdpc3RlcmVkTW9kdWxlc1tpXS5kZXBlbmRlbmNpZXMuZm9yRWFjaCgoJCkgPT4ge1xuICAgICAgICAgICAgaWYgKCQgPT09ICdyZXF1aXJlJyB8fCAkID09PSAnZXhwb3J0cycgfHwgJCA9PT0gJ21vZHVsZScpIHJldHVyblxuICAgICAgICAgICAgaWYgKCFyZWdpc3RlcmVkTW9kdWxlc1skXSkgdW5rbm93bk1vZHVsZXMuYWRkKCQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBlcnJvclBhcnRzOiBzdHJpbmdbXSA9IFtdXG5cbiAgICAgIGlmIChjeWNsZXMubGVuZ3RoKSB7XG4gICAgICAgIGVycm9yUGFydHMucHVzaChcbiAgICAgICAgICBgXFxuPiBDeWNsaWMgZGVwZW5kZW5jaWVzOiAke2N5Y2xlc1xuICAgICAgICAgICAgLm1hcCgoJCkgPT4gJ1xcbiAgLSAnICsgJC5qb2luKCcgLT4gJykpXG4gICAgICAgICAgICAuam9pbignJyl9YFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmICh1bmtub3duTW9kdWxlcy5zaXplKSB7XG4gICAgICAgIGVycm9yUGFydHMucHVzaChcbiAgICAgICAgICBgXFxuPiBVbmRlY2xhcmVkL3Vua25vd24gbW9kdWxlczogJHtBcnJheS5mcm9tKHVua25vd25Nb2R1bGVzKVxuICAgICAgICAgICAgLm1hcCgoJCkgPT4gJ1xcbiAgLSAnICsgJClcbiAgICAgICAgICAgIC5qb2luKCcnKX1gXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKG5vdExvYWRlZE1vZHVsZXMubGVuZ3RoKSB7XG4gICAgICAgIGVycm9yUGFydHMucHVzaChcbiAgICAgICAgICBgXFxuPiBUaGVzZSBtb2R1bGVzIGRpZG4ndCBsb2FkOiAke25vdExvYWRlZE1vZHVsZXNcbiAgICAgICAgICAgIC5tYXAoKCQpID0+ICdcXG4gIC0gJyArICQubmFtZSlcbiAgICAgICAgICAgIC5qb2luKCcnKX0uXFxuYFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvclBhcnRzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JQYXJ0cy5qb2luKCdcXG4nKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSAnYS8uLi9uYW1lJyB0byAnbmFtZScsIGV0Yy5cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1vZHVsZUlkKG1vZHVsZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCByID0gbW9kdWxlSWQsXG4gICAgICBwYXR0ZXJuOiBSZWdFeHBcblxuICAgIC8vIHJlcGxhY2UgLy4vID0+IC9cbiAgICBwYXR0ZXJuID0gL1xcL1xcLlxcLy9cbiAgICB3aGlsZSAocGF0dGVybi50ZXN0KHIpKSB7XG4gICAgICByID0gci5yZXBsYWNlKHBhdHRlcm4sICcvJylcbiAgICB9XG5cbiAgICAvLyByZXBsYWNlIF4uLyA9PiBub3RoaW5nXG4gICAgciA9IHIucmVwbGFjZSgvXlxcLlxcLy9nLCAnJylcblxuICAgIC8vIHJlcGxhY2UgL2FhLy4uLyA9PiAvIChCVVQgSUdOT1JFIC8uLi8uLi8pXG4gICAgcGF0dGVybiA9XG4gICAgICAvXFwvKChbXlxcL10pfChbXlxcL11bXlxcL1xcLl0pfChbXlxcL1xcLl1bXlxcL10pfChbXlxcL11bXlxcL11bXlxcL10rKSlcXC9cXC5cXC5cXC8vXG4gICAgd2hpbGUgKHBhdHRlcm4udGVzdChyKSkge1xuICAgICAgciA9IHIucmVwbGFjZShwYXR0ZXJuLCAnLycpXG4gICAgfVxuXG4gICAgLy8gcmVwbGFjZSBeYWEvLi4vID0+IG5vdGhpbmcgKEJVVCBJR05PUkUgLi4vLi4vKVxuICAgIHIgPSByLnJlcGxhY2UoXG4gICAgICAvXigoW15cXC9dKXwoW15cXC9dW15cXC9cXC5dKXwoW15cXC9cXC5dW15cXC9dKXwoW15cXC9dW15cXC9dW15cXC9dKykpXFwvXFwuXFwuXFwvLyxcbiAgICAgICcnXG4gICAgKVxuXG4gICAgLy8gcmVwbGFjZSBeLyA9PiBub3RoaW5nXG4gICAgciA9IHIucmVwbGFjZSgvXlxcLy9nLCAnJylcblxuICAgIHJldHVybiByXG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSByZWxhdGl2ZSBtb2R1bGUgaWRzXG4gICAqL1xuICBmdW5jdGlvbiByZXNvbHZlTW9kdWxlKG1vZHVsZUlkOiBzdHJpbmcsIHBhcmVudE1vZHVsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gbW9kdWxlSWRcblxuICAgIGlmICghcmVzdWx0LnN0YXJ0c1dpdGgoJ0AnKSkge1xuICAgICAgaWYgKHJlc3VsdC5zdGFydHNXaXRoKCcuLycpIHx8IHJlc3VsdC5zdGFydHNXaXRoKCcuLi8nKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50UGF0aCA9IHBhcmVudE1vZHVsZS5zcGxpdCgnLycpXG4gICAgICAgIGN1cnJlbnRQYXRoLnBvcCgpXG4gICAgICAgIHJlc3VsdCA9IG5vcm1hbGl6ZU1vZHVsZUlkKGN1cnJlbnRQYXRoLmpvaW4oJy8nKSArICcvJyArIHJlc3VsdClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBmdW5jdGlvbiB0b1VybChtb2R1bGVOYW1lOiBzdHJpbmcsIHBhcmVudE1vZHVsZT86IHN0cmluZykge1xuICAgIHN3aXRjaCAobW9kdWxlTmFtZSkge1xuICAgICAgY2FzZSAncmVxdWlyZSc6XG4gICAgICBjYXNlICdleHBvcnRzJzpcbiAgICAgIGNhc2UgJ21vZHVsZSc6XG4gICAgICAgIHJldHVybiBtb2R1bGVOYW1lXG4gICAgfVxuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHJldHVybiByZXNvbHZlTW9kdWxlKG1vZHVsZU5hbWUsIHBhcmVudE1vZHVsZSlcbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZU1vZHVsZUlkKG1vZHVsZU5hbWUpXG4gIH1cblxuICByZXF1aXJlLnRvVXJsID0gdG9Vcmxcbn1cblxuZ2xvYmFsT2JqZWN0LmRlZmluZSA9IGxvYWRlci5kZWZpbmVcbmdsb2JhbE9iamVjdC5kY2xhbWQgPSBsb2FkZXJcbiJdfQ==