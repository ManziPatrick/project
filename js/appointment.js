async function fetchData() {
    try {
        const response = await fetch('https://cyberops-bn.onrender.com/api/v1/feedback/getContacts');
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateTable(data, page, limit) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.message}</td>
        `;

        tableBody.appendChild(row);
    });
}

function setupPagination(data, currentPage, limit) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(data.length / limit);

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => loadPage(data, currentPage - 1, limit));
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.className = (i === currentPage) ? 'active' : '';
        button.addEventListener('click', () => loadPage(data, i, limit));
        paginationContainer.appendChild(button);
    }

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => loadPage(data, currentPage + 1, limit));
    paginationContainer.appendChild(nextButton);
}

async function loadPage(data, page, limit) {
    populateTable(data, page, limit);
    setupPagination(data, page, limit);
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    loadPage(data, 1, 5);
});
