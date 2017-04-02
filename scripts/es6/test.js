import React from 'react';
class File extends React.Component {
  static b() {
    console.log('b');
  }

  set prop(value) {
    // return value;
    console.log(value);
  }

  get prop() {
    return value;
  }


  a() {
    console.log('ddd');
  }

  c = () => {

  }

}

let instance = new File();
let obj = Object.assign({},instance);

function c() {
  console.log('');
}