function injectButton() {
    const start = Date.now();

    const buttonPanel = document.getElementById("share-and-upnext");
    document.getElementById("play-sb")?.remove();

    const shareHistory = document.createElement("span");

    shareHistory.id = "share-button";
    shareHistory.innerText = "Share History";
    buttonPanel?.appendChild(shareHistory);

    shareHistory.onclick = function () {
        const end = Date.now();
        const trueTimeDiff = end - start;

        const history = JSON.parse(localStorage["nyt-connections-beta"]).history;

        const colorMap = {
            "rgb(160, 195, 90)": "G",
            "rgb(249, 223, 109)": "Y",
            "rgb(176, 196, 239)": "B",
            "rgb(186, 129, 197)": "P",
        };

        const answersWithColorContext = [...document.getElementsByClassName("answer-banner")].map((row) => {
            const [title, answerString] = row.innerText.split("\n");
            const color = getComputedStyle(row)["background-color"];
            return { title, answers: answerString.split(", "), color: colorMap[color] };
        });

        const historyWithContext = history.map((row) => {
            return row.map((str) => {
                const matchedRow = answersWithColorContext.find((aRow) => aRow.answers.includes(str));
                return { guess: str, color: matchedRow.color, category: matchedRow.title };
            });
        });

        async function copyToClipboard(text) {
            if (!navigator.clipboard) {
                // Fallback to older methods for browsers that don't support Clipboard API
                execCopyToClipboard(text);
                return;
            }

            try {
                await navigator.clipboard.writeText(text);
                console.log("Text copied to clipboard:");
                console.log(text);
            } catch (err) {
                console.error("Failed to copy text to clipboard:");
                console.error(err);
            }
        }

        function execCopyToClipboard(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand("copy");
                console.log("Fallback: Copying text " + successful ? "successful" : "unsuccessful");
            } catch (err) {
                console.error("Fallback: Unable to copy text:", err);
            }

            document.body.removeChild(textArea);
        }

        copyToClipboard(JSON.stringify({ trueTimeDiff, historyWithContext }));
    };
}
