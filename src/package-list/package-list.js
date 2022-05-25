import React from 'react';
import untar from 'js-untar';
import Pako from 'pako';
import RepoParser from '../shared/repo-parser';

class PackageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [], loading: true };
  }

  componentDidMount() {
    fetch('https://tereius.github.io/arch-repo/x86_64/tereius.files.tar.gz')
      .then(res => res.arrayBuffer())
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 1000)))
      .then(buff => {
        const byteArray = Pako.inflate(buff);
        return untar(byteArray.buffer).progress(extractedFile => {
          if (extractedFile.name.endsWith('desc')) {
            const descr = RepoParser.parse(extractedFile.readAsString());
            this.setState(prevState => ({
              files: [...prevState.files, descr],
            }));
          }
        });
      })
      .then(extractedFiles => {
        // onSuccess
        console.info('finished');
        this.setState(() => ({
          loading: false,
        }));
      })
      .catch(err => {
        console.warn('errrrr ' + err.message);
        this.setState(() => ({
          loading: false,
        }));
      });
  }

  render() {
    const isLoading = this.state.loading;

    if (isLoading) {
      return <div>Loading</div>;
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Version</th>
              <th scope="col">Arch</th>
            </tr>
          </thead>
          <tbody>
            {this.state.files.map((item, index) => (
              <tr key={index}>
                <th scope="row">1</th>
                <td>{item.name}</td>
                <td>
                  <span className="badge badge-secondary">New</span>
                  <span className="badge badge-danger">{item.version}</span>
                </td>
                <td>{item.arch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export default PackageList;
