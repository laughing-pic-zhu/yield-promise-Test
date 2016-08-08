function* main() {
    yield 'green';
    yield 'red';
    yield 'yellow';
}

var g = main();

function turn() {
    console.log(g.next().value);
}

turn();
setTimeout(turn, 2000);
setTimeout(turn, 4000);
