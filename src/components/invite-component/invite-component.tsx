import { Component, h, State, Prop } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  tag: 'invite-component',
  scoped: true,
})
export class InviteComponent {
  @Prop() url: string;
  @State() name: string;
  @State() password: string;
  @State() rePassword: string;
  @State() errorMessage: string = '';

  comparePassword(password, rePassword) {
    if (password === rePassword) {
      return true;
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    this.comparePassword(this.password, this.rePassword) &&
      axios
        .get('https://dummyjson.com/products/1')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    axios
      .post('/users/invite', {
        email: this.name,
      })
      .then(res => {
        console.log('Same password');

        if (res.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Invitation sent successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
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

    // this.value = '';
    // this.toggleModalState();
  }

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
                if ({this.errorMessage != ''}) <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full -mt-4 mb-6">{this.errorMessage}</p>
                <div class="w-full font-medium">
                  <input name="email" type="email" value="<%= email %>" class="font-medium bg-white text-indigo-600 text-center w-full hidden" />
                </div>
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
