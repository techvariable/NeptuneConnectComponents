import { Component, h, State, Prop } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  tag: 'invite-component',
  scoped: true,
})
export class InviteComponent {
  @Prop() url: string;
  @Prop() apiurl: string;
  @Prop() email: string;
  @State() name: string;
  @State() password: string;
  @State() rePassword: string;
  @State() errorMessage: string = '';

  comparePassword(password, rePassword) {
    if (password === rePassword) {
      return true;
    }
    return false;
  }
  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    this.name = data.get('name').toString();
    this.password = data.get('password').toString();
    this.rePassword = data.get('confirmedPassword').toString();

    if (this.comparePassword(this.password, this.rePassword) === true) {
      axios
        .post(this.apiurl, {
          email: this.email,
          name: this.name,
          password: this.password,
        })
        .then(res => {
          if (res.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'User added successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
            axios.get(this.apiurl);
          }
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        });
    } else {
      this.errorMessage = 'Password does not match';
    }
  };

  render() {
    return (
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-8">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">Account Setup</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Please fill in the form below to continue signing up.</p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <form onSubmit={e => this.handleSubmit(e)} class="pt-6 space-y-3" action="/users" name="invite-form" method="post" enctype="multipart/form-data">
              <div class="flex flex-wrap -m-2">
                {this.errorMessage != '' ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full -mt-4 mb-6">{this.errorMessage}</p> : null}
                <div class="w-full pt-3">
                  <text-field name="name" type="text" placeholder="Enter name"></text-field>
                </div>
                <div class="pt-3 w-full">
                  <text-field name="password" type="password" placeholder="Enter password"></text-field>
                </div>
                <div class="pt-3 w-full">
                  <text-field name="confirmedPassword" type="password" placeholder="Confirm password"></text-field>
                </div>
                <div class="pt-3 w-full">
                  <plain-button width="full" type="contained">
                    register
                  </plain-button>
                </div>
                <div class="pt-8">
                  <p class="text-gray-500">
                    Already have an account!
                    <a href={this.url} class="text-indigo-500 font-semibold ml-3 hover:underline">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
