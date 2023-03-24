import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'table-row',
  styleUrl: 'table-row.css',
  shadow: true,
})
export class TableRow {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
