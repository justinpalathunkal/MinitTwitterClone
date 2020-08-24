const form = document.querySelector('form');
const loadingElement = document.querySelector('img');
const API_URL = 'http://localhost:5000/dweets'; 
const dweetsElement = document.querySelector('.dweets');


loadingElement.style.display = 'none';

loadingElement.style.display ='';

listAllDweets();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const dweet = {
        name,
        content
    };

    form.style.display = 'none';
    loadingElement.style.display ='';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(dweet),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdDweet => {
          form.reset();
          form.style.display = '';
          listAllDweets()
      });
});

function listAllDweets() {
    dweetsElement.innerHTML = '';
    fetch(API_URL)
    .then(response => response.json())
    .then(dweets => {
        console.log(dweets);
        console.log('it works here');
        dweets.reverse();
        dweets.forEach(dweet => {
            const div = document.createElement('div');
            const header = document.createElement('h3');
            header.textContent = dweet.name;

            const contents = document.createElement('p');
            contents.textContent = dweet.content;

            const date = document.createElement('small');
            date.textContent = new Date(dweet.created);

            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);

            dweetsElement.appendChild(div);
            loadingElement.style.display ='none';
        });
        console.log('works here too');
    });
}