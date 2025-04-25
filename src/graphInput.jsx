import React, { useState } from 'react';
import Node from './Node.jsx';

export default function GraphInput() {
  const [addEdge, setAddEdge] = useState(false);
  const [vertices, addVertex] = useState(new Set());
  const [edges, setEdges] = useState([]);
  const [positions, setPositions] = useState({});

  const handleClick = () => {
    if (!addEdge) {
      setAddEdge(true);
    }
  };

  function renderVertices() {
    const vertexArray = Array.from(vertices);
    const lines = (
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {edges.map(([from, to], index) => {
          const fromPos = positions[from];
          const toPos = positions[to];
          return fromPos && toPos ? (
            <line
              key={index}
              x1={fromPos.left + 25}
              y1={fromPos.top + 25}
              x2={toPos.left + 25}
              y2={toPos.top + 25}
              stroke="white"
              strokeWidth="2"
            />
          ) : null;
        })}
      </svg>
    );

    const nodes = vertexArray.map((vertex, index) => (
      <Node
        key={index}
        vertex={vertex}
        setPosition={(pos) => {
          setPositions((prev) => ({ ...prev, [vertex]: pos }));
        }}
        position={positions[vertex] || { top: 200, left: 200 }}
      />
    ));

    return (
      <>
        {lines}
        {nodes}
      </>
    );
  }

  return (
    <>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
    }}>
        <button
            onClick={handleClick}
            style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '30px',
            fontSize: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            outline: 'none', 
            }}
            className="edge-add"
        >
            Add An Edge
        </button>
      </div>

      {/* Form appears above the graph when triggered */}
      {addEdge && (
        <form autocomplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            setAddEdge(false);
            const formData = new FormData(e.target);
            addVertex((prev) => {
              if (!isNaN(parseInt(formData.get('node1').trim())))
                return new Set(prev).add(parseInt(formData.get('node1').trim()));
              else return prev;
            });
            addVertex((prev) => {
              if (!isNaN(parseInt(formData.get('node2').trim())))
                return new Set(prev).add(parseInt(formData.get('node2').trim()));
              else return prev;
            });
            setEdges((prev) => {
              const newEdges = [
                ...prev,
                [
                  parseInt(formData.get('node1').trim()),
                  parseInt(formData.get('node2').trim()),
                ],
              ];
              return newEdges;
            });
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000, // Make sure form appears above everything
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
          className="edge-form"
        >
          <label>U :</label>
          <input type="text" name="node1" />
          <br />
          <label>V :</label>
          <input type="text" name="node2" />
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600',
              marginTop: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',

            }}
          >
            Add Edge
          </button>
        </form>
      )}

      {renderVertices()}
    </>
  );
}
