import { Component, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'multi-selectt',
  scoped: true,
})
export class MultiSelectt {
  @State() dropDownState: boolean = false;
  @Prop() selected: string[];
  @Prop() roles: string[];

  dropDownClick() {
    console.log('clicked drop down');
    this.dropDownState = !this.dropDownState;
    console.log(this.dropDownState);
  }
  removeChip(e) {
    const removeValue = e.target.parentElement.parentElement.parentElement.innerText;
    this.selected = this.selected.filter(value => removeValue !== value);
  }
  itemOnClick(e){
    console.log(e.target.innerText);
    if(!this.selected.includes(e.target.innerText)){
      this.selected.push(e.target.innerText);
    }
    this.dropDownState=false;
    console.log(this.selected);
  }
  searchValue(e){
    // console.log(e.target.value);
    const searchText = e.target.value;
    const arr = this.roles.filter(value=>value.includes(searchText));
    console.log(arr);
  }

  render() {
    return (
      <div class="bg-gray-500 border border-gray-300 shadow-gray-300  p-3 space-y-2">
        <div class="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
          <div class="w-full px-4">
            <div class="flex flex-col items-center relative">
              {/* select area */}
              <div class="w-full  svelte-1l8159u">
                <div class="my-2 p-1 px-2 flex border justify-between border-gray-200 bg-white rounded svelte-1l8159u">
                  <div class="flex flex-1 py-1 flex-wrap justify-between">
                    {this.selected.map(item => (
                      <div class="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                        <div class="text-xs font-normal leading-none max-w-full flex-initial">{item}</div>
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

                    {/* input for select */}
                    <div class="">
                      <input onKeyDown={e=>{this.searchValue(e)}} placeholder="Enter values to search" class="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800" />
                    </div>
                  </div>
                  {/* drop down button */}
                  <div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                    <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none" onClick={() => this.dropDownClick()}>
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
                        class="feather feather-chevron-up w-4 h-4"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* drop down list */}
              {this.dropDownState && (
                <div class="absolute shadow top-100 bg-white z-400 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
                  <div class="w-full">
                    {this.roles.map(item => (
                      <div onClick={e=>this.itemOnClick(e)} class="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                        <div class="flex w-full items-center p-2 px-4 border-transparent border-l-2 relative border-teal-600">
                          <div class="w-full items-center flex">
                            <div class="mx-2 px-2 leading-6  ">{item}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
