import * as d3 from "d3"
import * as dagre from "dagre"
import { line } from "d3";

//const data = [{'wdith': 5, 'height':5}, {'wdith': 10, 'height':10}, {'wdith': 15, 'height':15}]

class Box {
    width:number
    height:number
    x: number
    y: number
    label: string
    constructor(w:any, h:any) {
        console.log("building box")
        this.width = w
        this.height = h
    }
    setPosition(x:number, y:number) {
        this.x = x
        this.y = y
        return this
    }
    setLabel(l: string) {
        this.label = l
        return this
    }
    appendTo(s:any) {
        console.log("running svg", s)
        let selection = s.append('g').attr('transform', 'translate('+this.x+' '+this.y+')')
        selection
            .append('rect')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('fill', 'black')
        selection
            .append('circle')
            .attr('r', 5)
            .attr('cx', this.width/2)
            .attr('cy', this.height/2)
            .attr('fill', 'green')
        selection
            .append('text')
            .attr('dx', 5)
            .attr('dy', 15)
            .attr('fill', 'white')
            .text(this.label)
            return selection
    }
}


//let b1 = new Box(140, 140)
//let b2 = new Box(250, 250)
//console.log(b1)
let svgPlace = d3.select('body').append("svg")
    .attr('width', 6000)
    .attr('height', 6000);

let defs = svgPlace.append('defs')
defs.append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', "0 -5 10 10")
    .attr('refX', 5)
    .attr('refY', 0)
    .attr('markerWidth', 4)
    .attr('markerHeight', 4)
    .attr('orient', 'auto')
    .append('path')
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class", "arrowHead")
        .attr('sroke', 'black')
//b1.appendTo(svgPlace)
//b2.appendTo(svgPlace)

// Create a new directed graph 
let g = new dagre.graphlib.Graph();

// Set an object for the graph label
g.setGraph({});

// Default to assigning a new object as a label for each new edge.
g.setDefaultEdgeLabel(function() { return {}; });

// Add nodes to the graph. The first argument is the node id. The second is
// metadata about the node. In this case we're going to add labels to each of
// our nodes.
g.setNode("kspacey",    { label: "Kevin Spacey",  width: 150, height: 100 });
g.setNode("swilliams",  { label: "Saul Williams", width: 150, height: 100 });
g.setNode("bpitt",      { label: "Brad Pitt",     width: 150, height: 100 });
g.setNode("hford",      { label: "Harrison Ford", width: 150, height: 100 });
g.setNode("lwilson",    { label: "Luke Wilson",   width: 150, height: 100 });
g.setNode("kbacon",     { label: "Kevin Bacon",   width: 150, height: 100 });
g.setNode("johnny",     { label: "Jonny NoFriends",   width: 150, height: 100 });

// Add edges to the graph.
g.setEdge("kspacey",   "swilliams");
g.setEdge("swilliams", "kbacon");
g.setEdge("kspacey",   "lwilson");
g.setEdge("bpitt",     "kbacon");
g.setEdge("hford",     "lwilson");
g.setEdge("lwilson",   "kbacon");
g.setEdge("lwilson",   "kspacey");

dagre.layout(g)

//console.log(g)

g.nodes().forEach(n=>{
    console.log(g.node(n))
    let box = new Box(150, 100)
        .setPosition(g.node(n).x, g.node(n).y)
        .setLabel(g.node(n).label)
        .appendTo(svgPlace)
})

let lineFn = d3.line()
    .x(function(d:any) {return d[0]+75})
    .y(function(d:any) {return d[1]+50})

g.edges().forEach(e=>{
console.log(g.edge(e))
let lineData = g.edge(e).points.map((d)=>{return [d.x, d.y]})
console.log('lineData', lineData)
svgPlace.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .datum(lineData).attr('d', lineFn)
    .attr('marker-end', 'url(#arrow)')
 //   console.log(lineData)
//        svgPlace.append('g')
//            .append('circle')
//            .attr('r', 2)
//            .attr('fill', 'blue')
//            .attr('cx', coord.x+75)
 //           .attr('cy', coord.y+50)
//    })
})

