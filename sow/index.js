window.onload = function() {
    let nowDate = new Date();
    window.document.getElementById("rb121b").innerHTML = ((Date.parse(`${nowDate.getFullYear()}-${nowDate.getMonth() < 9 ? "0" : ""}${nowDate.getMonth() + 1}-${nowDate.getDate()}`) - Date.parse("2026-01-20")) / 86400000).toString();
    window.document.getElementById("rb11").src = "https://api.mcstatus.io/v2/widget/java/nbc.rainplay.cn:25970?dark=true&rounded=true";
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
        window.document.getElementById("rb").style.width = "calc(100vw - 324px)";
    } else {
        lDisplay = false;
        window.document.getElementById("l").style.display = "none";
        window.document.getElementById("r").style.width = "100vw";
        window.document.getElementById("rt1").style.width = "100vw";
        window.document.getElementById("rt2").style.width = "100vw";
        window.document.getElementById("rb").style.width = "calc(100vw - 64px)";
    }
}