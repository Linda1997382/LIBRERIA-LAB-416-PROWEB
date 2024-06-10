// Función para obtener y mostrar todos los usuarios
function fetchUsers() {
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(users => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
  
        users.forEach(user => {
          const userRow = document.createElement('tr');
          userRow.innerHTML = `
            <td>${user.ID}</td>
            <td>${user.Nombre}</td>
            <td>${user.Email}</td>
            <td>${user.privilegio_id}</td>
            <td>
              <select class="form-select" id="privilege-select-${user.ID}">
                <option value="1" ${user.privilegio_id === 1 ? 'selected' : ''}>Usuario</option>
                <option value="2" ${user.privilegio_id === 2 ? 'selected' : ''}>Administrador</option>
              </select>
            </td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="updatePrivilege(${user.ID})">Actualizar</button>
            </td>
          `;
          userList.appendChild(userRow);
        });
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  }
  
  // Función para actualizar el privilegio de un usuario
  function updatePrivilege(userId) {
    const selectElement = document.getElementById(`privilege-select-${userId}`);
    const newPrivilege = selectElement.value;
  
    fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ privilegio_id: newPrivilege })
    })
    .then(response => {
      if (response.ok) {
        fetchUsers(); // Actualizar la lista de usuarios después de la actualización
        console.log('Privilegio del usuario actualizado exitosamente');
      } else {
        console.error('Error al actualizar el privilegio del usuario');
      }
    })
    .catch(error => console.error('Error al actualizar el privilegio del usuario:', error));
  }
  
  // Llamar a la función para obtener y mostrar usuarios cuando se cargue la página
  window.onload = fetchUsers;
  