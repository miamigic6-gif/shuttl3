function findSel(sel, name) {
    return [...sel.querySelectorAll("option")].filter(e => e.value == name)[0];
}

function changeFavicon(value) {
    setFavicon(value);
    localStorage.setItem("shuttle||favicon", value);
}

function changeTitle(value) {
    document.title = value;
    localStorage.setItem("shuttle||title", value);
}

// NEW: Changeable hi-from-Guh text
function changeHiText(value) {
    let hiDiv = document.getElementById("hi-from-guh");
    if (!hiDiv) {
        hiDiv = document.createElement("div");
        hiDiv.id = "hi-from-guh";
        hiDiv.style.position = "fixed";
        hiDiv.style.bottom = "10px";
        hiDiv.style.right = "10px";
        hiDiv.style.color = "#fff";
        hiDiv.style.fontFamily = "Arial, sans-serif";
        hiDiv.style.fontSize = "14px";
        hiDiv.style.zIndex = "9999";
        document.body.appendChild(hiDiv);
    }
    hiDiv.innerText = value;
    localStorage.setItem("shuttle||hiText", value);
}

// Load settings and attach listeners
window.addEventListener("load", () => {
    const searchSelector = document.getElementById("se");
    const proxySelector = document.getElementById("proxy");
    const hiInput = document.getElementById("hi-input"); // Add this input in your settings HTML

    try {
        const st = localStorage.getItem("shuttle||themehex");
        if (st) document.querySelector("#colorPicker").value = st;

        if (localStorage.getItem("shuttle||search")) 
            findSel(searchSelector, localStorage.getItem("shuttle||search")).selected = true;
        if (localStorage.getItem("shuttle||proxy")) 
            findSel(proxySelector, localStorage.getItem("shuttle||proxy")).selected = true;
        if (localStorage.getItem("shuttle||hiText")) 
            changeHiText(localStorage.getItem("shuttle||hiText"));
    } catch {}

    searchSelector.addEventListener("change", e => localStorage.setItem("shuttle||search", e.target.value));
    proxySelector.addEventListener("change", e => localStorage.setItem("shuttle||proxy", e.target.value));

    if (hiInput) {
        hiInput.value = localStorage.getItem("shuttle||hiText") || "hi from Guh";
        hiInput.addEventListener("input", e => changeHiText(e.target.value));
    }

    document.querySelector("#reset-theme").addEventListener("click", resetTheme);
    document.querySelector("#abc").addEventListener("click", abc);
    document.querySelector("#mystery-button").addEventListener("click", setFortniteMode);
});

function changeTheme(value) {
    localStorage.setItem("shuttle||themehex", value);
    document.body.style.backgroundColor = value;
}

function resetTheme() {
    localStorage.removeItem("shuttle||themehex");
    document.body.style.backgroundColor = "#0b0b0b";
    document.querySelector("#colorPicker").value = "#0b0b0b";
}

function setFortniteMode() {
    if (localStorage.getItem("shuttle||fortniteMode") === "activated") {
        document.body.style.backgroundImage = "";
        localStorage.removeItem("shuttle||fortniteMode")
    } else {
        document.body.style.backgroundImage = "url(\"https://i.ytimg.com/vi/6evDWowLMbE/maxresdefault.jpg\")";
        localStorage.setItem("shuttle||fortniteMode", "activated");
    }
}
