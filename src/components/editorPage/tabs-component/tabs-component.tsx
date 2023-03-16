import { Component, h, Prop } from '@stencil/core';

const activeStyle = 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500';
const nonActiveStyle = 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';

@Component({
  tag: 'tabs-component',
  scoped: true,
})
export class TabsComponent {
  @Prop() tabslist: { name: string; className: string }[];
  @Prop() activeIndex: number;
  @Prop() tabClickHandler: any;
  render() {
    return (
      <div>
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px">
            {this.tabslist.map((item, index) => (
              <li class="mr-2">
                <a onClick={() => this.tabClickHandler(index)} href="#" class={this.activeIndex === index ? activeStyle : nonActiveStyle}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
