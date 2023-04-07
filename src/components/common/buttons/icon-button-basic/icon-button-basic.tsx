import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'icon-button-basic',
  styleUrl: 'icon-button-basic.css',
  scoped: true,
})
export class IconButtonBasic {
  @Prop() customClass = '';
  @Prop() width: 'full' | 'auto' = 'auto';
  @Prop() clickHandler: any;
  @Prop() disabled = false;
  @Prop() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Prop() size: 'lg' | 'md' | 'sm' = 'sm';
  @Prop() loading: boolean = false;
  @Prop() title: string | null = null;
  @Prop() type: 'button' | 'submit' = 'button';
  @Prop() icon: any;

  colorClasses = {
    primary: 'gray',
    secondary: 'indigo',
    tertiary: 'blue',
  };
  sizeClasses = {
    sm: 'py-2 px-4  rounded-md',
    md: 'py-2 px-4 rounded-md',
    lg: 'py-3 px-5 rounded-lg',
  };

  svgSize = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-7 w-7',
  };

  render() {
    return (
      <button
        class={`flex border border-transparent ${this.sizeClasses[this.size]}  text-${this.colorClasses[this.color]}-600 hover:text-${
          this.colorClasses[this.color]
        }-800 justify-center w-${this.width} ${this.customClass} cursor-pointer disabled:cursor-default disabled:text-${this.colorClasses[this.color]}-400 `}
        title={this.title}
        onClick={this.clickHandler}
        disabled={this.disabled || this.loading}
        type={this.type}
      >
        {!this.loading && this.icon}
        {this.loading && (
          <span class="animate-spin ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={this.svgSize[this.size]}>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </span>
        )}
      </button>
    );
  }
}
