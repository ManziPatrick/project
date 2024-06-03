const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let appointments = [];

 function fetchAppointments() {
    const response = fetch('https://cyberops-bn.onrender.com/api/v1/cyberContact/getCyberContact');
    const data = response.json();
    console.log("hhhhhhhhhh",response)
    return data;
}

console.log(fetchAppointments)

function insertDataToTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; 
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.message}</td>
        `;
        tableBody.appendChild(row);
    });
}

function paginateData(data, page = 1, itemsPerPage = ITEMS_PER_PAGE) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
}

function renderPagination(totalItems, itemsPerPage = ITEMS_PER_PAGE) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('span');
        pageItem.classList.add('page-item');
        if (i === currentPage) pageItem.classList.add('active');
        pageItem.innerText = i;
        pageItem.addEventListener('click', () => {
            currentPage = i;
            displayAppointments();
        });
        paginationContainer.appendChild(pageItem);
    }
}

async function displayAppointments() {
    try {
        if (appointments.length === 0) {
            appointments = await fetchAppointments();
        }
        const paginatedData = paginateData(appointments, currentPage);
        insertDataToTable(paginatedData);
        renderPagination(appointments.length);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}