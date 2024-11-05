window.onload = function() {
    displayActivity();
}

function addEquipment(activityIndex) {
    var equipmentName = document.getElementById(`equipmentInput-${activityIndex}`).value;
    if (equipmentName === '') {
        alert('Please enter the equipment name!');
        return;
    }

    var activities = JSON.parse(localStorage.getItem('selectedActivities')) || [];
    if (!activities[activityIndex].equipmentList) activities[activityIndex].equipmentList = [];
    activities[activityIndex].equipmentList.push(equipmentName);
    localStorage.setItem('selectedActivities', JSON.stringify(activities));
    document.getElementById(`equipmentInput-${activityIndex}`).value = '';
    displayActivity();
}

function editActivity(activityIndex) {
    var activities = JSON.parse(localStorage.getItem('selectedActivities'));
    var newActivityName = prompt("Create New Activity Name..", activities[activityIndex].name);
    if (newActivityName) {
        activities[activityIndex].name = newActivityName;
        localStorage.setItem('selectedActivities', JSON.stringify(activities));
        displayActivity();
    }
}

function deleteActivity(activityIndex) {
    var activities = JSON.parse(localStorage.getItem('selectedActivities'));
    activities.splice(activityIndex, 1);
    localStorage.setItem('selectedActivities', JSON.stringify(activities));
    displayActivity();
}

function displayActivity() {
    var activitiesOutput = document.getElementById('activitiesOutput');
    activitiesOutput.innerHTML = '';
    var activities = JSON.parse(localStorage.getItem('selectedActivities')) || [];

    activities.forEach((activity, index) => {
        if (typeof activity === "string") {
            activity = { name: activity, equipmentList: [] };
            activities[index] = activity;
        }

        const activityBox = document.createElement('div');
        activityBox.className = 'activity-box';

        const activityHeaderContainer = document.createElement('div');
        activityHeaderContainer.className = 'activity-header-container';
        activityHeaderContainer.style.display = 'flex';
        activityHeaderContainer.style.justifyContent = 'space-between';
        activityHeaderContainer.style.alignItems = 'center';
    
        const activityHeader = document.createElement('h4');
        activityHeader.className = 'activity-header';
        activityHeader.innerText = activity.name;

        //edit activity name dlm box
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = activity.name;
        editInput.style.display = 'none'; 

        //save button utk edit activity
        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.style.display = 'none'; 

        saveButton.onclick = function() {
            const newActivityName = editInput.value;
            if (newActivityName) {
                activities[index].name = newActivityName;
                localStorage.setItem("selectedActivities", JSON.stringify(activities));
                activityHeader.innerText = newActivityName;
                editInput.style.display = 'none';
                saveButton.style.display = 'none';
                activityHeader.style.display = 'inline';
            }
        };

        activityHeaderContainer.appendChild(activityHeader);
        activityHeaderContainer.appendChild(editInput);
        activityHeaderContainer.appendChild(saveButton);

        const activityButtons = document.createElement('div');
        activityButtons.className = 'activity-buttons';

        const editActivityButton = document.createElement('button');
        editActivityButton.innerText = 'Edit Activity';
        editActivityButton.onclick = function() {
            activityHeader.style.display = 'none';
            editInput.style.display = 'inline';
            saveButton.style.display = 'inline';
            editInput.focus();
        };
        activityButtons.appendChild(editActivityButton);

        const deleteActivityButton = document.createElement('button');
        deleteActivityButton.innerText = 'Delete Activity';
        deleteActivityButton.onclick = function() {
            activities.splice(index, 1);
            localStorage.setItem("selectedActivities", JSON.stringify(activities));
            displayActivity();
        };
        activityButtons.appendChild(deleteActivityButton);

        activityHeaderContainer.appendChild(activityButtons);
        activityBox.appendChild(activityHeaderContainer);

        const equipmentContainer = document.createElement('div');
        equipmentContainer.className = 'equipment-container';

        const equipmentInput = document.createElement('input');
        equipmentInput.type = 'text';
        equipmentInput.placeholder = 'Enter equipment name...';
        equipmentInput.id = `equipmentInput-${index}`;
        equipmentContainer.appendChild(equipmentInput);

        const addEquipmentButton = document.createElement('button');
        addEquipmentButton.innerText = 'ADD EQUIPMENT';
        addEquipmentButton.onclick = function() {
            let equipmentName = document.getElementById(`equipmentInput-${index}`).value;
            if (equipmentName === '') {
                alert('Please enter the equipment name!');
                return;
            }

            if (!activities[index].equipmentList) activities[index].equipmentList = [];
            activities[index].equipmentList.push(equipmentName);
            localStorage.setItem("selectedActivities", JSON.stringify(activities));
            document.getElementById(`equipmentInput-${index}`).value = '';
            alert('Equipment has been added successfully!');
            displayActivity();
        };
        equipmentContainer.appendChild(addEquipmentButton);
        activityBox.appendChild(equipmentContainer);

        if (activity.equipmentList) {
            const equipmentList = document.createElement('div');
            equipmentList.className = 'equipment-list';
            activity.equipmentList.forEach((equipment, equipmentIndex) => {
                const checklistItem = document.createElement('div');
                checklistItem.className = 'checklist-item';
                checklistItem.style.display = 'flex';
                checklistItem.style.justifyContent = 'space-between';
                checklistItem.style.alignItems = 'center';
                checklistItem.style.marginBottom = '10px';

                const equipmentText = document.createElement('span');
                equipmentText.innerText = equipment;
                checklistItem.appendChild(equipmentText);

                //edit utk equipment name
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = equipment;
                editInput.style.display = 'none';
                editInput.id = `editInput-${index}-${equipmentIndex}`;

                const equipmentButtons = document.createElement('div');
                equipmentButtons.className = 'activity-buttons';
                equipmentButtons.style.display = 'flex';

                const editEquipmentButton = document.createElement('button');
                editEquipmentButton.innerText = 'Edit';
                editEquipmentButton.style.marginRight = '5px';

                editEquipmentButton.onclick = function() {
                    equipmentText.style.display = 'none';
                    editInput.style.display = 'inline';
                    editInput.focus();
                    saveEquipmentButton.style.display = 'inline';
                };

                equipmentButtons.appendChild(editEquipmentButton);
                
                //save edit utk equipment list
                const saveEquipmentButton = document.createElement('button');
                saveEquipmentButton.innerText = 'Save';
                saveEquipmentButton.style.display = 'none';
                saveEquipmentButton.onclick = function () {
                    const newEquipmentName = editInput.value;
                    if (newEquipmentName) {
                        activities[index].equipmentList[equipmentIndex] = newEquipmentName;
                        localStorage.setItem("selectedActivities", JSON.stringify(activities));
                        equipmentText.innerText = newEquipmentName;
                        equipmentText.style.display = 'inline';
                        editInput.style.display = 'none';
                        saveEquipmentButton.style.display = 'none';
                    }
                };

                equipmentButtons.appendChild(saveEquipmentButton);

                const deleteEquipmentButton = document.createElement('button');
                deleteEquipmentButton.innerText = 'Delete';
                deleteEquipmentButton.onclick = function() {
                    activities[index].equipmentList.splice(equipmentIndex, 1);
                    localStorage.setItem("selectedActivities", JSON.stringify(activities));
                    displayActivity();
                };
                equipmentButtons.appendChild(deleteEquipmentButton);

                checklistItem.appendChild(equipmentButtons);
                equipmentList.appendChild(checklistItem);
                checklistItem.appendChild(equipmentText);
                checklistItem.appendChild(editInput);
            });
            activityBox.appendChild(equipmentList);
        }
        activitiesOutput.appendChild(activityBox);
    });

    localStorage.setItem("selectedActivities", JSON.stringify(activities));
}
