import React from 'react'

const Error = ({status}) => {
  return (
    <div style={{ position: "absolute", top: "40%", left: "40%" ,textAlign:"center"}}>
      <h1>Error</h1>
      <h2>Something went wrong</h2>
      <h3>{status}</h3>
    </div>
  );
}

export default Error