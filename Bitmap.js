/** @type{HTMLCanvasElement} */
let can = document.getElementById('can');
let ctx = can.getContext('2d')
can.height = window.innerHeight;
can.width = window.innerWidth
let f = new Image();
f.src = "scene.jpg";
window.onload = () => {
    f.width = can.width / 6;
    f.height = can.height / 6
    ctx.drawImage(f, 0, 0, f.width, f.height)

    draw()
}
let mx, my;
window.addEventListener('mousemove', (e) => {
    mx = e.x;
    my = e.y;
})
class bits {
    constructor(x, y, col) {
        this.x = x;
        this.col = col;
        this.y = y;
        this.prx = x
        this.pry = y
        this.sie = 3
    }
    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.sie, 0, Math.PI * 2);
        ctx.fillStyle = this.col;
        // console.log(this.col)
        ctx.closePath()
        ctx.fill();
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.stroke()
    }
    update() {
        let dst = Math.sqrt((mx - this.x) * (mx - this.x) + (my - this.y) * (my - this.y))
        if (dst < 100) {
            this.x += mx - this.prx;
            this.y += my - this.pry;

        } else {
            this.x -= (this.x - this.prx) / 2;
            this.y -= (this.y - this.pry) / 2

        }
        this.draw()
    }
}

let pics = []

function draw() {
    let data = ctx.getImageData(0, 0, f.width, f.height)
    console.log(data)
    k = 0;
    for (let i = 0; i < f.height; i++) {
        for (let j = 0; j < f.width; j++) {
            if (data.data[i * 4 * f.width + j * 4 + 3] > 128) {
                let col = `rgb(${data.data[i *4* f.width + j * 4]},${data.data[i * 4*f.width + j * 4 + 1]},${data.data[i *4* f.width + j * 4 + 2]})`;
                pics.push(new bits(j * 6, i * 6, col));

            }
        }

    }
    console.log(pics.length)

    function ani() {
        ctx.clearRect(0, 0, can.width, can.height);
        // h1.style.position = 'absolute'

        for (let i = 0; i < pics.length; ++i)
            pics[i].update();
        requestAnimationFrame(ani)
    }
    ani();

}