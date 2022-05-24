import React from 'react';
import untar from 'js-untar';
import Pako from 'pako';

class PackageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  componentDidMount() {
    fetch('https://tereius.github.io/arch-repo/x86_64/tereius.files.tar.gz')
      .then(res => res.arrayBuffer())
      .then(buff => {
        const byteArray = Pako.inflate(buff);
        return untar(byteArray.buffer).progress(extractedFile => {
          if (extractedFile.name.endsWith('desc')) {
            this.setState(prevState => ({
              files: [...prevState.files, extractedFile],
            }));
          }
        });
      })
      .then(function (extractedFiles) {
        // onSuccess
        console.info('finished');
      })
      .catch(err => {
        console.warn('errrrr ' + err.message);
      });
  }

  render() {
    return (
      <ul>
        {this.state.files.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    );
  }
}

export default PackageList;
