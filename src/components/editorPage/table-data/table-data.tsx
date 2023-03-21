import { Component, Host, h, Prop, State,Watch } from '@stencil/core';
import state from '../store';

@Component({
  tag: 'table-data',
  styleUrl: 'table-data.css',
  scoped: true,
})
export class TableData {
  @Prop() item: {};
  @Prop() dataId: any;
  @Prop() dataFormatter: any;
  @Prop() editMode:boolean;
  @Prop() fieldName:string;
  @Prop() rowId:number;
  @State() disabledEdit: boolean = true;
  @State() disableInputState:boolean = true;
  @State() inputValue:string = '';
  @Watch('editMode')
  validateDate(newValue, oldValue) {
      if(newValue !== oldValue) {
        // console.log("Edit mode",this.editMode);
      this.disableInputState = typeof this.item[this.dataId.alias] !== 'string' && typeof this.item[this.dataId.alias] !== 'number' && this.disabledEdit || !this.editMode;
      // console.log("This is the state:=====================>",this.disableInputState);
      }
  }
  inputChangeHandler(e,fieldName){
    this.inputValue = e.target.value;
    console.log("Value changed in: ",this.rowId," in field:", fieldName, " to :" ,this.inputValue);
    console.log("Value",e.target.value);
    
    if(state.changedFieldValues.length > 0){
      let presentFlag = false;
      const changedFieldObj:any = {}
      state.changedFieldValues.forEach(item=>{
        if(item.rowId === this.rowId && item.fieldName === fieldName){
          item.currentValue = this.inputValue;
          presentFlag = true;
        }
      })
      if(presentFlag === false){
        changedFieldObj.rowId = this.rowId;
        changedFieldObj.fieldName = fieldName;
        changedFieldObj.currentValue = this.inputValue;
        state.changedFieldValues.push(changedFieldObj);
      }
    }else{
      const changedFieldObj:any = {};
      changedFieldObj.rowId = this.rowId;
      changedFieldObj.fieldName = fieldName;
      changedFieldObj.currentValue = this.inputValue;
      state.changedFieldValues.push(changedFieldObj);
    }
    console.log("Value of the changed object in store",state.changedFieldValues,"****************************");
  }


  render() {
    return (
      <Host>
        <input
          onClick={() => (this.disabledEdit = false)}
          onBlur={() => (this.disabledEdit = true)}
          onChange={(e)=> this.inputChangeHandler(e,this.fieldName)}
          style={{outlineColor: "#e9e9e9"}}
          class="appearance-none block w-full text-gray-700 focus:border-2 py-1 px-2 rounded leading-tight focus:outline outline-gray-200 focus:bg-white focus:border-gray-400"
          id={this.fieldName}
          type="text"
          placeholder="Enter data"
          disabled={this.disableInputState}
          value={this.item[this.dataId.alias] ? (this.disableInputState === true ?this.dataFormatter(this.item[this.dataId.alias]):this.item[this.dataId.alias]) : this.item[this.dataId.alias]}
        />
      </Host>
    );
  }
}
