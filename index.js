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

    /* 0: 정수 반올림, 소수 i번째 자리까지 반올림*/
    function round(n, i=1/*decimals*/) {
        return Math.round(n * Math.pow(10, i)) / Math.pow(10, i);
    }

    function moveHandler(e) {
        const t = document.getElementById("infos"),
        i = {
            rx: round(e.beta, 2),
            ry: round(e.gamma, 2),
            rz: round(e.alpha, 2)
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