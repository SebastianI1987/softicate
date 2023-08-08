import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Node } from './node.model';
import { Network } from 'vis-network/standalone/esm/vis-network';
import { DataSet } from 'vis-data/peer/esm/vis-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  nodes!: DataSet<any>;
  edges!: DataSet<any>;
  value: number = 0;
  nodeName: string = '';
  connectedNodes: string = '';

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Create initial nodes
    const node1 = new Node(10, 'Node 1');
    const node2 = new Node(20, 'Node 2');

    // Connect initial nodes
    node1.next = node2;

    // Create data sets for nodes and edges
    this.nodes = new DataSet<any>([
      { id: 1, label: node1.name },
      { id: 2, label: node2.name }
    ]);

    this.edges = new DataSet<any>([
      { from: 1, to: 2 }
    ]);

    // Create a network graph
    const container = this.elementRef.nativeElement.querySelector('#mynetwork');
    const data = {
      nodes: this.nodes,
      edges: this.edges
    };
    const options = {};
    const network = new Network(container, data, options);
  }

  addNode(): void {
    // Create a new node with the given name and incremented value
    const newNode = new Node(this.value += 10, this.nodeName);

    // Add the new node to the data set
    this.nodes.add({ id: newNode.value, label: newNode.name });

    // // Connect the new node to the specified connected nodes
    const connectedNodes = this.connectedNodes.split(',').map(node => node.trim());
    connectedNodes.forEach(node => {
      const connectedNode = this.nodes.get().find(n => n.label === node);
      if (connectedNode) {
        this.edges.add({ from: connectedNode.id, to: newNode.value });
      }
    });
  }
}
