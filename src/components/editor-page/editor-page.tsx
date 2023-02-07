import { Component, h, Prop, State } from '@stencil/core';
import axios from 'axios';


@Component({
  tag: 'editor-page',
  scoped: true,
})
export class EditorPage {
  @Prop() nodeurl: string;
  @Prop() url: string;
  @State() navigators: string[] =[];
  @State() nodeData:{}[]=[];
  @State() doc:string = "\n\n\n\n";
  @State() docParameter:string = "\n\n\n\n"
  @State() response:{}[]=[];
  @State() headerList: {}[] = [];
  

  fetchNavigators =() =>{
    axios
    .get(this.nodeurl)
    .then((res: any) => {
      this.navigators = res.data.nodes;
    })
    .catch(err => {
      console.log(err);
    });
  };

  fetchData=(item)=>{
    axios
    .post(`http://localhost:3000/api/editor/query/builder/${item}`,
    {
      "limit": 10,
      "offset": 0,
      "order": {},
      "filter": {}
    })
    .then((res:any)=>{
      console.log("node data fetch",res);
      this.response=res.data.nodes;
      this.doc=res.data.query;
      this.docParameter = res.data.queryParameters;

      let allKeys = [];
      console.log("ESSSSS",this.response)
    this.response.map(obj => {
      let keys = Object.keys(obj);
      allKeys = [...new Set([...allKeys, ...keys])];
    });
    console.log("all keys", allKeys)
    this.headerList = [];
    allKeys.map(key=>{
      let obj = {};
      obj['title'] = key;
      obj["filter"] = {
          searchable: true,
          sortable: true,
      };
      obj["alias"] = key;
      obj["click"] = {
          clickable: false,
      };
      this.headerList.push(obj);
  })


    })
    .catch(err=>{
      console.log(err);
    })
  }

  render() {
   return(
    <div>
    <div class="w-auto flex justify-center gap-4 mt-4">
      <aside class="w-80" aria-label="Sidebar">
        <h2 class="pb-6 font-mono text-lg font-bold leading-7 text-gray-600">Nodes</h2>
        <node-item fetchNavigators={this.fetchNavigators} fetchData={this.fetchData} navigators={this.navigators}></node-item>
      </aside>
      <div class="w-96" style={{ width: '72.5rem' }}>
        <h2 class="pb-3 font-mono text-lg font-bold leading-7 text-gray-600">Write your Gremlin Query Here</h2>
        <code-editor-updated url={this.url} doc={this.doc} docParameter={this.docParameter} response={this.response} headerList={this.headerList}></code-editor-updated>
      </div>
    </div>
  </div>
   )
  }
}
