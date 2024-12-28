import React, { useState } from 'react';
import '../css/DatabaseSetting.css';

const DatabaseSettings = () => {
  const [dbDetails, setDbDetails] = useState({
    host: '',
    username: '',
    password: '',
    database: '',
  });
  const [connectionStatus, setConnectionStatus] = useState(null);

  const handleChange = (e) => {
    setDbDetails({
      ...dbDetails,
      [e.target.name]: e.target.value,
    });
  };

  const testConnection = async () => {
    try {
      const response = await fetch('/api/connect-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbDetails),
      });
      const result = await response.json();
      if (result.success) {
        setConnectionStatus('Connection successful!');
      } else {
        setConnectionStatus('Connection failed! Please check the details.');
      }
    } catch (error) {
      setConnectionStatus('Error connecting to the database.');
    }
  };

  const saveDetails = () => {
    alert('Database details saved successfully!');
  };

  return (
    <div className="database-settings">
      <h2>Database Settings</h2>
      <div className="form-group">
        <label>Host</label>
        <input
          type="text"
          name="host"
          value={dbDetails.host}
          onChange={handleChange}
          placeholder="Enter database host"
        />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={dbDetails.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={dbDetails.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </div>
      <div className="form-group">
        <label>Database</label>
        <input
          type="text"
          name="database"
          value={dbDetails.database}
          onChange={handleChange}
          placeholder="Enter database name"
        />
      </div>
      <div className="buttons">
        <button onClick={testConnection} className="test-button">Test Connection</button>
        <button onClick={saveDetails} className="save-button">Save</button>
      </div>
      {connectionStatus && <p className="status-message">{connectionStatus}</p>}
    </div>
  );
};

export default DatabaseSettings;
