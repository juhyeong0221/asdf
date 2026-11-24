/* 0: 정수 반올림, 소수 i번째 자리까지 반올림*/
function round(n, i=1/*decimals*/) {
    return Math.round(n * Math.pow(10, i)) / Math.pow(10, i);
}

function toRad(deg) {
    return deg * Math.PI / 180;
}

function rotate(x, y, d/*radian*/) {
    /* 일반적인 삼각함수 동경의 방향과 일치 */
    return {
        x: x * Math.cos(d) - y * Math.sin(d),
        y: x * Math.sin(d) + y * Math.cos(d)
    };
}

class Vector2D {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
        this.scale = Math.sqrt(x*x + y*y);
    }
}

class Vector3D {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = Math.sqrt(x*x + y*y + z*z);
    }
    rotate(dx, dy, dz /*radian*/) {
        /*축이 진행하는 방향으로 축을 바라볼 때 시계방향이 +*/
        /*축을 기준으로 회전한 정도를 작성; 그냥 일반적인 상황임*/
        /* Z -> X -> Y */
        let rZ = rotate(this.x, this.y, dz);
        this.x = rZ.x;
        this.y = rZ.y;
        let rX = rotate(this.y, this.z, dx);
        this.y = rX.x;
        this.z = rX.y;
        let rY = rotate(this.z, this.x, dy);
        this.z = rY.x;
        this.x = rY.y;
    }

}

async function load() {    
    let d = 0;
    let v = new Vector3D(1, 0, 0);
    function deviceMotionHandler(e) {
        const v = {
            x: round(e.acceleration.x, d),
            y: round(e.acceleration.y, d),
            z: round(e.acceleration.z, d)
        };
        const m = document.getElementById("m");
        m.innerText = `
            x: ${v.x}
            y: ${v.y}
            z: ${v.z}
        `;
    }
    function deviceOrientationHandler(e) {
        const v = {
            rx: round(e.beta, d),
            ry: round(e.gamma, d),
            rz: round(e.alpha, d)
        };
        v.rotate(toRad(v.rx), toRad(v.ry), toRad(v.rz));
        const r = document.getElementById("r");
        r.innerText = `
            rx: ${v.rx}
            ry: ${v.ry}
            rz: ${v.rz}

            stdX: ${round(v.x, d)}
            stdY: ${round(v.y, d)}
            stdZ: ${round(v.z, d)}
        `;
    }
    if (DeviceOrientationEvent && DeviceMotionEvent) {
        DeviceOrientationEvent.requestPermission()
        .then(() => {
            window.addEventListener("devicemotion", deviceMotionHandler, true);
            window.addEventListener("deviceorientation", deviceOrientationHandler, true);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn1");
    btn.addEventListener("click", () => {
        load()
    });
});