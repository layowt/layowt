(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[project]__5b4b92._.js", {

"[project]/src/utils/supabase/middleware.ts [middleware] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, k: __turbopack_refresh__, m: module, e: exports, t: require }) { !function() {

const e = new Error("Could not parse module '[project]/src/utils/supabase/middleware.ts'");
e.code = 'MODULE_UNPARSEABLE';
throw e;
}.call(this) }),
"[project]/middleware.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "config": ()=>config,
    "middleware": ()=>middleware
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboard$2f$utils$2f$supabase$2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/dashboard/utils/supabase/middleware.ts [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
async function middleware(request) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$dashboard$2f$utils$2f$supabase$2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["updateSession"](request);
}
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */ '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
};

})()),
}]);

//# sourceMappingURL=[project]__5b4b92._.js.map