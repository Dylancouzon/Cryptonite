import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

// Table is able to be styled. This is generic boostrap styling for MVP.

// THIS IS PLACEHOLDER DATA. WE NEED TO PASS AN ARRAY OF OBJECTS WITH THE VALUES
// CHANGE THE KEYS ACCORDINGLY TO WHAT THE BLOCKCHAIN PROVIDES
function TransHist() {
    const transaction = [
        {
            id: 1,
            date: "04/07/21",
            sender: "Cheng",
            recipient: "Jake",
            amount: 450,
            valid: true,
            label: 'This is the reason why im sending the coin'
        },
        {
            id: 2,
            date: "04/07/21",
            sender: "Cheng",
            recipient: "Dylan",
            amount: 305,
            valid: true,
            label: 'This is the reason why im sending the coin'
        },
        {
            id: 3,
            date: "04/07/21",
            sender: "Cheng",
            recipient: "Liam",
            amount: 5000,
            valid: false,
            label: 'This is the reason why im sending the coin'
        },
        {
            id: 4,
            date: "04/06/21",
            sender: "",
            recipient: "Jake",
            amount: 450,
            valid: true,
            label: 'This is the reason why im sending the coin'
        }
    ];

    const columns = [{
        dataField: 'id',
        text: 'Trans ID',
        sort: true
    }, {
        dataField: 'date',
        text: 'Date',
        sort: true
    }, {
        dataField: 'sender',
        text: 'Sender',
        sort: true
    }, {
        dataField: 'recipient',
        text: 'Recipient',
        sort: true
    }, {
        dataField: 'amount',
        text: 'Amount',
        sort: true
    }, {
        dataField: 'valid',
        text: 'Valid',
        sort: true
    }];
    console.log(transaction.label);
    const expandRow = {
        renderer: row => (
          <div>
            <p>{`${row.label}`}</p>
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
            keyField="id"
            data={transaction}
            columns={columns}
            expandRow={ expandRow }
            striped
            hover
            condensed
        />
    )
}

export default TransHist;