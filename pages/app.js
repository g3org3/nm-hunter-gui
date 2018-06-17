import 'isomorphic-fetch';
import { _fetch, prettyPathName } from '../utils';
import Head from '../components/head';
import Row from '../components/Row';
import Button from '../components/Button';
import Brain from '../states/Brain';

const PageApp = ({ files = [] } = {}) => (
  <div style={{ padding: '50px' }}>
    <Head />
    <Brain files={files}>
      {({
        sfiles,
        addToFiles,
        addAll,
        removeAll,
        undo,
        deleteNMs,
        message = 'no message...',
      }) => (
        <div>
          <Row>
            <h2>files {files.length}</h2>
          </Row>
          <Row>
            <div className="alert alert-info">{message}</div>
          </Row>
          <Row>
            <Button text="Select all" action={addAll} left />
            <Button text="Unselect all" action={removeAll} />
            <Button text="Undo" btnStyle="info" action={undo} />
            <Button text="Delete" btnStyle="danger" action={deleteNMs} />
          </Row>
          <Row>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th />
                  <th>Size</th>
                  <th>Name</th>
                  <th>Path</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, id) => (
                  <tr
                    onClick={() => addToFiles(id)}
                    key={id}
                    style={{
                      cursor: 'pointer',
                      background: sfiles.indexOf(id) !== -1 ? '#007bff40' : '',
                    }}
                  >
                    <td>{id + 1}</td>
                    <td>{file[0]}</td>
                    <td>{`${file[1]} ${file[2]}`}</td>
                    <td>{prettyPathName(file[3])}</td>
                    <td>{prettyPathName(file[3], { path: true })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
        </div>
      )}
    </Brain>
  </div>
);

PageApp.getInitialProps = async ctx => {
  const fetch = _fetch(ctx);
  const res = await fetch('/nm-hunter');
  return await res.json();
};

export default PageApp;
