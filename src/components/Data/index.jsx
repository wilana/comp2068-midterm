import React, { useEffect, useMemo, useState } from 'react';
import Header from '../shared/Header';
import axios from 'axios';

const Data = () => {
  const APILINK = 'https://jsonplaceholder.typicode.com/posts';

  const [data, setData] = useState([]);
  const dataSet = useMemo(() => data, [data]);
  
  // a state variable for the sort order
  const [order, setOrder] = useState(true);
  // a state variable that doesn't change to refer to in filter
  const [fullDataSet, setFullDataSet] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get(APILINK)
    .then(resp => {
      setData(resp.data);
      setFullDataSet(resp.data);
    });
  }, []);

  useEffect( () => {
    //show all data
    if (value.length === 0) {
      setData([...fullDataSet]);
    } else if (isNaN(value)) {
      // looking for string
      const regex = new RegExp(value);
      setData([...fullDataSet.filter(datum => (regex.test(datum.title) || regex.test(datum.body)))]);
    } else {
      const num = Number(value);
      setData([...fullDataSet.filter(datum => (Number(datum.userId) === num || Number(datum.id) === num))]);
    }
  }, [value, fullDataSet]);

  const sort = (event, name, type) => {
    event.persist();
    
    let sorted;
    if (type === "int")
      sorted = data.sort((a, b) => Number(a[name]) - Number(b[name]));
    else
      sorted = data.sort((a, b) => {
        if (a[name].toLowerCase() < b[name].toLowerCase()) return -1;
        if (a[name].toLowerCase() > b[name].toLowerCase()) return 1;
        return 0;
      });

    if (order) {
      sorted = sorted.reverse();
      setOrder(false);
    } else {
      setOrder(true);
    }

    setData([...sorted]);
  };

  return (
    <>
      <div className="container-fluid">
        <Header title="Your Data"/>
      </div>

      <div className="container">
        <h2>Data Table</h2>
        <hr/>
        
        <div className="row my-3 align-items-center justify-content-end">
          <div className="col-auto">
            <label htmlFor="filter" className="col-form-label">Filter</label>
          </div>

          <div className="col-auto">
            <input type="text" name="filter" className="form-control" onChange={({target: {value}}) => setValue(value)}/>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th onClick={(e) => sort(e, "userId", "int")}>User ID</th>
              <th onClick={(e) => sort(e, "id", "int")}>ID</th>
              <th onClick={(e) => sort(e, "title", "string")}>Title</th>
              <th onClick={(e) => sort(e, "body", "string")}>Body</th>
            </tr>
          </thead>

          <tbody>
            {dataSet.map((entry, i) => (
              <tr key={entry.id}>
                <td>{entry.userId}</td>
                <td>{entry.id}</td>
                <td>{entry.title}</td>
                <td>{entry.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
 
export default Data;