import time

# ADD 'G' TO THE PARAMETERS
def format_response(scores, rings, node_patterns, node_ring_map, start_time, total_accounts, G):
    suspicious_accounts = []

    for acc, score in scores.items():
        if score >= 50:
            suspicious_accounts.append({
                "account_id": str(acc),
                "suspicion_score": float(min(100.0, round(score, 2))),
                "detected_patterns": node_patterns.get(acc, []),
                "ring_id": node_ring_map.get(acc, "UNKNOWN")
            })

    suspicious_accounts.sort(key=lambda x: x["suspicion_score"], reverse=True)

    summary = {
        "total_accounts_analyzed": total_accounts,
        "suspicious_accounts_flagged": len(suspicious_accounts),
        "fraud_rings_detected": len(rings),
        "processing_time_seconds": round(time.time() - start_time, 2)
    }

    # --- NEW UI GRAPH TOPOLOGY GENERATION ---
    graph_elements = []
    
    # 1. Add Nodes
    for node in G.nodes():
        score = scores.get(node, 0)
        graph_elements.append({
            "data": {
                "id": str(node),
                "label": str(node),
                "score": score,
                "is_suspicious": score >= 50,
                "ring_id": node_ring_map.get(node, "")
            }
        })
        
    # 2. Add Edges
    for u, v, data in G.edges(data=True):
        graph_elements.append({
            "data": {
                "source": str(u),
                "target": str(v),
                "amount": data.get("amount", 0)
            }
        })

    return {
        "suspicious_accounts": suspicious_accounts,
        "fraud_rings": rings,
        "summary": summary,
        "graph_data": graph_elements # THIS FEEDS CYTOSCAPE directly
    }