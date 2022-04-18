import { Component, h, State, Prop } from '@stencil/core';

const eyeOff = (
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

const eyeOn = (
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

@Component({
  tag: 'text-field',
  scoped: true,
})
export class TextField {
  @Prop() name: string;
  @Prop() addClass: string;
  @Prop() type: 'email' | 'password' | 'text' | 'search' = 'text';
  @Prop() placeholder: string;
  @Prop() onChange: any;
  @Prop() onClick: any;
  @Prop() eye: boolean;

  @State() showPassword: boolean = false;

  changeView() {
    this.showPassword = !this.showPassword;
  }

  render() {
    return (
      <div class="relative">
        <input
          type={this.showPassword ? 'text' : this.type}
          class={`appearance-none block  px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm w-full ${this.addClass} `}
          name={this.name}
          placeholder={this.placeholder}
          required
        />
        {this.type === 'password' && this.eye && (
          <div class="absolute z-10 inset-y-0 right-3 flex items-center text-indigo-500">
            <div class="cursor-pointer" onClick={() => this.changeView()}>
              {!this.showPassword ? eyeOff : eyeOn}
            </div>
          </div>
        )}
      </div>
    );
  }
}
