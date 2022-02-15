const viewDetailsBtns = document.querySelectorAll('.view-rest-btn');

async function fetchRestDetails(event) {
  const restId = event.target.dataset.restid;

  try {
    const res = await fetch(`/restaurants/${restId}`);
    if (!res.ok) {
      alert("Couldn't fetch data!");
      return;
    }
    const resData =  await res.json();

    const metaDiv = document.querySelector('.restaurant-meta');
    metaDiv.innerHTML += `
      <p>${resData.adress}</p>
      <p>${resData.description}</p>
      <p><a href="${resData.website}">View Website</a></p>
    `;  

    const actionsDiv = document.querySelector('.restaurant-actions');
    actionsDiv.getElementsByClassName.display = 'none';
  } catch {
    alert ("Couldn't fetch data!");
  }
}

viewDetailsBtns.forEach(item => {
  item.addEventListener('click', fetchRestDetails);
})
