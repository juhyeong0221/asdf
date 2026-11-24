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
        const t = document.getElementById("infos"),
        i = {
            rx: e.beta,
            ry: e.gamma,
            rz: e.alpha
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