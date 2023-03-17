import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'table-data',
  styleUrl: 'table-data.css',
  scoped: true,
})
export class TableData {
  @Prop() item: {};
  @Prop() dataId: any;
  @Prop() dataFormatter: any;
  @State() disabledEdit: boolean = true;

  componentWillLoad() {
    console.log('item', this.item, 'dataId', this.dataId, 'dataFormatter', this.dataFormatter);
  }

  render() {
    return (
      <Host>
        <input
          onClick={() => (this.disabledEdit = false)}
          onBlur={() => (this.disabledEdit = true)}
          class="appearance-none block w-full text-gray-700 focus:border-2 py-1 px-2 rounded leading-tight focus:outline- focus:bg-white focus:border-gray-400"
          id="table-data"
          type="text"
          placeholder="Enter data"
          disabled={typeof this.item[this.dataId.alias] !== 'string' && typeof this.item[this.dataId.alias] !== 'number'}
          value={this.item[this.dataId.alias] ? this.dataFormatter(this.item[this.dataId.alias]) : this.item[this.dataId.alias]}
        />
      </Host>
    );
  }
}
