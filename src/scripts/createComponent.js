const fs = require('fs');
const path = require('path');

let args = process.argv;
let name;
let jsFile;


const createFunc = (name) => {
  return `import React from 'react';
import './${name}.css';
//import propTypes from 'prop-types';
import { connect } from 'react-redux';

const ${name} = () => {

  return (
    <div className="${name}">

    </div>
  )
}

// ${name}.propTypes = {}

`
}

const createClass = (name) => {
  return `import React, {Component} from 'react';
import './${name}.css';
//import propTypes from 'prop-types';
import { connect } from 'react-redux';

class ${name} extends Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className="${name}">

      </div>
    )
  }
}

//${name}.propTypes = {}

`
}

const addRedux = (name) => {
  return `const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(${name});
`
}

const destinationDirectory = path.join(__dirname, '../components')

if (args.includes("-n")){
  name = args[args.indexOf("-n") + 1]
  if (!fs.existsSync('./components/' + name)){
    if (args.includes("-f")){
      jsFile = createFunc(name);
    } else {
      jsFile = createClass(name);
    }
    if (args.includes("-r")){
      jsFile += addRedux(name);
    } else {
      jsFile += `export default ${name};`
    }
    fs.mkdirSync(path.join(destinationDirectory, name));
    fs.writeFileSync(path.join(destinationDirectory, name, `${name}.js`), jsFile);
    fs.writeFileSync(path.join(destinationDirectory, name, `${name}.css`), `.${name} {\n\n}\n`);
    require('./buildIndex.js')
  } else {
    console.log('ERROR: A component with that name already exists')
  }
} else {
  console.log("ERROR: No Name Given for Component. Please supply a name using the -n flag")
}
