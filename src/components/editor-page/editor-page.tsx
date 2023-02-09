import axios from 'axios';
import { Component, h, Prop, State } from '@stencil/core';

import { formatJSON } from '../../utils/utils';


@Component({
  tag: 'editor-page',
  scoped: true,
})
export class EditorPage {
  @Prop() url: string;

  @State() selectedNodeName: string;
  @State() nodeList: string[] = [];
  @State() queryDocument: string = "\n\n\n\n";
  @State() parameterDocument: string = "\n\n\n\n"
  @State() nodeData: Array<{}> = [];
  @State() nodeDataColumns: {}[] = [];
  @State() errorMessage: string | null = null;
  @State() isLoading: boolean = false;

  fetchNavigators = () => {
    this.errorMessage = null;
    axios
      .get(`${this.url}/nodes`)
      .then((res: any) => {
        this.nodeList = res.data.nodes;
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchData = async (nodeName: string, offset? ,order?: { [index: string]: "asc" | "desc" }, filter?: any) => {
    this.errorMessage = null;
    this.isLoading = true;
    this.selectedNodeName = nodeName;
    try {
      const res = await axios.post(`${this.url}/query/builder/${nodeName}`, {
        limit: 10,
        offset: offset ? offset : 0,
        order: order ? order : {},
        filter: filter ? filter : {}
      });

      this.nodeData = res.data.nodes;
      this.queryDocument = res.data.query;
      this.parameterDocument = formatJSON(res.data.queryParameters);

      let allKeys = [];
      console.log("ESSSSS", this.nodeData)
      this.nodeData.map(obj => {
        let keys = Object.keys(obj);
        allKeys = [...new Set([...allKeys, ...keys])];
      });
      console.log("all keys", allKeys)
      this.nodeDataColumns = [];
      allKeys.forEach(key => {
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
        obj["type"] = null;

        this.nodeData.slice(0,5).forEach(dataObj=>{
          if(dataObj !== undefined && typeof(dataObj[key] !== null) ){
            obj["type"] = typeof(dataObj[key]);
          }
        })
        this.nodeDataColumns.push(obj);
      })
    } catch (error) {
      console.log({ error })
    }
    this.isLoading = false;
  }

  onClickRun = async (query: string, parameters: object) => {
    // console.log("urlllllllllllll",this.url);
    this.errorMessage = null;
    this.isLoading = true;
    try {
      const res = await axios.post(`${this.url}/query`, 
      {
        query,
        parameters
      }
      );

      this.nodeData = res.data.nodes;
      this.queryDocument = res.data.query;
      this.parameterDocument = formatJSON(res.data.queryParameters);

      let allKeys = [];
      console.log("ESSSSS", this.nodeData)
      this.nodeData.map(obj => {
        let keys = Object.keys(obj);
        allKeys = [...new Set([...allKeys, ...keys])];
      });
      console.log("all keys", allKeys)
      this.nodeDataColumns = [];
      allKeys.forEach(key => {
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
        obj["type"] = null;

        this.nodeData.slice(0,5).forEach(dataObj=>{
          if(dataObj !== undefined && typeof(dataObj[key] !== null) ){
            obj["type"] = typeof(dataObj[key]);
          }
        })
        this.nodeDataColumns.push(obj);
      })
    } catch (error) {
      console.log({ error })
    }
    this.isLoading = false;
    
  }

  onTableOperation = async (limit, offset, sort, filter) => {
    console.log("table operation...", { limit, offset, sort, filter });

    // await this.fetchData(this.selectedNodeName,offset ,sort, filter)
  }

  render() {
    return (
      <div>
        <div class="w-auto flex justify-center gap-4 mt-4">
          <aside class="w-80" aria-label="Sidebar">
            <h2 class="pb-6 font-mono text-lg font-bold leading-7 text-gray-600">Nodes</h2>
            <node-item fetchNavigators={this.fetchNavigators} fetchData={this.fetchData} nodeList={this.nodeList}></node-item>
          </aside>
          <div class="w-96" style={{ width: '72.5rem' }}>
            <h2 class="pb-3 font-mono text-lg font-bold leading-7 text-gray-600">Write your Gremlin Query Here</h2>
            <code-editor-updated
              queryDocument={this.queryDocument}
              parameterDocument={this.parameterDocument}
              errorMessage={this.errorMessage}
              isLoading={this.isLoading}
              onClickRun={this.onClickRun}
            ></code-editor-updated>

            {this.nodeData.length > 0 && !this.isLoading && <editor-res-updated
              onTableOperation= {(limit, offset, sort , filter) => this.onTableOperation(limit, offset, sort, filter)}
              nodeData={this.nodeData}
              headerList={this.nodeDataColumns}></editor-res-updated>}
          </div>
        </div>
      </div>
    )
  }
}
