import { Component, Host, h, State, Prop } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'editor-res',
  scoped: true,
})
export class EditorRes {
//   @State() component: boolean = false;
  @Prop() headerList:any;
  @State() result:any=[];

  async api(limit: number, page: number, sortObj: any, search: any) {
    let filterPar = '';

    console.log('Front end parameters:', limit, page, sortObj, search);
    if (limit) {
      filterPar += `limit=${limit}`;
    }

    if (page) {
      filterPar += `&offset=${(page - 1) * limit}`;
    }

    if (sortObj && Object.keys(sortObj).length !== 0) {
      const { id, dir } = sortObj;
      let arr: string[] = id.split('_');
      let sortString = arr[0];
      for (let item of arr) {
        if (item !== arr[0]) {
          sortString += item.charAt(0).toUpperCase() + item.slice(1);
        }
      }
      filterPar += `&sort=${sortString}&order=${dir}`;
    }

    if (search) {
     
      for (let key in search) {
        filterPar = filterPar + `&filter_${key}=${search[key]}`;
      }
    }
    // console.log(filterPar);
    // const result = await axios.get(`/api/query-logs?${filterPar}`);

    // const result = await axios.get(`http://localhost:3000/api/query-logs?${filterPar}`);
    await axios
    .post("http://ec2-54-221-111-75.compute-1.amazonaws.com:5000/query", {
      query:'g.V().hasLabel("Provider").limit(10).valueMap()',
      apiKey: 'ETW5KJQ-PDT48MP-H0WVAC4-WQWHEK3',
    })
    .then((res: any) => {
    console.log(res);
    this.result = res;
    //   this.response = Object.values(res.data)[1];
    //   this.responseLabel = Object.keys(res.data)[1];
    //   this.isLoading = false;
    })
    .catch(err => console.log(err));
    // const result = await axios.get(`http://ec2-54-221-111-75.compute-1.amazonaws.com:5000/query`);
    // console.log("Result",this.result);
    // console.log("result headers",this.result.headers);
    return {
      total: this.result.headers['x-total-count'],
      data: this.result.data,
    };
  }

  render() {
    return (
      <Host>
        <table-wrapper-updated api={this.api} autocompute={false} headerList={this.headerList} rowPerPage={[50, 10, 20, 30]}></table-wrapper-updated>
      </Host>
    );
  }
}
