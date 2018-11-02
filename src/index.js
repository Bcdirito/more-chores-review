document.addEventListener('DOMContentLoaded', () => {
  let choreList = document.getElementById('chore-list')
  let titleInput = document.getElementById('title')
  let priorityInput = document.getElementById('priority')
  let durationInput = document.getElementById('duration')
  let postButton = document.getElementById('submit-btn')

  fetch('http://localhost:3000/chores').then(function(response){
    return response.json()
  }).then(function(json){
    json.forEach(function(choreObj){
      choreList.innerHTML += `<div class="chore-card">
          <button class="delete-button" data-id="${choreObj.id}">x</button>
          <h3> ${choreObj.title} </h3>
          <p> Duration: ${choreObj.duration} </p>
        <input value="${choreObj.priority}"></div>`
    })
  })

  postButton.addEventListener('click', function(event){
    fetch('http://localhost:3000/chores', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        title: titleInput.value,
        priority: priorityInput.value,
        duration: durationInput.value
      })
    })
  })
  choreList.addEventListener('click', function(event){
    if (event.target.className === "delete-button"){
      fetch(`http://localhost:3000/chores/${parseInt(event.target.dataset.id)}`, {
        method: "DELETE",
    })
      event.target.parentElement.remove()
    }
  })
})
