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
  @State() disableInputState:boolean = true;

  componentWillLoad() {
    this.disableInputState = typeof this.item[this.dataId.alias] !== 'string' && typeof this.item[this.dataId.alias] !== 'number' && this.disabledEdit;
    console.log("This is the state:=====================>",this.disableInputState);
  }

  render() {
    return (
      <Host>
        <input
          onClick={() => (this.disabledEdit = false)}
          onBlur={() => (this.disabledEdit = true)}
          style={{outlineColor: "#e9e9e9"}}
          class="appearance-none block w-full text-gray-700 focus:border-2 py-1 px-2 rounded leading-tight focus:outline outline-gray-200 focus:bg-white focus:border-gray-400"
          id="table-data"
          type="text"
          placeholder="Enter data"
          disabled={this.disableInputState}
          value={this.item[this.dataId.alias] ? (this.disableInputState === true ?this.dataFormatter(this.item[this.dataId.alias]):this.item[this.dataId.alias]) : this.item[this.dataId.alias]}
        />
      </Host>
    );
  }
}
