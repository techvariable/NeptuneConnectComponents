import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'chips-list',
  scoped: true,
})
export class ChipsList {
    @Prop() selected: string[]= ['a','b','c','d'];

    removeChip(e) {
        const removeValue = e.target.parentElement.parentElement.parentElement.innerText;
        this.selected = this.selected.filter(value => removeValue !== value);
    }


  render() {
    return (
      <div>
        <div class="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
          <div class="w-full px-4">
            <div class="flex flex-col items-center relative">
              

              <div class="w-full  svelte-1l8159u">
                <div class="my-2 p-1 px-2 flex border justify-between border-gray-200 bg-white rounded svelte-1l8159u">
                  <div class="w-full gap-2 flex flex-auto py-1 flex-wrap">
                    {/* Chips items */}
                    {this.selected.map(item => (
                      <div class="flex justify-center items-center m-1 font-normal py-1 px-2 rounded-full text-teal-700 border border-blue-600 bg-gray-100">
                        <div class="text-xl font-normal leading-none max-w-full flex-initial">{item}</div>
                        <div class="flex flex-auto flex-row-reverse">
                          <div onClick={e => this.removeChip(e)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}




                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
