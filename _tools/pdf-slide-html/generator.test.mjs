import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { generateHTML } from "./generator.mjs";

test("generateHTML creates a local pdf slide page", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "pdf-slide-html-"));
    const markdownPath = path.join(directory, "slide.md");
    await fs.writeFile(markdownPath, `footer: Example footer
slidenumbers: true
autoscale: true
theme: Plain Jane, 1

# [fit] Example Slide

[.autoscale: false]

This is [CommonMark](https://commonmark.org/) text.

![fit](hero.png)
![Avatar right](avatar.png)
![Diagram, right, fit](diagram.png)

^ Presenter note should appear.
^ Continued note.

<script>alert(1)</script>
`);

    const html = await generateHTML({
        markdown: markdownPath,
        output: "2026/example/slide.html"
    });

    assert.match(html, /<title>Example Slide<\/title>/);
    assert.match(html, /<h1>Example Slide<\/h1>/);
    assert.match(html, /href="..\/..\/assets\/pdf-slide-html\/index.css"/);
    assert.match(html, /src="..\/..\/assets\/pdf-slide-html\/index.js"/);
    assert.match(html, /rel="canonical" href="https:\/\/azu.github.io\/slide\/2026\/example\/slide.html"/);
    assert.match(html, /href="https:\/\/azu.github.io\/slide\/2026\/example\/slide.pdf"/);
    assert.match(html, /slide=https:\/\/azu.github.io\/slide\/2026\/example\/slide.pdf/);
    assert.match(html, /scrolling="no"/);
    assert.doesNotMatch(html, /\[fit\]|footer:|slidenumbers:|autoscale:|theme:|\[\.autoscale/);
    assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
    assert.match(html, /This is <a href="https:\/\/commonmark.org\/">CommonMark<\/a> text/);
    assert.match(html, /<aside class="presenter-note"><strong>発表者ノート:<\/strong> Presenter note should appear\. Continued note\.<\/aside>/);
    assert.match(html, /<img src="hero.png" alt="">/);
    assert.match(html, /<img src="avatar.png" alt="Avatar">/);
    assert.match(html, /<img src="diagram.png" alt="Diagram">/);
});
