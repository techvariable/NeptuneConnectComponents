import { Component, h, Prop } from '@stencil/core';
import 'choicesjs-stencil/dist/choicesjsstencil';
// import Swal from 'sweetalert2';
import Choices from 'choices.js';

// import axios from 'axios';

(window as any).Choices = Choices;


@Component({
  tag: 'multi-select',
  shadow: true,
})
export class MultiSelect {
  private choicesRef;

  // @Prop() userId: number = 0;
  @Prop() roles;
  @Prop() url: string;
  @Prop() submiturl:string="";
  @Prop() handleselect:any;
  @Prop() items:string[];
  @Prop() value: string;
  @Prop() toggle: () => void;
  @Prop() userid:number;

  openDropDown() {
    this.choicesRef.showDropdown(false);
  }
  handleSubmit(e) {
    e.preventDefault();
    // console.log("Form event==================>",e,"<==============end");
    // console.log(e.path);
    console.log(e.path[0]);
    console.log(e.path[0].value);
    console.log(e.formData);


    // @ts-ignore
    window.stupid_dristi = e;
    
    
    

    // axios
    //   .post(this.submiturl, {
    //     id: this.userid,
    //   })
    //   .then(res => {
    //     if (res.status === 200) {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'success',
    //         text: 'Invitation sent successfully!',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Something went wrong!',
    //     });
    //   });

    // this.value = '';
    // this.toggle();
  }


  componentWillLoad(){
    console.log("selected roles",this.items);
    
    console.log('Calling Roles');


    //  // axios call
    //  axios
    //  .post(this.url, {
    //    userId:this.userId,
    //    roles:this.roles,
    //  })
    //  .then((res: any) => {
    //    this.responseLabel = 'result';
    //    this.isLoading = false;
    //    this.doc = JSON.parse(res.data.permissions);
    //  })
    //  .catch(err => console.log(err));
  }

  render() {
    return (
      <div class="w-96">
        <form onSubmit={e => this.handleSubmit(e)} class="pt-10 space-y-3" action="submit">
        <choicesjs-stencil
          // onInput={(e)=>this.handleselect(e)}
          // onChange={(e)=>this.handleselect(e)}
          onChange={(e)=>this.handleselect(e)}
          placeholderValue="Roles"
          items={this.items}
          choices={this.roles}
          name="roles"
          type="multiple"
          searchFields={['label', 'value']}
          key={'label'}
          itemScope={true}
          searchEnabled={true}
          searchChoices={true}
          renderChoiceLimit={-1}
          searchFloor={1}
          position={'auto'}
          renderSelectedChoices={'auto'}
          silent={false}
          searchResultLimit={4}
          addItems="true"
          addItemText={value => {
            return `Press Enter to add <b>"${value}"</b>`;
          }}
          maxItemText={maxItemCount => {
            return `Only ${maxItemCount} values can be added`;
          }}
          valueComparer={(value1, value2) => {
            return value1 === value2;
          }}
          sorter={(a, b) => {
            return a.label.localeCompare(b.label);
          }}
          addItemFilter={value => {
            return /^[^\s]+$/.test(value);
          }}
          removeItems={true}
          ref={el => (this.choicesRef = el)}
          onClick={() => this.openDropDown()}
        ></choicesjs-stencil>
        <button>Submit</button>
        </form>
        {/* <choicesjs-stencil
          // onInput={(e)=>this.handleselect(e)}
          // onChange={(e)=>this.handleselect(e)}
          onChange={(e)=>this.handleselect(e)}
          placeholderValue="Roles"
          items={this.items}
          choices={this.roles}
          name="roles"
          type="multiple"
          searchFields={['label', 'value']}
          key={'label'}
          itemScope={true}
          searchEnabled={true}
          searchChoices={true}
          renderChoiceLimit={-1}
          searchFloor={1}
          position={'auto'}
          renderSelectedChoices={'auto'}
          silent={false}
          searchResultLimit={4}
          addItems="true"
          addItemText={value => {
            return `Press Enter to add <b>"${value}"</b>`;
          }}
          maxItemText={maxItemCount => {
            return `Only ${maxItemCount} values can be added`;
          }}
          valueComparer={(value1, value2) => {
            return value1 === value2;
          }}
          sorter={(a, b) => {
            return a.label.localeCompare(b.label);
          }}
          addItemFilter={value => {
            return /^[^\s]+$/.test(value);
          }}
          removeItems={true}
          ref={el => (this.choicesRef = el)}
          onClick={() => this.openDropDown()}
        ></choicesjs-stencil> */}
      </div>
    );
  }
}
