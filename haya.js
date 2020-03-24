let count = [], position = [];
let num, queue;

function start() {
    num = $("#num-input").val();
    queue = new Array(num).fill(null);
    count['a'] = num;count['b'] = 0;count['c'] = 0;
    position['a'] = $("#A").position();
    position['b'] = $("#B").position();
    position['c'] = $("#C").position();
    draw()
}

function draw() {
    for (let i = 1; i <= num; i++) {
        let id = 'c' + i;
        let color = i % 2 === 0 ? '#fff' : '#0ec2ff';
        let padding = 0 + ' ' + (num - i) * 3 + 'px';
        let divStyle = `'width:200px;height:20px;position:relative;padding:${padding};'`;
        let noStyle = `'background-color:${color}'`;
        let no = `<p style=${noStyle}>${i}</p>`;
        let htmlTag = `<div id='${id}' style=${divStyle}>${no}</div>`;
        $(".tower").append(htmlTag);
    }
    solve(num, 'a', 'b', 'c');
    play(1);
}
function solve(n, a, b, c) {
    if (n === 0) return;
    solve(n - 1, a, c, b);
    queue.push({n, a, c});
    solve(n - 1, b, a, c);
}

function play(i) {
    if (i === queue.length - 1) {
        a2c('1', count['a']===0 ?'b':'a', "c", null);
        return;
    }
    a2c(queue[i].n, queue[i].a, queue[i].c, () => {
        sleep(1150).then(() => {
            play(i + 1)
        })
    });
}

function a2c(no, a, c, fuc) {
    $("#console").append(`<div>${no} => ${a} to ${c}<div>`);
    let id = '#c' + no;
    $(id).animate({top: -(no - 1) * 20}, 50, 'swing', null);
    $(id).animate({left: position[c].left}, 1000, 'swing', null);
    $(id).animate({top: (num - no - count[c]) * 20}, 50, 'swing', fuc());
    count[c] += 1;
    count[a] -= 1;
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


