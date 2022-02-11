import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'sign-in',
  // styleUrl: 'sign-in.css',
  scoped: true,
})
export class SignIn {
  @State() showPassword: boolean = false;

  changeView() {
    this.showPassword = !this.showPassword;
  }

  render() {
    return (
      <section class="min-h-screen flex items-center justify-center py-12 px-4">
        <div class="max-w-sm w-full space-y-8">
          <div>
            <div class="flex justify-center ">
              <img class="h-24" src="https://cdn-icons.flaticon.com/png/512/5551/premium/5551395.png?token=exp=1644517554~hmac=e8ed18e574e0ec566ad6569fb3f88405" alt="" />
            </div>

            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-700 font-serif">Welcome Back</h2>
            <p class="mt-2 text-center text-gray-400 font-sans">Enter your credentials to access your acount</p>
          </div>

          <form class="pt-6 space-y-3">
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="off"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm"
              placeholder="Email address"
            />

            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type={this.showPassword ? 'text' : 'password'}
                autocomplete="off"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm"
                placeholder="Password"
              />
              <div class="absolute inset-y-0 right-3 flex items-center text-indigo-500">
                <div class="cursor-pointer" onClick={() => this.changeView()}>
                  {!this.showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </section>
    );
  }
}
