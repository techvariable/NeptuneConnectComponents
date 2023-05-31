import { Component, h, State, Prop } from '@stencil/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  tag: 'reset-component',
  scoped: true,
})
export class ResetComponent {
  @Prop() url: string;
  @Prop() apiurl: string;
  @Prop() email: string;
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
    this.errorMessage = '';
    e.preventDefault();
    const data = new FormData(e.target);
    this.password = data.get('password').toString();
    this.rePassword = data.get('confirmedPassword').toString();

    if (this.password.length < 7) {
      this.errorMessage = 'Password length is less than 7 characters';
    } else if (!this.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      this.errorMessage = 'Password does not contain any special character';
    } else {
      if (this.comparePassword(this.password, this.rePassword) === true) {
        axios
          .put(this.apiurl, {
            email: this.email,
            password: this.password,
          })
          .then(res => {
            if (res.status === 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Password changed successfully!',
                showConfirmButton: false,
                timer: 1500,
              });
              window.location.assign(this.url);
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
    }
  };

  render() {
    return (
      <section class="text-gray-600 body-font relative">
        <div class="w-full px-5 py-14 mx-auto">
          <div class="flex flex-col text-center w-full mb-8">
            <h1 class="sm:text-2xl font-semibold title-font text-gray-600">Update Password</h1>
            <p class="w-96 mx-auto leading-relaxed text-base">Please fill in the form below to continue signing up.</p>
          </div>
          <div class="w-96 mx-auto">
            <form onSubmit={e => this.handleSubmit(e)} class="space-y-3" action="/users" name="invite-form" method="post" enctype="multipart/form-data">
              <div class="flex flex-wrap -m-2">
                {this.errorMessage != '' ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full -mt-4 mb-6">{this.errorMessage}</p> : null}
                <div class="pt-3 w-full">
                  <text-field name="password" type="password" placeholder="Enter password"></text-field>
                </div>
                <div class="pt-3 w-full">
                  <text-field name="confirmedPassword" type="password" placeholder="Confirm password"></text-field>
                </div>
                <div class="pt-3 w-full">
                  <plain-button width="full" type="contained">
                    update
                  </plain-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
