import React from 'react';
import { useLocation } from 'react-router-dom'
function Stats() {
    const { data: stats } = useLocation();

    return (
        <div>
            {stats && <div><strong>Stats:</strong>
                <br></br><br></br>
                <p>URL: {stats.url}</p>
                <p>Shortcode: {stats.shortcode}</p>
                <a href={`http://localhost:8080/${stats.shortcode}`} target="blank">Link to redirect</a>
                <p>Visits: {stats.visits}</p>
                <p>Created: {stats.created}</p>
                <p>Last time Visited: {stats.lastVisit}</p>
            </div>}
        </div>
    )
}

export default Stats;