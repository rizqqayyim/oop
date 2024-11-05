document.addEventListener('DOMContentLoaded', function () {
    const journalForm = document.getElementById('journalForm');
    const journalEntries = document.getElementById('journalEntries');
    let editIndex = null; // To keep track of the entry being edited

    // Load existing entries from Local Storage
    const loadEntries = () => {
        const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        savedEntries.forEach(entry => addEntry(entry.date, entry.weather, entry.text));
    };

    // Function to save entries to Local Storage
    const saveEntries = () => {
        const entries = [];
        const journalItems = document.querySelectorAll('.entry');
        journalItems.forEach(item => {
            entries.push({
                date: item.querySelector('.entry-date').textContent,
                weather: item.querySelector('.entry-weather').textContent,
                text: item.querySelector('p').textContent
            });
        });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    };

    // Function to add a new entry
    const addEntry = (date, weather, text) => {
        const entry = document.createElement('div');
        entry.className = 'entry';

        const entryDate = document.createElement('span');
        entryDate.className = 'entry-date';
        entryDate.textContent = date;

        const entryWeather = document.createElement('span');
        entryWeather.className = 'entry-weather';
        entryWeather.textContent = weather;

        const entryContent = document.createElement('p');
        entryContent.textContent = text;

        // Determine the weather icon
        const weatherIcon = document.createElement('img');
        weatherIcon.src = getWeatherIcon(weather);
        weatherIcon.alt = weather;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        // Edit button functionality
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');

        // Edit entry functionality
        editButton.addEventListener('click', function () {
            editIndex = Array.from(journalEntries.children).indexOf(entry); // Find index of entry
            document.getElementById('entryDate').value = date;
            document.getElementById('weatherCondition').value = weather;
            document.getElementById('entry').value = text;
            journalForm.querySelector('button[type="submit"]').textContent = 'Update Entry'; // Change button text
        });

        // Delete entry functionality with confirmation
        deleteButton.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this entry?')) {
                journalEntries.removeChild(entry);
                saveEntries(); // Save after deletion
                alert('Entry deleted successfully!'); // Alert on delete
            }
        });

        entry.appendChild(entryDate);
        entry.appendChild(entryWeather);
        entry.appendChild(weatherIcon);
        entry.appendChild(entryContent);
        entry.appendChild(deleteButton);
        entry.appendChild(editButton);
        journalEntries.appendChild(entry);
    };

    // Function to get weather icon based on condition
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'sunny':
                return 'icon/sunny.png'; // Replace with actual icon URL
            case 'cloudy':
                return 'icon/cloudy.png'; // Replace with actual icon URL
            case 'rainy':
                return 'icon/rainy.png'; // Replace with actual icon URL
            case 'snowy':
                return 'icon/snowy.png'; // Replace with actual icon URL
            case 'stormy':
                return 'icon/stormy.png'; // Replace with actual icon URL
            default:
                return '';
        }
    };

    // Event listener for form submission
    journalForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const entryDate = document.getElementById('entryDate').value;
        const weatherCondition = document.getElementById('weatherCondition').value;
        const entryText = document.getElementById('entry').value;

        if (editIndex !== null) {
            // If editing an existing entry
            const existingEntry = journalEntries.children[editIndex];
            existingEntry.querySelector('.entry-date').textContent = entryDate;
            existingEntry.querySelector('.entry-weather').textContent = weatherCondition;
            existingEntry.querySelector('p').textContent = entryText;
            // Reset edit index
            editIndex = null;
            journalForm.querySelector('button[type="submit"]').textContent = 'Add Entry'; // Reset button text
            alert('Entry updated successfully!'); // Alert on update
        } else {
            // Add new entry
            addEntry(entryDate, weatherCondition, entryText);
            alert('New entry added successfully!'); // Alert on add
        }

        saveEntries(); // Save entries to Local Storage

        // Clear the inputs
        document.getElementById('entryDate').value = '';
        document.getElementById('weatherCondition').value = '';
        document.getElementById('entry').value = '';
    });

    loadEntries(); // Load existing entries on page load
});