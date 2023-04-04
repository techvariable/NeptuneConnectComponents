import { Component, Host, h, State } from '@stencil/core';
import state from '../store';

@Component({
  tag: 'insert-node-modal',
  styleUrl: 'insert-node-modal.css',
  scoped: true,
})
export class InsertNodeModal {
  @State() value: string;
  @State() isModalOpen = false;

  @State() downloadError = null;
  @State() addNodeState = [{ property: '', value: '', valueType: '' }];
  @State() customDropDownValue: '';
  @State() nodes: [{ label: string; selected: boolean }] = [{ label: '', selected: false }];
  @State() valueOptions = [
    { label: 'String', selected: true },
    { label: 'Number', selected: false },
  ];
  @State() propSelectedOptionLabel: string = 'String';

  nodeMapper() {
    const nodes = state.availableNodes.map(node => {
      return {
        label: node,
        selected: false,
      };
    });
    return nodes;
  }

  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;
  }

  async submitHandler(e) {
    e.preventDefault();
  }

  handleChange(event, key, index) {
    if (key === 'value') {
      this.propSelectedOptionLabel = /^-?\d+\.?\d*$/.test(event.target.value) ? 'Number' : 'String';
    }
    this.addNodeState[index][key] = event.target.value;
  }
  onAddNode() {
    const currentNodes = [...this.addNodeState];
    let node = {
      property: '',
      value: '',
      valueType: '',
    };
    currentNodes.push(node);
    this.addNodeState = currentNodes;
  }
  removeNodeHandler(index) {
    this.addNodeState = [...this.addNodeState].filter((_, idx) => idx !== index);
  }
  handleCustomSelect(value) {
    this.customDropDownValue = value;
  }
  optionHandler(index, selectedLabel) {
    this.addNodeState[index]['valueType'] = selectedLabel;
  }

  handleSubmit() {
    if (this.customDropDownValue !== '') {
      const properties: { [key: string]: string | number } = {};
      this.addNodeState.forEach(node => {
        switch (node.valueType) {
          case 'String':
            properties[node.property] = node.value;
            break;
          case 'Number':
            properties[node.property] = parseFloat(node.value);
            break;
          default:
            properties[node.property] = node.value;
            break;
        }
      });

      state.queryMode = 'insert';
      state.insertNodeLabel = this.customDropDownValue;
      state.insertProperties = properties;

      state.refreshData();
    }
  }

  render() {
    return (
      <Host>
        {/* Modal Button */}
        <button class="hover:animate-pulse hover:text-blue-700" title="Add Node" onClick={() => this.toggleModalState()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>

        {/* Main Modal */}
        {this.isModalOpen && (
          <form onSubmit={e => this.submitHandler(e)} class=" space-y-3">
            <div class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                      <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <div class="flex justify-between">
                          <h3 class="text-lg leading-6 font-semibold text-gray-600 my-2 pb-3" id="modal-title">
                            Add Node
                          </h3>
                        </div>
                        <custom-drop-down class="py-4" selectHandler={value => this.handleCustomSelect(value)} optionListProp={this.nodeMapper()}></custom-drop-down>
                        <div class="max-h-60 overflow-auto">
                          {this.addNodeState.map((_node, index) => {
                            return (
                              <div class="mt-2 flex gap-4">
                                <div>
                                  <label class="block pb-2 font-medium text-gray-600" htmlFor="searchText">
                                    Property
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    name={`property_${index}`}
                                    placeholder="Enter file name"
                                    class="mb-2 border active:border-2 outline-none px-2 py-2 rounded-md text-sm w-full"
                                    value={this.addNodeState[index]['property']}
                                    onInput={event => this.handleChange(event, 'property', index)}
                                  />
                                </div>
                                <div>
                                  <label class="block pb-2 font-medium text-gray-600" htmlFor="searchText">
                                    Value
                                  </label>
                                  <input
                                    type="text"
                                    name={`value_${index}`}
                                    required
                                    placeholder="Enter file name"
                                    class="mb-2 border active:border-2 outline-none px-2 p-2 rounded-md text-sm w-full"
                                    value={this.addNodeState[index]['value']}
                                    onInput={event => this.handleChange(event, 'value', index)}
                                  />
                                </div>
                                <div class="w-56 h-5 align-middle">
                                  <label class="block pb-2 font-medium text-gray-600" htmlFor="valueType">
                                    Value Type
                                  </label>
                                  <basic-dropdown
                                    label="Select:"
                                    propOptions={this.valueOptions}
                                    propSelectedOptionLabel={this.propSelectedOptionLabel}
                                    optionHandler={selectedLabel => this.optionHandler(index, selectedLabel)}
                                    class="w-40"
                                    id="valueType"
                                  ></basic-dropdown>
                                </div>
                                <div class="align-middle">
                                  <label class="block pb-2 font-medium text-gray-600" htmlFor="valueType">
                                    <span class="mb-4">Remove</span>
                                  </label>
                                  <button
                                    disabled={this.addNodeState.length <= 1}
                                    type="button"
                                    onClick={() => this.removeNodeHandler(index)}
                                    class="mt-1 mx-3 disabled:text-gray-200"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          onClick={() => this.onAddNode()}
                          class="flex gap-4 justify-center align-middle border bg-gray-100 border-gray-200 rounded-md my-6 p-2 cursor-pointer hover:bg-gray-200 hover:border-gray-300"
                        >
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-8 h-8 ">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span class="pt-1">Add Node</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      onClick={() => this.handleSubmit()}
                      class="w-full gap-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white disabled:bg-gray-200 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => this.toggleModalState()}
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Host>
    );
  }
}
