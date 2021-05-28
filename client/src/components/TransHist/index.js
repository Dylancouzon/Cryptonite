import React, { useContext, useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import SessionContext from '../../utils/sessionContext';
import API from "../../utils/api";

// Table is able to be styled. This is generic boostrap styling for MVP.

// THIS IS PLACEHOLDER DATA. WE NEED TO PASS AN ARRAY OF OBJECTS WITH THE VALUES
// CHANGE THE KEYS ACCORDINGLY TO WHAT THE BLOCKCHAIN PROVIDES
// {
//   "from": "Sender Public Key",
//   "private": "Sender Private Key",
//   "to": "Recipient",
//   "amount": amount
//   "label": "whatever"
// }





function TransHist() { //hands props as parameter

  const { publicKey } = useContext(SessionContext);
  const [transactions, setTransactions] = useState([]);

  const timeConverter = (time) => {
    const unixTime = time;
    const dateObject = new Date(unixTime);
    const dateFormat = dateObject.toLocaleString();
    return dateFormat;
  }

  useEffect(() => {
    console.log("hello");
    API.getUserTransactions(publicKey)
      .then(res => {
        console.log(res.data);
          res.data.forEach(data => {
          data.timestamp = timeConverter(data.timestamp);
          if(data.fromAddress === null) {
            data.fromAddress = "System";
          };
        });
        console.log(res.data);
        setTransactions(res.data, res.data.valid = true);
      }
      )
}, [publicKey]);


const columns = [{
  dataField: 'fromAddress',
  text: 'From',
  sort: true
}, {
  dataField: 'toAddress',
  text: 'Recipient',
  sort: true
}, {
  dataField: 'amount',
  text: 'Amount',
  sort: true
}, {
  dataField: 'timestamp',
  text: 'Timestamp',
  sort: true
}, {
  dataField: 'valid',
  text: 'Valid',
  sort: true
}];

const expandRow = {
  renderer: row => (
    <div>
      <p>{row.amount}</p>
    </div>
  ),
  showExpandColumn: true,
  expandHeaderColumnRenderer: ({ isAnyExpands }) => {
    if (isAnyExpands) {
      return <b>-</b>;
    }
    return <b>+</b>;
  },
  expandColumnRenderer: ({ expanded }) => {
    if (expanded) {
      return (
        <b>-</b>
      );
    }
    return (
      <b>...</b>
    );
  }
};

return (
  <BootstrapTable
    keyField="id"  // Should change to value
    data={ transactions }
    columns={columns}
    expandRow={expandRow}
    striped
    hover
    condensed
  />
)
}

export default TransHist;