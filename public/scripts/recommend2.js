const recommendForm = document.getElementById('recommend');

recommendForm.addEventListener('submit', async (event) => {

  event.preventDefault();
  
  const formData = new FormData(recommendForm);
  const restaData = Object.fromEntries(formData.entries());
  let res;
  try {
    res = await fetch('/restaurants', {
      method: 'POST',
      body: JSON.stringify(restaData),
      headers: {
        'Content-Type': 'application/json'
      }
    });  
  } catch {
    alert('Could not send request!')
  }      
  

  if (res.ok) {
    addNewRestaLi(restaData);
  } else {
    alert('Error! Sorry(');
  }
});

function addNewRestaLi(restaData) {
  const newRestaLi = document.createElement('li');
    newRestaLi.classList.add('restaurant-item');
    newRestaLi.innerHTML = `
      <article>
      <h2>${restaData.name}</h2>
      <div class="restaurant-meta">
        <p>${restaData.cuisine}</p>
        <p>${restaData.adress}</p>
        <p>${restaData.description}</p>
        <p><a href="${restaData.website}">View Website</a></p>
      </div>
    `;

    const restaUl = document.getElementById('restaurants-list');
    restaUl.appendChild(newRestaLi);
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  // const restId = event.target.dataset.restid;
  // const res = await fetch(`/restaurants/${restId}`);
  // const resData =  await res.json();

  // const metaDiv = document.querySelector('.restaurant-meta');
  // metaDiv.innerHTML += `
  //   <p>${resData.adress}</p>
  //   <p>${resData.description}</p>
  //   <p><a href="${resData.website}">View Website</a></p>
  // `;  

  // const actionsDiv = document.querySelector('.restaurant-actions');
  // actionsDiv.getElementsByClassName.display = 'none';
