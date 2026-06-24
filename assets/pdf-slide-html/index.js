(() => {
    const content = document.querySelector(".main-content");
    const frame = document.getElementById("main-slide");
    const button = document.getElementById("js-fullscreen-button");

    if (!content || !button) {
        return;
    }

    frame?.focus();

    const tuneEmbeddedSlide = () => {
        try {
            const embeddedDocument = frame?.contentDocument;
            const embeddedWindow = frame?.contentWindow;
            if (!embeddedDocument?.head || !embeddedWindow) {
                return;
            }
            let style = embeddedDocument.getElementById("pdf-slide-html-embed-fix");
            if (!style) {
                style = embeddedDocument.createElement("style");
                style.id = "pdf-slide-html-embed-fix";
                embeddedDocument.head.appendChild(style);
            }
            style.textContent = `
                html,
                body {
                    overflow: hidden !important;
                }

                #pdf-container {
                    position: relative !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    overflow: hidden !important;
                }

                .pdf-canvas {
                    display: block !important;
                }
            `;
            embeddedWindow.dispatchEvent(new Event("resize"));
        } catch {
            // Cross-origin previews cannot modify the embedded slide-pdf.js document.
        }
    };

    frame?.addEventListener("load", () => {
        tuneEmbeddedSlide();
        window.setTimeout(tuneEmbeddedSlide, 100);
        window.setTimeout(tuneEmbeddedSlide, 500);
    });

    const setExpanded = (expanded) => {
        content.classList.toggle("slide-state-fullscreen", expanded);
        button.setAttribute("aria-pressed", String(expanded));
    };

    button.addEventListener("click", async () => {
        if (document.fullscreenElement === content) {
            await document.exitFullscreen();
            return;
        }
        if (content.requestFullscreen) {
            await content.requestFullscreen();
            return;
        }
        setExpanded(!content.classList.contains("slide-state-fullscreen"));
    });

    document.addEventListener("fullscreenchange", () => {
        setExpanded(document.fullscreenElement === content);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && content.classList.contains("slide-state-fullscreen")) {
            setExpanded(false);
        }
    });
})();
