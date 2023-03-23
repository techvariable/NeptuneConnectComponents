import { Component, Host, h, Prop, State,Watch } from '@stencil/core';
import state from '../store';

@Component({
  tag: 'table-data-rows',
  styleUrl: 'table-data-rows.css',
  scoped: true,
})
export class TableDataRows {
  @Prop() tableHeader: any;
  @Prop() item: any;
  @Prop() dataFormatter: any;
  @Prop() rowId:number | string;
  @State() editMode: boolean = false;
  @Prop() isModalOpen:boolean;
  @Prop() toggleModalState:any;
  @State() rowItem:any;
  @Watch('item')
  validateDate(newValue, oldValue) {
      if(newValue !== oldValue) {
      this.rowItem = this.item;
      }
  }
  componentWillLoad(){
    this.rowItem = this.item;
  }

  editModeEnabler(){
    if(state.tableEditMode === true){
      state.tableEditMode = false;
      this.editMode = true
      state.changedFieldValues = [];
    } 
  }
  editSubmitter(){
    state.tableEditMode = true;
    this.editMode = false
    console.log("This is store values for a row",state.changedFieldValues);
    this.toggleModalState();
  }
  editModeCancel(){
    const rowData  = this.getNodeFromId(this.rowId)
    console.log("Row Data",rowData);
    this.rowItem = {...rowData};
    state.tableEditMode = true
    this.editMode = false
    state.changedFieldValues = [];


  }

  getNodeFromId(id: number | string) {
    return state.nodes.find(x => x.id === id)
  }

  render() {
    return (
      <Host>
        {state.selectedEditOption === 'ON' && (
        <td class="hover:bg-gray-50 px-3 py-3 whitespace-nowrap text-sm text-gray-900">
          {this.editMode === false ? (
            <div class="flex" style={{ justifyContent: 'space-evenly' }}>
              <button class="disabled:opacity-50" disabled={state.tableEditMode === false} onClick={() => this.editModeEnabler()} title='Edit'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button class="disabled:opacity-50" disabled={state.tableEditMode === false} title='Delete'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div class="flex" style={{ justifyContent: 'space-evenly' }}>
              <button title='Save' onClick={() => this.editSubmitter()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button title='Cancel' onClick={() => this.editModeCancel()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </td>
        )}
        {this.tableHeader.map((id: any) => (
          <td title={this.rowItem[id.alias]} text-overflow:ellipsis class="hover:bg-gray-50 px-3 py-3 whitespace-nowrap text-sm text-gray-900">
            <table-data rowId={this.rowId} fieldName={id.alias} editMode={this.editMode} item={this.rowItem} dataId={id} dataFormatter={this.dataFormatter}></table-data>
          </td>
        ))}
      </Host>
    );
  }
}
