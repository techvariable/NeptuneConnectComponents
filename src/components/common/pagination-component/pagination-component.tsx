import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'pagination-component',
  styleUrl: 'pagination-component.css',
  scoped: true,
})
export class PaginationComponent {
  @Prop() url: string;
  @Prop() totalData: number;
  @Prop() limit: number;
  @Prop() offset: number;
  @Prop() nextHandler: Function;
  @Prop() prevHandler: Function;
  @Prop() jumpPageHandler: Function;
  @Prop() loading: true | false;

  render() {
    let pages = [];
    for (let i = 1; i <= Math.ceil(this.totalData / this.limit); i++) {
      pages.push(
        <li>
          <button
            onClick={() => this.jumpPageHandler(i)}
            disabled={this.loading || Math.ceil((this.offset + 1) / this.limit) === i}
            class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {i}
          </button>
        </li>,
      );
    }
    return (
      <Host>
        <nav aria-label="Page navigation example">
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => this.prevHandler()}
                disabled={this.loading || this.offset < 1}
                class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg disabled:hover:bg-gray-100 disabled:hover:text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-default"
              >
                <span class="sr-only">Previous</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            {pages}
            <li>
              <button
                onClick={() => this.nextHandler()}
                disabled={this.loading || this.totalData - this.limit < this.offset}
                class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:hover:bg-gray-100 disabled:hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-default"
              >
                <span class="sr-only">Next</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </Host>
    );
  }
}
