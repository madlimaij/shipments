import React from 'react';

const Home = () => {
  return (
    <div className="py-4">
      <h2 className="py-3">Assignment descripton</h2>
      <h5>Shipments CRUD page</h5>
      <h6>Create an HTML Page with relevant Javascript to: </h6>
      <ul>
        <li>
          Load shipments data with AJAX.<br/>
        </li>
        <li>
          Display data in generated table (see attachment ShipmentsTable.png as
          example)
        </li>
        <li>
          Provide a button in the table to open a panel to visualize details of
          single row (see attachment ShipmentsDetails.png as example)
        </li>
      </ul>
      <h6>TECH:</h6>
      <ul>
        <li>You can implement it with vanilla javascript</li>
        <li>More points if you implement it with React</li>
      </ul>
      <h6>BENEFICIAL ADDITIONAL POINTS</h6>
      <ul>
        <li>
          Use one CSS template (for example get some from <a href="https://www.creative-tim.com/templates/free">here</a>)
        </li>
        <li>Implement delete button on the table</li>
        <li>
          Implement update on Details panel (field values could be changed in
          the UI)
        </li>
        <li>Use Axios</li>
        <li>Use React + Redux</li>
        <li>Use React + Redux + Thunk middleware</li>
      </ul>
    </div>
  );
};

export default Home;
