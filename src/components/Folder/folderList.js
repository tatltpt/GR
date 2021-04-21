import { Tree } from 'antd';
import React from "react";
import 'antd/dist/antd.css';
import '../folder/folderList.css';
import axios from 'axios';

class FolderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {treeData: [], rawFolderList: [], selectedFolder: {}};

    this.onSelect = this.onSelect.bind(this);
    this.onLoadData = this.onLoadData.bind(this);
    this.getFolderList = this.getFolderList.bind(this);
    this.buildFolderTree = this.buildFolderTree.bind(this);
    this.buildChildTree = this.buildChildTree.bind(this);
  }

  onLoadData = treeNode => {
    return new Promise(resolve => {
      if (treeNode.children && treeNode.isLeaf) {
        resolve();
        return;
      }
      setTimeout(() => {
        axios.get('http://localhost:5001/api/folders/' + treeNode._id)
        .then(result => {
          this.buildChildTree(result.data, treeNode);
          resolve();
        }).catch(error => console.log(error)); 
      }, 1000);
    });
  }

  onSelect = (selectedKeys, info) => {
    //console.log('selected', selectedKeys, info);
    this.getChildFolderList(info.node); 
  }

  getFolderList = () => {
    axios.get('http://localhost:5001/api/folders')
    .then(result => {
      this.buildFolderTree(result.data);
    }).catch(error => console.log(error));
  }

  getChildFolderList = (selectedFolder) => {
    axios.get('http://localhost:5001/api/folders/' + selectedFolder._id)
    .then(result => {
      this.buildChildTree(result.data, selectedFolder);
    }).catch(error => console.log(error));
  }

  buildFolderTree = (rawList) => {
    var rootFolders = [];
    rawList.map(item => {
      if(item.isRoot !== undefined && item.isRoot) {
        rootFolders.push({...JSON.parse(JSON.stringify(item))});
      }
    });
    this.setState({treeData: rootFolders});
  }

  buildChildTree = (rawList, selectedFolder) => {
    var childFolders = [];
    rawList.map(item => {
        childFolders.push({...JSON.parse(JSON.stringify(item))});
    });
    var newFolderTree = this.state.treeData;
    for(var i in newFolderTree) {
      if(newFolderTree[i]._id === selectedFolder._id) {
        newFolderTree[i].children = childFolders;
      }
    }
    if(JSON.stringify(this.state.treeData) === JSON.stringify(newFolderTree)) {
      for(var i in newFolderTree) {
        this.updateChildrens(newFolderTree[i],selectedFolder,childFolders);
      }
    }
    this.setState({treeData: newFolderTree});
  }

  updateChildrens = (treeNode, selectedFolder, childFolders) => {
    if(treeNode._id === selectedFolder._id) {
      treeNode.children = childFolders;
      return;
    }
    if(treeNode.children !== undefined && treeNode.children.length > 0) {
      for(var i in treeNode.children) {
        this.updateChildrens(treeNode.children[i], selectedFolder, childFolders);
      }
    }
  }

  componentDidUpdate() {
    console.log(this.state.treeData);
  }

  componentDidMount() {
    //call api
    this.getFolderList();
  }

  render() {
    return (
      <Tree
        className="my-tree"
        loadData={this.onLoadData}
        //onExpand={this.onSelect}
        treeData={this.state.treeData}
      />
    )
  }
}

export default FolderList;