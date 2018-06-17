import React from 'react';

export default class Brain extends React.Component {
  state = {
    files: [],
    message: '',
  };
  addToFiles(id) {
    if (this.state.files.indexOf(id) !== -1) {
      this.removeFile(id);
      return;
    }
    this.setState(state => ({
      ...state,
      files: [...state.files, id],
    }));
  }
  removeFile(id) {
    const pos = this.state.files.indexOf(id);
    this.setState(state => ({
      ...state,
      files: [...state.files.slice(0, pos), ...state.files.slice(pos + 1)],
    }));
  }
  addAll() {
    const files = this.props.files.map((f, id) => id);
    this.setState(state => ({
      ...state,
      files: [...files],
    }));
  }
  undo() {
    const files = [...this.state.files];
    files.pop();
    this.setState(state => ({
      ...state,
      files: [...files],
    }));
  }
  removeAll() {
    this.setState(state => ({
      ...state,
      files: [],
    }));
  }
  deleteNMs() {
    const files = this.state.files.map(id => ({
      size: `${this.props.files[id][1]} ${this.props.files[id][2]}`,
      dir: `${this.props.files[id][3]}/*`,
    }));
    fetch('/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ files }),
    })
      .then(res => res.text())
      .then(message => this.setState(state => ({ ...state, message })));
  }
  getValues() {
    const addToFiles = this.addToFiles.bind(this);
    const addAll = this.addAll.bind(this);
    const removeAll = this.removeAll.bind(this);
    const undo = this.undo.bind(this);
    const deleteNMs = this.deleteNMs.bind(this);
    return {
      sfiles: this.state.files,
      message: this.state.message,
      addToFiles,
      addAll,
      removeAll,
      undo,
      deleteNMs,
    };
  }
  render() {
    return this.props.children(this.getValues());
  }
}
