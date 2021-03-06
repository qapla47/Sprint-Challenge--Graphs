// Search for "!!! IMPLEMENT ME" comments

/**
 * Edge class
 */
class Edge {
  constructor(destination, weight = 1) {
    this.destination = destination;
    this.weight = weight;
  }
}

/**
 * Vertex class
 */
class Vertex {
  constructor(value = "vertex") {
    this.value = value;
    this.edges = [];
  }
}

/**
 * Graph class
 */
class Graph {
  constructor() {
    this.vertexes = [];
  }

  /**
   * This function looks through all the vertexes in the graph and returns the
   * first one it finds that matches the value parameter.
   *
   * Used from the main code to look up the verts passed in on the command
   * line.
   *
   * @param {*} value The value of the Vertex to find
   *  this ^^ tripped me up for the longest time, even though I knew it was a comment, the fact that it was highlighted by the syntax highlighter gave me pause. Though I did learn a thing or two about @param...
   *
   * @return null if not found
   *
   */
  findVertex(value) {
    // loop through the vertexes
    for (let v of this.vertexes) {
      // if the current vertex matches the passed in value
      if (v.value === value) {
        // console.log(v);
        // return the found vertex
        return v;
      }
    }
    // otherwise return null
    return null;
  }

  /**
   * Breadth-First search from a starting vertex. This should log parent
   * pointers back from neighbors to their parent.
   *
   * @param {Vertex} start The starting vertex for the BFS
   */
  bfs(start) {
    // create a stack here to stash our vertexes in during the search
    const stack = [];

    // loop through the vertexes
    for (let v of this.vertexes) {
      // set the color to white and the parent to null
      v.color = "white";
      v.parent = null;
    }

    // set the color to grey indicating we're investigating it
    start.color = "grey";

    // push the starting value into the stack for future use
    stack.push(start);

    // while there's something in the stack
    while (stack.length > 0) {
      // set u to the zeroth value
      let u = stack[0];

      // loop through the edges of u
      for (let edge of u.edges) {
        // set vert to the destination node of the edge
        let vert = edge.destination;

        // if the color of that node is white, that means we haven't investigated the node
        if (vert.color === "white") {
          // set it to grey
          vert.color = "grey";
          // set the parent of this node to u
          vert.parent = u;
          // push the node to the stack for future use
          stack.push(vert);
        }
      }
      // set u to black to indicate we're finished with this node
      u.color = "black";
      // remove the zeroth value from the stack - aka dequeue
      stack.shift();
    }
  }

  /**
   * Print out the route from the start vert back along the parent
   * pointers (which should have been set in the previous BFS)
   *
   * @param {Vertex} start The starting vertex to follow parent
   *                       pointers from
   */
  outputRoute(start) {
    // start with an empty string to track our route
    let route = "";
    // set the node to the starting vertex
    let node = start;
    // while there are still nodes (meaning while the node doesn't return null, as it will once the parent value reaches the end of the line)
    while (node) {
      // append the route with the following
      route += ` --> ${node.value}`;
      // set the node to the node's parent
      node = node.parent;
    }
    // log the route
    console.log(route);
  }

  /**
   * Show the route from a starting vert to an ending vert.
   */
  route(start, end) {
    // Do BFS and build parent pointer tree
    this.bfs(end);

    // Show the route from the start
    this.outputRoute(start);
  }
}

/**
 * Helper function to add bidirectional edges
 */
function addEdge(v0, v1) {
  v0.edges.push(new Edge(v1));
  v1.edges.push(new Edge(v0));
}

/**
 * Main
 */

// Test for valid command line
const args = process.argv.slice(2);

if (args.length != 2) {
  console.error("usage: routing hostA hostB");
  process.exit(1);
}

// Build the entire Internet
// (it's only a model)
const graph = new Graph();
const vertA = new Vertex("HostA");
const vertB = new Vertex("HostB");
const vertC = new Vertex("HostC");
const vertD = new Vertex("HostD");
const vertE = new Vertex("HostE");
const vertF = new Vertex("HostF");
const vertG = new Vertex("HostG");
const vertH = new Vertex("HostH");

addEdge(vertA, vertB);
addEdge(vertB, vertD);
addEdge(vertA, vertC);
addEdge(vertC, vertD);
addEdge(vertC, vertF);
addEdge(vertG, vertF);
addEdge(vertE, vertF);
addEdge(vertH, vertF);
addEdge(vertH, vertE);

graph.vertexes.push(vertA);
graph.vertexes.push(vertB);
graph.vertexes.push(vertC);
graph.vertexes.push(vertD);
graph.vertexes.push(vertE);
graph.vertexes.push(vertF);
graph.vertexes.push(vertG);
graph.vertexes.push(vertH);

// Look up the hosts passed on the command line by name to see if we can
// find them.

const hostAVert = graph.findVertex(args[0]);

if (hostAVert === null) {
  console.error("routing: could not find host: " + args[0]);
  process.exit(2);
}

const hostBVert = graph.findVertex(args[1]);

if (hostBVert === null) {
  console.error("routing: could not find host: " + args[1]);
  process.exit(2);
}

// Show the route from one host to another

graph.route(hostAVert, hostBVert);
