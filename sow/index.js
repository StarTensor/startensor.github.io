window.onload = function() {
    window.document.getElementById("r").style.width = "100vw";
    window.document.getElementById("rt1").style.width = "100vw";
    window.document.getElementById("rt2").style.width = "100vw";
    window.document.getElementById("rb").style.width = "calc(100vw - 192px)";
    window.document.getElementById("rb3").src = "https://api.mcstatus.io/v2/widget/java/nbc.rainplay.cn:25970?dark=true&rounded=true";
    window.document.getElementById("rb3").style.width = "min(384px, calc(100vw - 192px))";
}

let lDisplay = false;

function rt11() {
    if(lDisplay === false) {
        lDisplay = true;
        window.document.getElementById("l").style.width = "260px";
        window.document.getElementById("l0").style.width = "260px";
        window.document.getElementById("l").style.display = "inline";
        window.document.getElementById("r").style.width = "calc(100vw - 260px)";
        window.document.getElementById("rt1").style.width = "calc(100vw - 260px)";
        window.document.getElementById("rt2").style.width = "calc(100vw - 260px)";
        window.document.getElementById("rb").style.width = "calc(100vw - 452px)";
        window.document.getElementById("rb3").style.width = "min(384px, calc(100vw - 452px))";
    } else {
        lDisplay = false;
        window.document.getElementById("l").style.display = "none";
        window.document.getElementById("r").style.width = "100vw";
        window.document.getElementById("rt1").style.width = "100vw";
        window.document.getElementById("rt2").style.width = "100vw";
        window.document.getElementById("rb").style.width = "calc(100vw - 192px)";
        window.document.getElementById("rb3").style.width = "min(384px, calc(100vw - 192px))";
    }
}