async function onStart() {
    if (DeviceOrientationEvent.requestPermission){
        const perm = await DeviceOrientationEvent.requestPermission();
            if (perm === "granted") {
                window.addEventListener(
                    "deviceorientation",
                    moveHandler,
                    true
                );
            }
        }
    }

    function moveHandler(e) {
        const t = document.getElementById("infos");
        t.innerText = `
            abs: ${e.absolute}
            dx: ${e.alpha}
            dy: ${e.beta}
           dz: ${e.gamma}
        `
        console.log(e);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("btn1");
        btn.addEventListener("click", () => {
        alert("!");
        onStart();
    });
});