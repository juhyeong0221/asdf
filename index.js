function onStart() {
    window.addEventListener(
        "deviceorientation",
        moveHandler,
        true
    );
}

function moveHandler(e) {
    const t = document.getElementById("infos");
    t.innerText = `
    abs: ${e.absolute}
    dx: ${e.alpha}
    dy: ${e.beta}
    dz: ${e.gamma}
    `
}

onStart();