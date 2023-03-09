import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'radio-button-multiple',
  scoped: true,
})
export class RadioButtonMultiple {
  @Prop() name: string;
  @Prop() label: string;
  @Prop() labels: string[];
  @Prop() align: 'vertical' | 'horizontal' = 'horizontal';
  @Prop() clickHandler:any;
  @Prop() checked : string;
  @Prop() disabledOptions:string[] =[];

  render() {
    return (
      <div class="py-2">
        <p class="my-2 text-gray-600 font-medium ">{this.label}</p>
        {this.labels.map(item => {
          return (
            <div class={this.align === 'horizontal' ? 'inline-block mr-7' : 'block'}>
              <div class="h-8 flex items-center">
                <label htmlFor={this.name} class="text-lg font-medium uppercase text-gray-700 font">
                  {item}
                </label>
                <input disabled={this.disabledOptions.includes(item)} required onClick={e=>this.clickHandler(e)} checked={this.checked === item} id={item} name={this.name} type="radio" value={item} class="ml-3 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
