import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { createMarkdown } from "safe-marked";

const execFileAsync = promisify(execFile);
const markdown = createMarkdown();
const decksetGlobalCommands = new Set([
    "autoscale",
    "background-image",
    "build-lists",
    "code-language",
    "fit-header",
    "footer",
    "image-corner-radius",
    "paragraphs-as-presenter-notes",
    "pause-screen-image",
    "pause-screen-text",
    "presenter-notes",
    "slide-transition",
    "slidecount",
    "slide-dividers",
    "slidenumbers",
    "theme",
    "time-budget"
]);
const decksetImageModifiers = new Set([
    "autoadvance",
    "autoplay",
    "bn",
    "bw",
    "chrome",
    "fade",
    "fill",
    "filtered",
    "fit",
    "inline",
    "left",
    "loop",
    "mute",
    "noir",
    "original",
    "right",
    "vivid"
]);

export const DEFAULTS = {
    authorUrl: "https://www.hatena.ne.jp/efcl/",
    baseUrl: "https://azu.github.io/slide-pdf.js/",
    siteUrl: "https://azu.github.io/slide/"
};

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function toPOSIXPath(filePath) {
    return filePath.split(path.sep).join("/");
}

function ensureTrailingSlash(value) {
    return value.endsWith("/") ? value : `${value}/`;
}

function formatDate(date) {
    const validDate = Number.isNaN(date.getTime()) ? new Date() : date;
    const year = validDate.getFullYear();
    const month = String(validDate.getMonth() + 1).padStart(2, "0");
    const day = String(validDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getFallbackTitle(pdfUrl) {
    if (!pdfUrl) {
        return "slide";
    }
    try {
        return path.basename(new URL(pdfUrl).pathname);
    } catch {
        return path.basename(pdfUrl);
    }
}

function getTitleFromMarkdown(content, fallbackTitle) {
    const heading = content
        .split(/\r?\n/)
        .map((line) => line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/)?.[1])
        .find(Boolean);
    if (!heading) {
        return fallbackTitle;
    }
    return heading
        .replace(/^\[fit\]\s*/i, "")
        .replace(/!\[([^\]]*)]\([^)]+\)/g, "$1")
        .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
        .replace(/[`*_~]/g, "")
        .trim() || fallbackTitle;
}

function isDecksetGlobalCommand(line) {
    const match = line.match(/^\s*([a-z][a-z0-9-]*)\s*:/i);
    return match ? decksetGlobalCommands.has(match[1].toLowerCase()) : false;
}

function stripLeadingDecksetCommands(content) {
    const lines = content.split(/\r?\n/);
    let index = 0;
    let consumedCommand = false;
    let inLiteralBlock = false;

    while (index < lines.length) {
        const line = lines[index];
        const trimmed = line.trim();
        if (inLiteralBlock) {
            inLiteralBlock = trimmed !== ">>>";
            index += 1;
            continue;
        }
        if (trimmed === "" && !consumedCommand) {
            index += 1;
            continue;
        }
        if (isDecksetGlobalCommand(line)) {
            consumedCommand = true;
            inLiteralBlock = line.includes("<<<");
            index += 1;
            continue;
        }
        if (trimmed === "" && consumedCommand) {
            index += 1;
        }
        break;
    }
    return lines.slice(index).join("\n");
}

function removeDecksetStandaloneCommands(content) {
    return content
        .split(/\r?\n/)
        .filter((line) => !/^\s*\[\.[^\]]+\]\s*$/.test(line))
        .join("\n");
}

function removeDecksetHeadingMarkers(content) {
    return content.replace(/^(\s{0,3}#{1,6}\s+)\[fit\]\s*/gim, "$1");
}

function cleanDecksetImageAlt(altText) {
    return altText
        .split(",")
        .map((segment) => segment
            .trim()
            .split(/\s+/)
            .filter((token) => {
                const lowerToken = token.toLowerCase();
                return !decksetImageModifiers.has(lowerToken)
                    && !/^\d+%$/.test(lowerToken)
                    && !/^(alpha|blur|brightness|contrast|corner-radius|exposure|saturation|sepia|sharpen|vignette)\([^)]*\)$/i.test(token);
            })
            .join(" "))
        .filter(Boolean)
        .join(", ");
}

function removeDecksetImageModifiers(content) {
    return content.replace(/!\[([^\]\n]*)]\(([^)\n]+)\)/g, (_, altText, target) => {
        return `![${cleanDecksetImageAlt(altText)}](${target})`;
    });
}

function formatPresenterNotes(content) {
    const lines = content.split(/\r?\n/);
    const results = [];
    let notes = [];
    const flushNotes = () => {
        if (notes.length === 0) {
            return;
        }
        const noteText = notes.join(" ").trim();
        results.push(`<aside class="presenter-note"><strong>発表者ノート:</strong>${noteText ? ` ${escapeHTML(noteText)}` : ""}</aside>`);
        notes = [];
    };
    for (const line of lines) {
        const match = line.match(/^\s*\^\s?(.*)$/);
        if (match) {
            notes.push(match[1].trim());
            continue;
        }
        flushNotes();
        results.push(line);
    }
    flushNotes();
    return results.join("\n");
}

export function normalizeMarkdown(content) {
    const normalizedContent = content.replace(/^\uFEFF/, "");
    return formatPresenterNotes(removeDecksetImageModifiers(
        removeDecksetHeadingMarkers(
            removeDecksetStandaloneCommands(
                stripLeadingDecksetCommands(normalizedContent)
            )
        )
    ));
}

async function readMarkdown(filePath) {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const content = await fs.readFile(absolutePath, "utf-8");
    return {
        absolutePath,
        content,
        html: markdown(normalizeMarkdown(content))
    };
}

async function getModifiedDate(filePath) {
    if (!filePath) {
        return new Date();
    }
    try {
        const stat = await fs.stat(filePath);
        return stat.mtime;
    } catch {
        return new Date();
    }
}

async function getCreatedDate(filePath) {
    if (!filePath) {
        return new Date();
    }
    const gitFilePath = path.isAbsolute(filePath)
        ? path.relative(process.cwd(), filePath)
        : filePath;
    if (gitFilePath.startsWith("..")) {
        return new Date();
    }
    try {
        const { stdout } = await execFileAsync("git", [
            "log",
            "--diff-filter=A",
            "--follow",
            "--format=%aD",
            "-1",
            "--",
            gitFilePath
        ]);
        const firstCreatedDate = stdout.trim();
        if (firstCreatedDate) {
            return new Date(firstCreatedDate);
        }
    } catch {
        // Fall through to filesystem metadata when git is unavailable in the current sandbox.
    }
    try {
        const stat = await fs.stat(path.resolve(process.cwd(), filePath));
        return stat.birthtime;
    } catch {
        return new Date();
    }
}

function getSiteFileUrl(outputPath, siteUrl, extension) {
    const absoluteOutputPath = path.resolve(process.cwd(), outputPath);
    const relativeOutputPath = toPOSIXPath(path.relative(process.cwd(), absoluteOutputPath));
    const relativeFilePath = extension
        ? relativeOutputPath.replace(/\.html$/i, extension)
        : relativeOutputPath;
    return new URL(relativeFilePath, ensureTrailingSlash(siteUrl)).toString();
}

function getAssetBaseUrl(outputPath, assetBaseUrl) {
    if (assetBaseUrl) {
        return ensureTrailingSlash(assetBaseUrl);
    }
    const absoluteOutputDirectory = path.dirname(path.resolve(process.cwd(), outputPath));
    const absoluteAssetDirectory = path.resolve(process.cwd(), "assets/pdf-slide-html");
    const relativeAssetDirectory = toPOSIXPath(path.relative(absoluteOutputDirectory, absoluteAssetDirectory));
    return ensureTrailingSlash(relativeAssetDirectory || ".");
}

function renderHTML({
    assetBaseUrl,
    authorUrl,
    baseUrl,
    dateModified,
    datePublished,
    markdownHTML,
    pdfUrl,
    slideUrl,
    title
}) {
    const escapedTitle = escapeHTML(title);
    const escapedPdfUrl = escapeHTML(pdfUrl);
    const escapedAssetBaseUrl = escapeHTML(assetBaseUrl);
    const escapedSlideUrl = escapeHTML(slideUrl);
    const escapedAuthorUrl = escapeHTML(authorUrl);
    const iframeSrc = `${ensureTrailingSlash(baseUrl)}?slide=${pdfUrl}`;
    const authorLink = authorUrl ? `<link rel="author" href="${escapedAuthorUrl}">` : "";

    return `<!doctype html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapedTitle}</title>
    <noscript>
        <style>
            .main-content {
                display: none;
            }
        </style>
    </noscript>
    <link rel="stylesheet" href="${escapedAssetBaseUrl}index.css">
    <link rel="canonical" href="${escapedSlideUrl}">
    ${authorLink}
</head>
<body itemscope itemtype="https://schema.org/Article">
<main class="pdf-slide-page">
    <section class="main-content" aria-label="${escapedTitle}">
        <meta itemprop="name headline" content="${escapedTitle}">
        <div class="slide-frame">
            <iframe id="main-slide"
                    src="${escapeHTML(iframeSrc)}"
                    title="${escapedTitle}"
                    scrolling="no"
                    loading="lazy"
                    allowfullscreen>
            </iframe>
        </div>
        <aside class="slide-controller" aria-label="Slide controls">
            <div class="slide-dates">
                <span>公開日:<time itemprop="datePublished" datetime="${datePublished}" id="datePublished">${datePublished}</time></span>
                <span>変更日:<time itemprop="dateModified" datetime="${dateModified}" id="dateModified">${dateModified}</time></span>
            </div>
            <div class="slide-actions">
                <a class="slide-action" href="${escapedPdfUrl}" title="${escapedTitle}">
                    <svg class="svg-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1ZM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"></path>
                    </svg>
                    <span>PDF</span>
                </a>
                <button class="slide-action fullscreen-button" id="js-fullscreen-button" type="button" aria-pressed="false">
                    <svg class="svg-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H6.41l3.3 3.29a1 1 0 0 1-1.42 1.42L5 6.41V8a1 1 0 0 1-1 1Zm16 0a1 1 0 0 1-1-1V6.41l-3.29 3.3a1 1 0 1 1-1.42-1.42L17.59 5H16a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM9.71 14.29a1 1 0 0 1 0 1.42L6.41 19H8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v1.59l3.29-3.3a1 1 0 0 1 1.42 0Zm4.58 0a1 1 0 0 1 1.42 0l3.29 3.3V16a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1h-4a1 1 0 1 1 0-2h1.59l-3.3-3.29a1 1 0 0 1 0-1.42Z"></path>
                    </svg>
                    <span>Full screen</span>
                </button>
            </div>
        </aside>
    </section>
    <article class="markdown-body" itemprop="articleBody">${markdownHTML}</article>
</main>
<script defer src="${escapedAssetBaseUrl}index.js"></script>
</body>
</html>
`;
}

export async function generateHTML(options) {
    if (!options.output) {
        throw new Error("--output is required");
    }
    const siteUrl = options.siteUrl ?? DEFAULTS.siteUrl;
    const slideUrl = options.slideUrl ?? getSiteFileUrl(options.output, siteUrl);
    const pdfUrl = options.pdfUrl ?? getSiteFileUrl(options.output, siteUrl, ".pdf");
    const baseUrl = options.baseUrl ?? DEFAULTS.baseUrl;
    const authorUrl = options.authorUrl ?? DEFAULTS.authorUrl;
    const assetBaseUrl = getAssetBaseUrl(options.output, options.assetBaseUrl);
    const fallbackTitle = getFallbackTitle(pdfUrl);
    const markdownResult = options.markdown ? await readMarkdown(options.markdown) : null;
    const title = markdownResult ? getTitleFromMarkdown(markdownResult.content, fallbackTitle) : fallbackTitle;
    const dateSourcePath = markdownResult?.absolutePath ?? path.resolve(process.cwd(), options.output);

    return renderHTML({
        assetBaseUrl,
        authorUrl,
        baseUrl,
        dateModified: formatDate(await getModifiedDate(dateSourcePath)),
        datePublished: formatDate(await getCreatedDate(dateSourcePath)),
        markdownHTML: markdownResult?.html ?? "",
        pdfUrl,
        slideUrl,
        title
    });
}

export async function writeHTML(options) {
    const html = await generateHTML(options);
    const outputPath = path.resolve(process.cwd(), options.output);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html);
}
