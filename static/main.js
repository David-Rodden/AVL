import {drawTree} from './tree-visualization.js';

document.getElementById('draw-btn').addEventListener('click', () => {
    const inputValues = document.getElementById('tree-values').value.split(',').map(Number);
    fetch('/update_tree', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({values: inputValues}),
    })
        .then(response => response.json())
        .then(data => drawTree(data))
        .catch(error => console.error('Error:', error));
});
