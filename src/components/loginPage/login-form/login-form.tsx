import { Component, Host, Prop, h } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'login-form',
  styleUrl: 'login-form.css',
  scoped: true,
})
export class LoginForm {
  @Prop() error: string = ''
  @Prop() mode: string = 'demo'
  @Prop() url: string = ''
  @Prop() email: string = ''
  @Prop() password: string = ''

  componentWillLoad() {
    if (this.mode === 'demo') {
      this.autoSubmitter()
    }
  }

  async autoSubmitter() {
    // document.forms["loginForm"].submit();
    try {
      await axios.post(this.url, {
        email: this.email,
        password: this.password
      })
      // location.assign('/')
    } catch (error) {
      throw Error("Form could not be submitted")
    }
  }

  render() {
    return (
      <Host>
        <form class="space-y-2" action="/login" name="loginForm" method="post">
          {this.error && <p class="flex items-center justify-center pb-2 text-red-600 text-center font-semibold">
            <svg
              aria-hidden="true"
              class="mx-2 w-5 h-5 text-gray-800 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Username or password is wrong!!!
          </p>}
          <text-field name="email" type="email" placeholder="email"></text-field>

          <div class="mt-1 relative rounded-md shadow-sm">
            <text-field
              name="password"
              type="password"
              placeholder="password"
              eye={true}
            ></text-field>
          </div>

          <div>
            <plain-button width="full" type="contained"> submit </plain-button>
          </div>
          <div class="pt-2 flex flex-row-reverse">
            <a href="/users/forgot" class="text-indigo-500 font-semibold hover:underline">
              Forgot Password
            </a>
          </div>
        </form>
      </Host>
    );
  }

}
