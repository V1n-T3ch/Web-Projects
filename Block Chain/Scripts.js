document.getElementById('recordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const diagnosis = document.getElementById('diagnosis').value;
    const medication = document.getElementById('medication').value;

    medicalRecordsBlockchain.addBlock({ name, diagnosis, medication });

    updateBlockchainDisplay();
});

function updateBlockchainDisplay() {
    const blockchainDiv = document.getElementById('blockchain');
    blockchainDiv.innerHTML = ''; // Clear previous content

    medicalRecordsBlockchain.chain.forEach((block, index) => {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('block');
        blockDiv.innerHTML = `
            <p>Block ${index}</p>
            <p>Name: ${block.data.name}</p>
            <p>Diagnosis: ${block.data.diagnosis}</p>
            <p>Medication: ${block.data.medication}</p>
            <p>Hash: ${block.hash}</p>
        `;
        blockchainDiv.appendChild(blockDiv);
    });
}

// Initial update of blockchain display
updateBlockchainDisplay();
