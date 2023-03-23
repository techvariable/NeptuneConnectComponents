import { Component, Host, h, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'toggle-button',
  styleUrl: 'toggle-button.css',
  scoped: true,
})
export class ToggleButton {
  @Prop() selectedOption: string; 
  @Prop() toggleButtonHandler:any;
  @State() buttonValue:string = "";
  @State() checkedValue = '';

  @Watch('selectedOption')
  validateDate(newValue, oldValue) {
      if(newValue !== oldValue) {
          this.buttonValue = this.selectedOption
      }
  }
  componentWillLoad(){
    this.buttonValue = this.selectedOption;
    this.checkedValue = this.selectedOption;
  }
  
  render() {
    return (
      <Host class="w-24 mx-2">
        <div onClick={()=>this.toggleButtonHandler()} class="flex items-center justify-center w-full mb-12 cursor-pointer">
            <div class="relative">
              <input type="checkbox" id="toggleB" class="sr-only" checked={this.selectedOption=== this.checkedValue?false:true}/>

              <div style={{ width: '3.5rem', height: '2rem' }} class="block bg-gray-200 w-14 h-8 rounded-full"></div>

              <div style={{ top: '0.25rem', left: '0.25rem' }} class="dot absolute left-1 top-1 bg-gray-500 w-6 h-6 rounded-full transition"></div>
            </div>
            <div class="ml-3 text-gray-700 font-medium">{this.buttonValue}</div>
        </div>
      </Host>
    );
  }
}
