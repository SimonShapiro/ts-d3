import * as d3 from "d3"
import { svg, color } from "d3";

const data:number[] = [50, 100, 150]

class Box {
    id: any
    element:any
    shape:string = 'rect'
    width: number
    height: number
    x:number
    y:number
    fill:string='black'
    constructor(id:string, width:number=80, height:number=80, x:number=0, y:number=0) {
        console.log('building box')
        this.id = id
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }
    setSize(w:number, h:number) {
        this.width = w
        this.height = h
        return this
    }
    setColor(color:string) {
        this.fill = color
        return this
    }
    setPosition(x:number, y:number) {
        this.x = x
        this.y = y
        return this
    }
    out(d:[number]) {
        
        let container = d3.select('div').attr('id', this.id)
            .append('g')
            .attr('transform', 'translate('+this.x+' '+this.y+')')
        container.append('rect')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('fill', this.fill)
        container.append('circle')
                    .attr('r', 10)
                    .attr('cx', this.width/2)
                    .attr('cy', this.height/2)
                    .attr('fill', 'green')
        return container
    }
}

console.log('hello')
var sampleSVG = d3.select("#viz")
                    .append("svg")
                    .attr("width", 600)
                    .attr("height", 600);    

sampleSVG.selectAll('g')
    .data(data)
    .enter()
        .append('g')
            .append("circle")
            .style("stroke", "gray")
            .style("fill", "white")
            .attr("r", 40)
            .attr("cx", (d)=>{return d})
            .attr("cy", (d)=>{return d})
            .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
            .on("mouseout", function(){d3.select(this).style("fill", "white");})
                .append('circle')
                .attr('r', 8)
                .attr('fill', 'black')