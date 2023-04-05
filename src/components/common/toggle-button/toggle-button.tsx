import { Component, Host, h, Prop, State } from '@stencil/core';

const classesDisableHandling = {
  true: 'cursor-not-allowed',
  false: 'cursor-pointer',
};
@Component({
  tag: 'toggle-button',
  styleUrl: 'toggle-button.css',
  scoped: true,
})
export class ToggleButton {
  @Prop() isSelected: boolean;
  @Prop() toggleButtonHandler: any;
  @Prop() isDisabled: boolean = false;
  @State() buttonValue: string = '';
  @State() checkedValue = '';
  clickHandler() {
    if (this.isDisabled === false) this.toggleButtonHandler();
  }

  render() {
    return (
      <Host class="mx-1">
        <div onClick={() => this.clickHandler()} class={`flex items-center justify-center w-full ${classesDisableHandling[this.isDisabled.toString()]}`}>
          <div class="relative">
            <input type="checkbox" id="toggleB" class="sr-only" checked={this.isSelected} />

            <div style={{ width: '3.5rem', height: '2rem' }} class="block bg-gray-200 w-14 h-8 rounded-full"></div>

            <div style={{ top: '0.25rem', left: '0.25rem' }} class="dot absolute left-1 top-1 bg-gray-500 w-6 h-6 rounded-full transition"></div>
          </div>
        </div>
      </Host>
    );
  }
}
