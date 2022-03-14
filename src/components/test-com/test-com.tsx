import { Component, Host, h, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'test-com',
  shadow: true,
})
export class TestCom {
  @State() users: object[];
  @State() isLoading = true;

  componentWillLoad() {
    axios.get('http://localhost:4000/unassignedPatient?_limit=10').then(res => {
      this.users = res.data;
      console.log('users');
      console.log(this.users);
      this.isLoading = false;
    });
  }

  render() {
    if (this.isLoading) return <p>loading...</p>;

    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
