import { globby } from "globby";
import fs from "fs/promises";
import getTitle from "get-html-title";
import Handlebars from "handlebars";
import url from "node:url";
import path from "node:path";
import { execFile as _execFile } from "node:child_process";
import util from "node:util";

const execFile = util.promisify(_execFile)
const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);
const rootDir = path.join(__dirname, "..");

async function getTitleFromHTMLPath(filePath) {
    const content = await fs.readFile(filePath, "utf-8");
    return getTitle(content);
}


// http://stackoverflow.com/questions/2390199/finding-the-date-time-a-file-was-first-added-to-a-git-repository
async function getCreatedDateFromHTMLPath(filePath) {
    const metaJSON = await (async () => {
        try {
            // {originak}.meta.json があった読み込む
            const metaJsonFilePath = path.join(path.dirname(filePath), path.basename(filePath, ".html") + ".meta.json");
            await fs.access(metaJsonFilePath);
            /**
             * @type {{ created: string }}
             */
            return JSON.parse(await fs.readFile(metaJsonFilePath, "utf-8"));
        } catch {
            return null;
        }
    })();
    if (metaJSON) {
        return new Date(metaJSON.created);
    }
    const log = await execFile("git", ["log", "--diff-filter=A", "--follow", "--format=%aD", "-1", "--", filePath]);
    if (log == null || log.error || Buffer.isBuffer(log.stdout)) {
        return new Date();
    }
    return new Date(log.stdout);
}

const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

/**
 * @param fileList
 * @returns {Promise<{year: string, items: {filePath: string, title: string, createdDate: Date}}[]>}
 */
async function groupingFileList(fileList) {
    const items = (await Promise.all(fileList.map(async filePath => {
        const eventName = path.dirname(filePath).split(path.sep).pop();
        const title = await getTitleFromHTMLPath(filePath);
        const createDate = await getCreatedDateFromHTMLPath(filePath);
        if (title != null) {
            return {
                filePath: path.relative(rootDir, filePath),
                eventName: eventName,
                title: title,
                createDate
            }
        }
    }))).filter(item => item !== undefined);
    /* 年数でグループ化
        ["2022": [item, item]],
        ["2021": [item, item]]
     */
    const yearGroupMap = groupBy(items, item => item.createDate.getFullYear());
    /**
     * @type {{
     *     year: string,
     *     events: {
     *      name: string;
     *      items: { filePath:string; title:string; createdDate:Date; }[]
     *    }[]
     * }[]}
     */
    const results = [...yearGroupMap.entries()].sort().reverse().flatMap(([year, items]) => {
        const eventItems = groupBy(items, item => item.eventName);
        return [{
            year: year,
            events: [...eventItems.entries()].sort((a, b) => {
                return a[0].createDate > b[0].createDate ? -1 : 1;
            }).map(([eventName, items]) => {
                return {
                    name: eventName,
                    items: items.sort((a, b) => {
                        return a.createDate > b.createDate ? -1 : 1;
                    })
                }
            }).sort((a, b) => {
                return a.items[0].createDate > b.items[0].createDate ? -1 : 1;
            })
        }]
    })
    return results
}

Handlebars.registerHelper('link_to', function () {
    return new Handlebars.SafeString("<a href='" + Handlebars.Utils.escapeExpression(this.filePath) + "'>" + Handlebars.Utils.escapeExpression(this.title) + "</a>");
});

async function compileToHTML(fileListObject) {
    const context = { object: fileListObject };
    const source = await fs.readFile(__dirname + "/index-template.hbs", "utf-8");
    const template = Handlebars.compile(source);
    return template(context);
}

const htmlFiles = await globby([
    rootDir + "/**/*.html",
    // ignore root
    `!${rootDir}/index.html`,
    "!**/node_modules/**",
    "!**/theme/**",
    "!**/landslide-theme/**",
]);
const results = await groupingFileList(htmlFiles);
const generatedHTML = await compileToHTML(results);
await fs.writeFile(path.resolve(rootDir, "./index.html"), generatedHTML);
