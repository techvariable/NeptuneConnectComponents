import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'main-component',
  scoped: true,
})
export class MainComponent {
  render() {
    return (
      <Host>
        <table-wrapper url="http://localhost:4000/unassignedPatient" rowPerPage={[50, 10, 20, 30].sort((a, b) => a - b)}></table-wrapper>
        {/* <table-wrapper url="https://jsonplaceholder.typicode.com/albums"></table-wrapper> */}
        {/* <table-wrapper url="https://jsonplaceholder.typicode.com/users"></table-wrapper> */}
      </Host>
    );
  }
}
