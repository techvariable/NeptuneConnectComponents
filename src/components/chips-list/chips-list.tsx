import { Component, h, Prop } from '@stencil/core';

const sortAsc = (
  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
  </svg>
);

const sortDesc = (
  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
  </svg>
);

const search = (
  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
  </svg>
);

@Component({
  tag: 'chips-list',
  scoped: true,
})
export class ChipsList {
  @Prop() sortchips: {};
  @Prop() searchChips: {};
  @Prop() removeSortChip: any;
  @Prop() removeSearchChip: any;
  @Prop() togglesort: any;

  render() {
    return (
      <div>
        <div class="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto pt-4">
          <div class="w-full">
            <div class="flex flex-col items-center relative">
              <div class="w-full  svelte-1l8159u">
                <div class="my-2 p-2 flex justify-between bg-white rounded svelte-1l8159u">
                  <div class="w-full gap-2 flex flex-auto py-1 flex-wrap">
                    {Object.keys(this.sortchips).map(item => (
                      <div title={`${item} is sorted in ${this.sortchips[item]} order`} class="flex justify-center items-center m-1 font-normal py-1 px-2 rounded-full text-blue-900 border border-blue-600 bg-gray-100">
                        {this.sortchips[item] === "asc" && <button onClick={() => this.togglesort(item)}>{sortAsc}</button>}
                        {this.sortchips[item] === "desc" && <button onClick={() => this.togglesort(item)}>{sortDesc}</button>}
                        <div class="text-xl font-normal ml-2 leading-none max-w-full flex-initial">{item}</div>
                        <div class="flex flex-auto flex-row-reverse">
                          <button onClick={() => this.removeSortChip(item)}>
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
                              class="feather feather-x cursor-pointer hover:text-red-500 rounded-full w-4 h-4 ml-2"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}

                    {Object.keys(this.searchChips).map(item => {
                      const key = Object.keys(this.searchChips[item])[0];
                      const value = this.searchChips[item][key];
                      return (
                        <div title={`${item} is searched by ${value} in ${key} pattern`} class="flex justify-center items-center m-1 font-normal py-1 px-2 rounded-full text-slate-900 border border-red-500	 bg-gray-100">
                          {<button >{search}</button>}
                          <div class="text-xl font-normal ml-2 leading-none max-w-full flex-initial">{item}</div>
                          {<span class="ml-2"><span class='text-xs'>by</span> {value}</span>}
                          {<span class="ml-2 text-xs text-green-700 font-bold">{key}</span>}
                          <div class="flex flex-auto flex-row-reverse">
                            <button onClick={() => this.removeSearchChip(item)}>
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
                                class="feather feather-x cursor-pointer hover:text-red-500 rounded-full w-4 h-4 ml-2"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      )
                    })}
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
