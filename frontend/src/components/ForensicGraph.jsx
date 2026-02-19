// import CytoscapeComponent from 'react-cytoscapejs';
// import { useRef, useEffect, useState } from 'react';

// export default function ForensicGraph({ elements }) {
//   const cyRef = useRef(null);
//   const [selectedNode, setSelectedNode] = useState(null);

//   // Jaw-dropping styling array
//   const stylesheet = [
//     {
//       selector: 'node',
//       style: {
//         'background-color': '#1f1f2e',
//         'label': 'data(id)',
//         'color': '#a1a1aa',
//         'font-family': 'monospace',
//         'font-size': '12px',
//         'border-width': 2,
//         'border-color': '#00f0ff',
//         'text-valign': 'bottom',
//         'text-margin-y': 6,
//         'width': 30,
//         'height': 30,
//         'transition-property': 'background-color, border-color, width, height',
//         'transition-duration': '0.2s'
//       }
//     },
//     {
//       // Suspicious nodes glow red
//       selector: 'node[?is_suspicious]',
//       style: {
//         'background-color': '#ff2a2a',
//         'border-color': '#ffaaaa',
//         'border-width': 3,
//         'color': '#ff2a2a',
//         'font-weight': 'bold',
//         'width': 45,
//         'height': 45,
//         'shadow-blur': 20,
//         'shadow-color': '#ff2a2a',
//         'shadow-opacity': 0.8
//       }
//     },
//     {
//       selector: 'edge',
//       style: {
//         'width': 2,
//         'line-color': '#334155',
//         'target-arrow-color': '#334155',
//         'target-arrow-shape': 'triangle',
//         'curve-style': 'bezier',
//         'arrow-scale': 1.5
//       }
//     }
//   ];

//   useEffect(() => {
//     if (cyRef.current) {
//       // Interactive clicking
//       cyRef.current.on('tap', 'node', (evt) => {
//         const nodeData = evt.target.data();
//         setSelectedNode(nodeData);
//       });
//       cyRef.current.on('tap', (evt) => {
//         if (evt.target === cyRef.current) setSelectedNode(null);
//       });
//     }
//   }, [elements]);

//   return (
//     <div className="w-full h-full relative">
//       <CytoscapeComponent
//         elements={elements}
//         stylesheet={stylesheet}
//         layout={{ name: 'cose', padding: 50, animate: true, animationDuration: 1000 }}
//         style={{ width: '100%', height: '100%' }}
//         cy={(cy) => { cyRef.current = cy; }}
//       />
      
//       {/* Node Details Tooltip overlaid on graph */}
//       {selectedNode && (
//         <div className="absolute top-4 left-4 bg-dark-900/90 border border-neon-cyan p-4 rounded z-10 font-mono shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-sm">
//           <h4 className="text-white border-b border-dark-700 pb-2 mb-2">NODE <span className="text-neon-cyan">{selectedNode.id}</span></h4>
//           <p className="text-sm text-gray-400">Risk Score: <span className={selectedNode.score >= 50 ? "text-neon-red font-bold" : "text-neon-green"}>{selectedNode.score.toFixed(1)}</span></p>
//           {selectedNode.ring_id && (
//             <p className="text-sm text-gray-400">Ring ID: <span className="text-yellow-400">{selectedNode.ring_id}</span></p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


import CytoscapeComponent from 'react-cytoscapejs';
import { useRef, useEffect, useState } from 'react';

export default function ForensicGraph({ elements }) {
  const cyRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // High-Density Graph Aesthetic
  const stylesheet = [
    {
      // DEFAULT SAFE NODE (Faded into the background)
      selector: 'node',
      style: {
        'background-color': 'rgba(255, 255, 255, 0.05)',
        'color': '#555566',
        'font-family': 'Inter, sans-serif',
        'font-size': '8px',
        'border-width': 1,
        'border-color': 'rgba(255, 255, 255, 0.1)',
        'width': 12, // Tiny
        'height': 12,
        'label': '', // Hide labels by default on safe nodes to reduce clutter
      }
    },
    {
      // SAFE NODE HOVER STATE
      selector: 'node:active',
      style: {
        'label': 'data(id)',
        'background-color': '#00f0ff',
        'width': 20,
        'height': 20,
      }
    },
    {
      // FRAUDULENT NODE (Massive and Glowing)
      selector: 'node[?is_suspicious]',
      style: {
        'background-color': '#FF2A4D', 
        'border-color': '#ffffff',
        'border-width': 2,
        'color': '#FF2A4D',
        'font-family': 'monospace',
        'font-size': '14px',
        'font-weight': 'bold',
        'text-valign': 'bottom',
        'text-margin-y': 6,
        'label': 'data(id)', // Always show labels for fraud
        'width': 40,
        'height': 40,
        'shadow-blur': 30,
        'shadow-color': '#FF2A4D',
        'shadow-opacity': 1,
        'z-index': 100 // Force to top
      }
    },
    {
      // DEFAULT EDGE (Faint and thin)
      selector: 'edge',
      style: {
        'width': 0.5,
        'line-color': 'rgba(255, 255, 255, 0.05)',
        'target-arrow-color': 'rgba(255, 255, 255, 0.05)',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'arrow-scale': 0.5,
      }
    },
    {
      // FRAUDULENT EDGE (Glowing Marching Ants)
      selector: '.animated-flow',
      style: {
        'line-style': 'dashed',
        'line-dash-pattern': [8, 6],
        'line-color': '#FF2A4D',
        'target-arrow-color': '#FF2A4D',
        'width': 3,
        'arrow-scale': 1.5,
        'z-index': 99,
        'shadow-blur': 15,
        'shadow-color': '#FF2A4D',
        'shadow-opacity': 0.8
      }
    }
  ];

  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    cy.on('tap', 'node', (evt) => setSelectedNode(evt.target.data()));
    cy.on('tap', (evt) => { if (evt.target === cy) setSelectedNode(null); });

    // Find edges connecting suspicious nodes and highlight them
    const suspiciousEdges = cy.edges().filter(ele => {
      return ele.source().data('is_suspicious') && ele.target().data('is_suspicious');
    });

    suspiciousEdges.addClass('animated-flow');

    // Create the flowing money effect
    let offset = 24;
    const animationInterval = setInterval(() => {
      offset -= 1;
      if (offset <= 0) offset = 24;
      cy.style().selector('.animated-flow').style({
        'line-dash-offset': offset
      }).update();
    }, 40);

    return () => clearInterval(animationInterval);
  }, [elements]);

  return (
    <div className="w-full h-full relative bg-[#020205] rounded-lg overflow-hidden">
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        // Switch to Concentric for a high-density "radar" look
        layout={{ 
          name: 'concentric',
          fit: true,
          padding: 50,
          minNodeSpacing: 30,
          concentric: function(node) {
            // Push suspicious nodes to the center of the screen
            return node.data('is_suspicious') ? 100 : 10;
          },
          levelWidth: function(nodes) { return 10; },
          animate: true,
          animationDuration: 1500,
          animationEasing: 'ease-out-quint'
        }}
        style={{ width: '100%', height: '100%' }}
        cy={(cy) => { cyRef.current = cy; }}
      />
      
      {/* Node Details Tooltip Overlay */}
      {selectedNode && (
        <div className="absolute top-6 left-6 bg-obsidian/95 border border-glassBorder p-5 rounded-xl z-10 backdrop-blur-xl min-w-[220px] shadow-2xl">
          <h4 className="text-white mb-2 text-xs tracking-widest uppercase text-gray-400">Target Node</h4>
          <p className="font-mono font-bold text-lg text-white mb-3">{selectedNode.id}</p>
          <div className="h-[1px] w-full bg-gradient-to-r from-glassBorder to-transparent mb-3"></div>
          
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Threat Score</p>
            <p className={`text-2xl font-bold ${selectedNode.score >= 50 ? "text-crimson" : "text-emerald"}`}>
              {selectedNode.score.toFixed(1)}
            </p>
          </div>
          
          {selectedNode.ring_id && (
            <div className="mt-4 bg-crimson/10 border border-crimson/30 p-2 rounded flex justify-between items-center">
              <span className="text-xs text-crimson font-semibold tracking-wider">RING ASSIGNMENT</span>
              <span className="font-mono text-white text-xs">{selectedNode.ring_id}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}