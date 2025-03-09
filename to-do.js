let items = JSON.parse(localStorage.getItem('items')) || [];

    // Render the item list
    function renderItemList() {
      const itemList = document.getElementById('itemList');
      itemList.innerHTML = '';

      items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        if (item.completed) {
          itemElement.classList.add('completed');
        }

        const itemInput = document.createElement('input');
        itemInput.type = 'text';
        itemInput.value = item.text;
        itemInput.addEventListener('change', () => {
          items[index].text = itemInput.value;
          saveItemsToLocalStorage();
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = item.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => {
          items[index].completed = !items[index].completed;
          saveItemsToLocalStorage();
          renderItemList();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          items.splice(index, 1);
          saveItemsToLocalStorage();
          renderItemList();
        });

        itemElement.appendChild(itemInput);
        itemElement.appendChild(completeButton);
        itemElement.appendChild(deleteButton);
        itemList.appendChild(itemElement);
      });
    }

    // Save items to local storage
    function saveItemsToLocalStorage() {
      localStorage.setItem('items', JSON.stringify(items));
    }

    // Add a new item
    const newItemInput = document.getElementById('newItemInput');
    const addItemButton = document.getElementById('addItemButton');
    addItemButton.addEventListener('click', () => {
      if (newItemInput.value.trim() !== '') {
        items.push({ text: newItemInput.value, completed: false });
        newItemInput.value = '';
        saveItemsToLocalStorage();
        renderItemList();
      }
    });

    // Render the initial item list
    renderItemList();