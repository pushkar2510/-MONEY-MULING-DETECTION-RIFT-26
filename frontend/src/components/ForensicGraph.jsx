import CytoscapeComponent from 'react-cytoscapejs';
import { useRef, useEffect, useState } from 'react';

export default function ForensicGraph({ elements }) {
  const cyRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // Jaw-dropping styling array
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': '#1f1f2e',
        'label': 'data(id)',
        'color': '#a1a1aa',
        'font-family': 'monospace',
        'font-size': '12px',
        'border-width': 2,
        'border-color': '#00f0ff',
        'text-valign': 'bottom',
        'text-margin-y': 6,
        'width': 30,
        'height': 30,
        'transition-property': 'background-color, border-color, width, height',
        'transition-duration': '0.2s'
      }
    },
    {
      // Suspicious nodes glow red
      selector: 'node[?is_suspicious]',
      style: {
        'background-color': '#ff2a2a',
        'border-color': '#ffaaaa',
        'border-width': 3,
        'color': '#ff2a2a',
        'font-weight': 'bold',
        'width': 45,
        'height': 45,
        'shadow-blur': 20,
        'shadow-color': '#ff2a2a',
        'shadow-opacity': 0.8
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#334155',
        'target-arrow-color': '#334155',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'arrow-scale': 1.5
      }
    }
  ];

  useEffect(() => {
    if (cyRef.current) {
      // Interactive clicking
      cyRef.current.on('tap', 'node', (evt) => {
        const nodeData = evt.target.data();
        setSelectedNode(nodeData);
      });
      cyRef.current.on('tap', (evt) => {
        if (evt.target === cyRef.current) setSelectedNode(null);
      });
    }
  }, [elements]);

  return (
    <div className="w-full h-full relative">
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={{ name: 'cose', padding: 50, animate: true, animationDuration: 1000 }}
        style={{ width: '100%', height: '100%' }}
        cy={(cy) => { cyRef.current = cy; }}
      />
      
      {/* Node Details Tooltip overlaid on graph */}
      {selectedNode && (
        <div className="absolute top-4 left-4 bg-dark-900/90 border border-neon-cyan p-4 rounded z-10 font-mono shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-sm">
          <h4 className="text-white border-b border-dark-700 pb-2 mb-2">NODE <span className="text-neon-cyan">{selectedNode.id}</span></h4>
          <p className="text-sm text-gray-400">Risk Score: <span className={selectedNode.score >= 50 ? "text-neon-red font-bold" : "text-neon-green"}>{selectedNode.score.toFixed(1)}</span></p>
          {selectedNode.ring_id && (
            <p className="text-sm text-gray-400">Ring ID: <span className="text-yellow-400">{selectedNode.ring_id}</span></p>
          )}
        </div>
      )}
    </div>
  );
}