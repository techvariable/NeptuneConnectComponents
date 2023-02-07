import { Component, h, Prop ,State } from '@stencil/core';

@Component({
  tag: 'node-item',
  scoped: true,
})
export class NodeItem {
  @Prop() navigators: string[] =[];
  @State() list:string[]=['View','Edit'];
  // @Prop() nodeurl:string;
  @Prop() fetchNavigators:any;
  @Prop() fetchData:any;

  componentWillLoad(){
    this.fetchNavigators();
    console.log(this.navigators)
  }

  render() {
    return (
      <div style={{overflow:'visible'}} class={'overflow-y-auto py-4 px-3 bg-gray-100 rounded-md h-96'}>
        <ul class="space-y-2">
          {this.navigators.map(item => {
            return (
              <li>
                <div class="flex justify-between p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-200 hover:scale-110">
                  <div class="ml-3">{item}</div>
                  <menu-drop-down listTitle={item} list={this.list} fetchData={this.fetchData}></menu-drop-down>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}
