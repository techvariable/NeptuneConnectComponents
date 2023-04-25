import { Component, Host, h, State } from '@stencil/core';
import { jsonToCsv } from '../../../utils/utils';
import state from '../store';
import { CsvBuilder } from 'filefy';
import axios from 'axios';
import * as XLSX from 'xlsx';

@Component({
  tag: 'download-result-modal',
  styleUrl: 'download-result-modal.css',
  scoped: true,
})
export class DownloadResultModal {
  @State() value: string;
  @State() isModalOpen = false;
  @State() downloadOptions: string[] = ['all', 'current', 'custom'];
  @State() selectedDownloadOption: string = 'current';
  @State() node: string = '';
  @State() isDownloading: boolean = false;
  @State() downloadProgress: number = 0;
  @State() startingIndex: number = 0;
  @State() endingIndex: number = 50;
  @State() downloadError = null;
  @State() isCsv: boolean = true;
  @State() fileOptions: string[] = ['csv', 'xlsx'];
  @State() selectedFileOption: string = 'csv';

  componentWillLoad() {
    this.value = `${state.selectedNodeName ? state.selectedNodeName : 'CustomQuery'}_${+new Date()}`;
  }

  stringifyNodes(nodes: Array<{}>): any {
    const stringifiedNodes = nodes.map(node => {
      const keys = Object.keys(node);
      keys.forEach(key => {
        if (typeof node[key] === 'object') {
          node[key] = JSON.stringify(node[key]);
        }
      });
      return node;
    });
    return stringifiedNodes;
  }

  async downloadData() {
    try {
      let stringifiedData = this.stringifyNodes(state.nodes);
      this.isDownloading = true;
      this.downloadProgress = 0;

      if (this.selectedFileOption === 'xlsx') {
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(stringifiedData, {
          skipHeader: false,
        });
        XLSX.utils.book_append_sheet(workbook, sheet, `${this.value}.xlsx`);
        XLSX.writeFileXLSX(workbook, `${this.value}.xlsx`, {});
      } else {
        const csvData = jsonToCsv(stringifiedData);
        new CsvBuilder(this.value)
          .setColumns(csvData.columns)
          // @ts-expect-error
          .addRows([...csvData.data])
          .exportFile();
      }

      this.downloadProgress = 100;
      this.isDownloading = false;
      this.toggleModalState();
      this.clearFields();
    } catch (error) {
      console.log(error);
    }
  }

  async downloadDataAll() {
    try {
      let nodes: Array<any> = [];

      const pageSize = 50;
      const total = this.selectedDownloadOption === 'all' ? state.total : this.endingIndex - this.startingIndex;
      const progressStep = total / pageSize;

      if (total > 0) {
        this.isDownloading = true;
        this.downloadProgress = 0;
        for (let i = this.startingIndex; i < total + this.startingIndex; i += pageSize) {
          const res = await axios.post(`${state.hostUrl}/query/`, {
            query: state.query,
            parameters: {
              ...JSON.parse(state.queryParameter),
              paramPaginationLimit: Math.min(pageSize + i, this.selectedDownloadOption === 'all' ? total : this.endingIndex),
              paramPaginationOffset: +i,
            },
          });

          nodes = this.stringifyNodes(nodes.concat(res.data.result));

          if (this.downloadProgress + progressStep < 100) this.downloadProgress += 100 / progressStep;
        }

        this.downloadProgress = 100;

        if (this.selectedFileOption === 'xlsx') {
          const workbook = XLSX.utils.book_new();
          const sheet = XLSX.utils.json_to_sheet(nodes, {
            skipHeader: false,
          });
          XLSX.utils.book_append_sheet(workbook, sheet, `${this.value}.xlsx`);
          XLSX.writeFileXLSX(workbook, `${this.value}.xlsx`, {});
        } else {
          const csvData = jsonToCsv(nodes);
          new CsvBuilder(`${this.value}.csv`)
            .setColumns(csvData.columns)
            .addRows([...csvData.data])
            .exportFile();
        }

        this.isDownloading = false;
        this.toggleModalState();
        this.isModalOpen = false;
        this.clearFields();
      } else {
        this.downloadError = 'Starting Index should be smaller than End Index';
      }
    } catch (error) {
      this.downloadProgress = 100;
      this.isDownloading = false;
      console.log(error);
    }
  }

  clearHandler() {
    this.value = '';
  }

  clearFields() {
    this.value = `${state.selectedNodeName ? state.selectedNodeName : 'CustomQuery'}_${+new Date()}`;
    this.selectedDownloadOption = 'current';
    this.selectedFileOption = 'csv';
    this.startingIndex = 0;
    this.endingIndex = 50;
  }

  toggleModalState() {
    this.isModalOpen = !this.isModalOpen;
  }

  async submitHandler(e) {
    e.preventDefault();
    this.downloadError = null;
    if (['all', 'custom'].includes(this.selectedDownloadOption)) {
      await this.downloadDataAll();
    } else if (this.selectedDownloadOption === 'current') {
      this.downloadData();
    }
  }

  handleChange(event) {
    this.value = event.target.value;
  }
  handleChangeEndingIndex(event) {
    this.endingIndex = parseInt(event.target.value);
  }
  handleChangeStartingIndex(event) {
    this.startingIndex = parseInt(event.target.value);
  }

  radioSearchTypeHandler = event => {
    this.selectedDownloadOption = event.target.value;
  };
  radioFileTypeHandler = event => {
    this.selectedFileOption = event.target.value;
  };

  render() {
    return (
      <Host>
        {/* Modal Button */}
        <icon-button-basic
          title="Download Results"
          color="secondary"
          customClass="pb-2"
          size="md"
          clickHandler={() => this.toggleModalState()}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          }
        />

        {/* Main Modal */}
        {this.isModalOpen && (
          <form onSubmit={e => this.submitHandler(e)} class="pt-6 space-y-3">
            <div class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                      <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <div class="flex justify-between">
                          <h3 class="text-lg leading-6 font-semibold text-gray-600 my-2" id="modal-title">
                            Export Query Results
                          </h3>
                        </div>

                        <div class="mt-2">
                          <div class="mb-2">
                            <radio-button-multiple
                              clickHandler={this.radioFileTypeHandler}
                              labels={this.fileOptions}
                              disabledOptions={[]}
                              name="FileMethod"
                              label="File Type"
                              align="horizontal"
                              checked={this.selectedFileOption}
                            ></radio-button-multiple>
                          </div>
                          <div class="mb-2">
                            <radio-button-multiple
                              clickHandler={this.radioSearchTypeHandler}
                              labels={this.downloadOptions}
                              disabledOptions={state.selectedNodeName === null ? ['all', 'custom'] : []}
                              name="SearchMethod"
                              label="Options"
                              align="horizontal"
                              checked={this.selectedDownloadOption}
                            ></radio-button-multiple>
                          </div>
                          {this.selectedDownloadOption === 'all' ? (
                            <p style={{ marginBottom: '10px' }} class="px-3 py-2 bg-yellow-200 text-gray-800 border-l-4  w-full my-2">
                              You have selected all data export, based on the amount of the data present, it may take a while!{' '}
                            </p>
                          ) : null}

                          {this.selectedDownloadOption === 'custom' && (
                            <div>
                              <div>
                                <label class="block pb-2 font-medium text-gray-600" htmlFor="searchText">
                                  Starting Index
                                </label>
                                <input
                                  type="number"
                                  name="startingIndex"
                                  min={0}
                                  max={`${state.total}`}
                                  required
                                  placeholder="Enter Starting Index"
                                  class="mb-2 border active:border-2 outline-none px-2 p-2 rounded-md text-sm w-full"
                                  value={this.startingIndex}
                                  onInput={event => this.handleChangeStartingIndex(event)}
                                />
                              </div>
                              <div>
                                <label class="block pb-2 font-medium text-gray-600" htmlFor="searchText">
                                  Ending Index
                                </label>
                                <input
                                  type="number"
                                  name="endingIndex"
                                  min="0"
                                  max={`${state.total}`}
                                  required
                                  placeholder="Enter Ending Index"
                                  class="mb-2 border active:border-2 outline-none px-2 p-2 rounded-md text-sm w-full"
                                  value={this.endingIndex}
                                  onInput={event => this.handleChangeEndingIndex(event)}
                                />
                              </div>
                            </div>
                          )}

                          <div>
                            <label class="block pb-2 font-medium text-gray-600" htmlFor="searchText">
                              Enter File Name
                            </label>
                            <input
                              type="text"
                              name="searchText"
                              required
                              placeholder="Enter file name"
                              class="mb-2 border active:border-2 outline-none px-2 p-2 rounded-md text-sm w-full"
                              value={this.value}
                              onInput={event => this.handleChange(event)}
                            />
                          </div>
                        </div>
                        {this.downloadError ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full mt-4 mb-6">{this.downloadError}</p> : null}
                        {this.isDownloading && (
                          <div>
                            <div class="flex justify-between mb-1">
                              <span class="text-base font-medium text-blue-700">Downloading</span>
                              <span class="text-sm font-medium text-blue-700">{parseInt(this.downloadProgress.toString())}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                              <div class="bg-gray-500 h-4 rounded-full" style={{ width: `${this.downloadProgress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4">
                    <icon-label-submit-button
                      type="submit"
                      disabled={this.isDownloading}
                      color="tertiary"
                      loading={this.isDownloading}
                      endIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      }
                    >
                      Export
                    </icon-label-submit-button>
                    <icon-label-submit-button disabled={this.isDownloading} clickHandler={() => this.toggleModalState()} varient="outlined">
                      Cancel
                    </icon-label-submit-button>
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
