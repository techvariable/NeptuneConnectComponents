import { Component, Host, h } from '@stencil/core';
import cytoscape from 'cytoscape';

@Component({
  tag: 'visualize-data-component',
  styleUrl: 'visualize-data-component.css',
  scoped: true,
})
export class VisualizeDataComponent {
  componentDidLoad() {
    const cy = cytoscape({
      container: document.getElementById('cy'), // container to render in

      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: 'a' },
        },
        {
          // node b
          data: { id: 'b' },
        },
        {
          // edge ab
          data: { id: 'ab', source: 'a', target: 'b' },
        },
      ],

      style: [
        // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)',
          },
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],

      layout: {
        name: 'grid',
        rows: 1,
      },

      zoomingEnabled: false,
      userZoomingEnabled: true,
      autoungrabify: false,
    });

    cy.zoom({
      level: 1,
      position: { x: 500, y: 0 },
    });
  }

  render() {
    return (
      <Host class="border-4 border-gray-200">
        <div id="cy"></div>
      </Host>
    );
  }
}
