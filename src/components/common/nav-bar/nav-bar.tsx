import { Component, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  scoped: true,
})
export class NavBar {
  @Prop() stringifieduser: string;
  @State() isAvatarDropDownOpen: boolean = false;
  @State() userDetails: Object;

  avatarOpenClass = {
    true: ``,
    false: `hidden`,
  };

  avatarDropDownHandler() {
    this.isAvatarDropDownOpen = !this.isAvatarDropDownOpen;
  }
  componentWillLoad() {
    this.userDetails = JSON.parse(this.stringifieduser);
  }

  render() {
    return (
      <div class="container mx-auto">
        <nav class="sticky top-0 pt-6 pb-8 bg-white border-b">
          <div>
            <div class="flex flex-wrap justify-between items-center mx-auto bg-white">
              <a href="/" class="text-lg text-gray-800">
                Neptune Connect
              </a>

              <div class="block w-64">
                <ul class="flex items-center justify-between flex-grow">
                  <li>
                    <a
                      title="editor"
                      class="hover:animate-pulse block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                      href="/"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a title="users" class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" href="/users">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <div>
                      <button
                        id="dropdownAvatarNameButton"
                        data-dropdown-toggle="dropdownAvatarName"
                        class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 ring-4 ring-gray-100 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-white"
                        type="button"
                        onClick={() => this.avatarDropDownHandler()}
                      >
                        <span class="sr-only">Open user menu</span>
                        <div class="w-8 h-8 mr-2 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                          <span class="w-4 truncate">{this.userDetails['name'].charAt(0)}</span>
                        </div>
                        <div class="w-24 truncate">{this.userDetails['name'].split(' ')[0]}</div>
                        <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>

                      {/* <!-- Dropdown menu --> */}
                      <div
                        id="dropdownAvatarName"
                        class={`absolute my-2 z-30 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                          this.avatarOpenClass[`${this.isAvatarDropDownOpen}`]
                        }`}
                      >
                        <a href="/settings/myprofile" class="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div class="font-medium truncate">{this.userDetails['name']}</div>
                            <div class="truncate">{this.userDetails['email']}</div>
                          </div>
                        </a>
                        <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                          <li>
                            <a href="/settings" class="flex justify-between px-4 py-2 hover:bg-gray-100">
                              <div>Settings</div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                  />
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                            </a>
                          </li>
                        </ul>
                        <div class="px-4 py-2">
                          <form action="/logout" name="logout-form" method="post">
                            <button
                              title="log out"
                              type="submit"
                              class="w-full flex justify-between py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                              <div>Sign Out</div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  />
                                </svg>
                              </div>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
