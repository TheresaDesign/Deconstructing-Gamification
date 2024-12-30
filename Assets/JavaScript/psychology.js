// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
// 1. update height of step elements
var stepH = Math.floor(window.innerHeight * 1.5);
step.style("height", stepH + "px");

var figureHeight = window.innerHeight / 1.5;
// Setze den top-Wert auf 25% der Fensterhöhe
var figureMarginTop = window.innerHeight * 0.25;

figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

// 3. tell scrollama to update new element dimensions
scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    
    // 1. Set active class on current step
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // 2. Update the active graphic
    figure.selectAll(".graphic").classed("is-visible", false); // Alle Grafiken unsichtbar machen
    figure.select(".graphic-" + (response.index + 1)).classed("is-visible", true); // Nur die passende Grafik anzeigen
}


function init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}

// kick things off
init();