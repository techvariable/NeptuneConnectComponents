import { Component, h, Prop } from '@stencil/core';
import 'choicesjs-stencil/dist/choicesjsstencil';
import Choices from 'choices.js';

// import axios from 'axios';

(window as any).Choices = Choices;


@Component({
  tag: 'multi-select',
  shadow: true,
})
export class MultiSelect {
  private choicesRef;

  @Prop() userId: number = 0;
  @Prop() roles;
  @Prop() url: string;

  openDropDown() {
    this.choicesRef.showDropdown(false);
  }

  componentWillLoad(){
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
        <choicesjs-stencil
          placeholderValue="Roles"
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
      </div>
    );
  }
}
