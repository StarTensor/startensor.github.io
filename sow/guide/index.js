let lDisplay = false;

function rt11() {
    if(lDisplay === false) {
        lDisplay = true;
        window.document.getElementById("l").style.width = "260px";
        window.document.getElementById("l").style.display = "block";
        window.document.getElementById("l0").style.width = "260px";
        window.document.getElementById("l1").style.width = "260px";
        window.document.getElementById("r").style.width = "calc(100vw - 260px)";
        window.document.getElementById("rt1").style.width = "calc(100vw - 260px)";
        window.document.getElementById("rt2").style.width = "calc(100vw - 260px)";
        window.document.getElementById("rb").style.width = "calc(100vw - 324px)";
        window.document.getElementById("rbb").style.width = "calc(100vw - 324px)";
    } else {
        lDisplay = false;
        window.document.getElementById("l").style.display = "none";
        window.document.getElementById("r").style.width = "100vw";
        window.document.getElementById("rt1").style.width = "100vw";
        window.document.getElementById("rt2").style.width = "100vw";
        window.document.getElementById("rb").style.width = "calc(100vw - 64px)";
        window.document.getElementById("rbb").style.width = "calc(100vw - 64px)";
    }
}