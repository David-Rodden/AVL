// let i = 0; // Define 'i' outside your update function
// const duration = 750; // Define the duration of the transitions
// document.getElementById('draw-btn').addEventListener('click', () => {
//     const inputValues = document.getElementById('tree-values').value.split(',').map(Number);
//     fetch('/update_tree', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({values: inputValues}),
//     })
//         .then(response => response.json())
//         .then(data => drawTree(data))
//         .catch(error => console.error('Error:', error));
// });
//
// function drawTree(treeData) {
//     // Clear the previous tree
//     d3.select("#tree-container").html("");
//
//     // Set the dimensions and margins of the diagram
//     const margin = {top: 20, right: 90, bottom: 30, left: 90},
//         width = 960 - margin.left - margin.right,
//         height = 500 - margin.top - margin.bottom;
//
//     // Append the svg object to the body of the page
//     const svg = d3.select("#tree-container").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//     // Assigns parent, children, height, depth
//     const root = d3.hierarchy(treeData, function (d) {
//         return d.children;
//     });
//     root.x0 = height / 2;
//     root.y0 = 0;
//
//     // Collapse after the second level
//     root.children.forEach(collapse);
//
//     update(root);
//
//     // Collapse the node and all it's children
//     function collapse(d) {
//         if (d.children) {
//             d._children = d.children
//             d._children.forEach(collapse)
//             d.children = null
//         }
//     }
//
//     function update(source) {
//         // Assigns the x and y position for the nodes
//         const treeData = d3.tree().size([height, width])(root);
//
//         // Compute the new tree layout.
//         const nodes = treeData.descendants(),
//             links = treeData.descendants().slice(1);
//
//         // Normalize for fixed-depth.
//         nodes.forEach(function (d) {
//             d.y = d.depth * 180
//         });
//
//         // Update the nodes...
//         const node = svg.selectAll('g.node')
//             .data(nodes, function (d) {
//                 return d.id || (d.id = ++i); // Use 'i' here
//             });
//
//         // Enter any new modes at the parent's previous position.
//         const nodeEnter = node.enter().append('g')
//             .attr('class', 'node')
//             .attr("transform", function (d) {
//                 return "translate(" + source.y0 + "," + source.x0 + ")";
//             })
//             .on('click', function (event, d) {  // Updated to include 'event' and 'd'
//                 click(d);  // Call the click function with the node data 'd'
//             });
//
//
//         // Add Circle for the nodes
//         nodeEnter.append('circle')
//             .attr('class', 'node')
//             .attr('r', 1e-6)
//             .style("fill", function (d) {
//                 return d._children ? "lightsteelblue" : "#fff";
//             });
//
//         // Add labels for the nodes
//         nodeEnter.append('text')
//             .attr("dy", ".35em")
//             .attr("x", function (d) {
//                 return d.children || d._children ? -13 : 13;
//             })
//             .attr("text-anchor", function (d) {
//                 return d.children || d._children ? "end" : "start";
//             })
//             .text(function (d) {
//                 return d.data.value;
//             });
//
//         // UPDATE
//         const nodeUpdate = nodeEnter.merge(node);
//
//         // Transition to the proper position for the node
//         nodeUpdate.transition()
//             .duration(duration)
//             .attr("transform", function (d) {
//                 return "translate(" + d.y + "," + d.x + ")";
//             });
//
//         // Update the node attributes and style
//         nodeUpdate.select('circle.node')
//             .attr('r', 10)
//             .style("fill", function (d) {
//                 return d._children ? "lightsteelblue" : "#fff";
//             })
//             .attr('cursor', 'pointer');
//
//         // Remove any exiting nodes
//         const nodeExit = node.exit().transition()
//             .duration(duration)
//             .attr("transform", function (d) {
//                 return "translate(" + source.y + "," + source.x + ")";
//             })
//             .remove();
//
//         // On exit reduce the node circles size to 0
//         nodeExit.select('circle')
//             .attr('r', 1e-6);
//
//         // On exit reduce the opacity of text labels
//         nodeExit.select('text')
//             .style('fill-opacity', 1e-6);
//
//         // Update the links...
//         const link = svg.selectAll('path.link')
//             .data(links, function (d) {
//                 return d.id;
//             });
//
//         // Enter any new links at the parent's previous position.
//         const linkEnter = link.enter().insert('path', "g")
//             .attr("class", "link")
//             .attr('d', function (d) {
//                 const o = {x: source.x0, y: source.y0}
//                 return diagonal(o, o)
//             });
//
//         // UPDATE
//         const linkUpdate = linkEnter.merge(link);
//
//         // Transition back to the parent element position
//         linkUpdate.transition()
//             .duration(duration)
//             .attr('d', function (d) {
//                 return diagonal(d, d.parent)
//             });
//
//         // Remove any exiting links
//         const linkExit = link.exit().transition()
//             .duration(duration)
//             .attr('d', function (d) {
//                 const o = {x: source.x, y: source.y}
//                 return diagonal(o, o)
//             })
//             .remove();
//
//         // Store the old positions for transition.
//         nodes.forEach(function (d) {
//             d.x0 = d.x;
//             d.y0 = d.y;
//         });
//
//         // Creates a curved (diagonal) path from parent to the child nodes
//         function diagonal(s, d) {
//             const path = `M ${s.y} ${s.x}
//                       C ${(s.y + d.y) / 2} ${s.x},
//                         ${(s.y + d.y) / 2} ${d.x},
//                         ${d.y} ${d.x}`
//
//             return path
//         }
//
//         // Toggle children on click.
//         function click(d) {
//             console.log("Clicked node data:", d); // This should now log the node's data
//
//             if (d.children) {
//                 console.log("Collapsing node");
//                 d._children = d.children;
//                 d.children = null;
//             } else if (d._children) {
//                 console.log("Expanding node");
//                 d.children = d._children;
//                 d._children = null;
//             } else {
//                 console.log("Node has no children to toggle");
//             }
//
//             update(d);
//         }
//
//
//     }
//
// // Redraw for the first time to position everything
//     update(root);
//
// }
