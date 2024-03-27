(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/08b5e_@supabase_node-fetch_browser_0534fe.js", {

"[project]/node_modules/@supabase/node-fetch/browser.js [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Headers": ()=>Headers,
    "Request": ()=>Request,
    "Response": ()=>Response,
    "default": ()=>__TURBOPACK__default__export__,
    "fetch": ()=>fetch
});
"use strict";
// ref: https://github.com/tc39/proposal-global
var getGlobal = function() {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('unable to locate global object');
};
var globalObject = getGlobal();
const fetch = globalObject.fetch;
const __TURBOPACK__default__export__ = globalObject.fetch.bind(globalObject);
const Headers = globalObject.Headers;
const Request = globalObject.Request;
const Response = globalObject.Response;

})()),
}]);

//# sourceMappingURL=08b5e_@supabase_node-fetch_browser_0534fe.js.map