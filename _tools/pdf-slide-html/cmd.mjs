#!/usr/bin/env node

import { parseArgs } from "node:util";
import { DEFAULTS, writeHTML } from "./generator.mjs";

function printHelp() {
    console.log(`Usage: npm run pdf-slide-html -- [options]

Options:
  -h, --help                    Show help
  --slide-url <url>             Canonical slide HTML URL
  --author-url <url>            Author URL (default: ${DEFAULTS.authorUrl})
  --base-url <url>              slide-pdf.js base URL (default: ${DEFAULTS.baseUrl})
  --site-url <url>              Site URL used for generated defaults (default: ${DEFAULTS.siteUrl})
  --asset-base-url <url|path>   Asset base URL/path for index.css and index.js
  --pdf-url <url>               PDF URL. Defaults to output path with .pdf under --site-url
  --markdown <path>             Markdown file path used for article body and title
  -o, --output <path>           Output HTML file path
`);
}

const { values } = parseArgs({
    options: {
        help: {
            type: "boolean",
            short: "h"
        },
        "slide-url": {
            type: "string"
        },
        "author-url": {
            type: "string"
        },
        "base-url": {
            type: "string"
        },
        "site-url": {
            type: "string"
        },
        "asset-base-url": {
            type: "string"
        },
        "pdf-url": {
            type: "string"
        },
        markdown: {
            type: "string"
        },
        output: {
            type: "string",
            short: "o"
        }
    }
});

if (values.help) {
    printHelp();
    process.exit(0);
}

try {
    await writeHTML({
        slideUrl: values["slide-url"],
        authorUrl: values["author-url"],
        baseUrl: values["base-url"],
        siteUrl: values["site-url"],
        assetBaseUrl: values["asset-base-url"],
        pdfUrl: values["pdf-url"],
        markdown: values.markdown,
        output: values.output
    });
} catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
}
