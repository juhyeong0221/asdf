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

    function round(i) {
        return Math.round(i * 100) / 100;
    }

    function moveHandler(e) {
        const t = document.getElementById("infos"),
        i = {
            rx: round(e.beta),
            ry: round(e.gamma),
            rz: round(e.alpha)
        };

        t.innerText = `
            rx: ${i.rx}
            ry: ${i.ry}
            rz: ${i.rz}
        `
    }

    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("btn1");
        btn.addEventListener("click", () => {
        alert("!");
        onStart();
    });
});