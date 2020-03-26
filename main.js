// Vanilla JavaScript
// (() => {
//   const API = 'https://jsonplaceholder.typicode.com/photos';
//   const button = document.querySelector('.fetch-btn');
//   const cardWrapper = document.querySelector('.card-wrapper');
//   const warningWrapper = document.querySelector('.warning');

//   let data = null;
//   let info = null;
//   let count = 0;
//   let pagination = 6;

//   const createCard= data => {
//     const card = document.createElement('div');
//     card.classList.add('card', 'my-1', 'mx-1');
//     card.style.width = '18em';

//     const img = new Image();
//     img.classList.add('card-img-top');
//     img.alt = data.id;

//     const body = document.createElement('div');
//     body.classList.add('card-body');

//     const title = document.createElement('h5');
//     title.classList.add('card-title');
//     title.textContent = `Image ${data.id}`;

//     const content = document.createElement('p');
//     content.classList.add('card-text');
//     content.textContent = data.title;

//     img.addEventListener('load', function() {
//       card.appendChild(this);
//       card.appendChild(body);
//       body.appendChild(title);
//       body.appendChild(content);
//       cardWrapper.appendChild(card);
//     })

//     img.src = data.url;


//     if (img.complete) {
//       const event = new Event('load');
//       img.dispatchEvent(event);
//     }
//   };

  // const addCards = (data) => {
  //   button.textContent = 'Wczytuję ...';
  //   let temp = count;

  //   for (let i = temp; i < temp + pagination; i++) {
  //     if (count < data.length) {
  //       createCard(data[count]);
  //       count++;
  //     } else {
  //       if (!info) {
  //         info = document.createElement('div');
  //         info.classList.add('alert', 'alert-secondary', 'mt-2');
  //         info.setAttribute('role', 'alert');
  //         info.textContent = 'Brak wyników !';
  //         warningWrapper.appendChild(info);
  //         button.disabled = true;
  //       }
  //       button.textContent = 'Wczytaj zdjęcia';

  //       return;
  //     }
  //   }

  //   button.textContent = 'Wczytaj zdjęcia';
  // };

  // ES6 Fetch
  // button.addEventListener('click', () => {
  //   if (!data) {
  //     button.disabled = true;
  //     button.textContent = 'Wczytuję ...';

  //     fetch(API)
  //       .then(response => response.json())
  //       .then(response => {
  //         data = response;
  //         addCards(data);

  //         button.disabled = false;
  //         button.textContent = 'Wczytaj zdjęcia';
  //       })
  //       .catch(error => console.error(error));
  //   } else {
  //     addCards(data);
  //   }    
  // });

//   XMLHttpRequest
//   button.addEventListener('click', () => {
//     if (!data) {
//       button.disabled = true;
//       button.textContent = 'Wczytuję ...';

//       const xhr = new XMLHttpRequest();

//       xhr.open('GET', API, true);

//       xhr.addEventListener('load', () => {
//         if (xhr.status === 200) {
//           const response = JSON.parse(xhr.responseText);
//           data = response;
//           addCards(data);
//           button.disabled = false;
//           button.textContent = 'Wczytaj zdjęcia';
//         } else {
//           console.log('Połączenie zakończono statusem ' + xhr.status);
//         }
//       });

//       xhr.addEventListener('error', e => {
//         console.error(e);
//       });

//       xhr.send();
//     } else {
//       addCards(data);
//     }
//   });
// })();

//JQuery
$(() => {
  const API = 'https://jsonplaceholder.typicode.com/photos';
  const $button = $('.fetch-btn');
  const $cardWrapper = $('.card-wrapper');
  const $warningWrapper = $('.warning');

  let data = null;
  let $info = null;
  let count = 0;
  let pagination = 6;

  
  const addCards = data => {
    $button.text('Wczytuję ...');
    let temp = count;

    for (let i = temp; i < temp + pagination; i++) {
      if (count < data.length) {
        createCard(data[count]);
        count++;
      } else {
        if (!$info) {
          $info = $('<div>', { class: 'alert alert-secondary mt-2', role: 'alert', text: 'Brak wyników !' });
          $warningWrapper.append($info);
          $button.prop('disabled', true);
        }
        $button.text('Wczytaj zdjęcia');

        return;
      }
    }

    $button.text('Wczytaj zdjęcia');
  };

  const createCard = data => {
    const $card = $('<div>', { class: 'card my-1 mx-1', width: '18em' });

    const $img = $('<img>', { class: 'card-img-top', alt: data.id});

    const $body = $('<div>', { class: 'card-body' });

    const $title = $('<h5>', { class: 'card-title', text: `Image ${data.id}` });

    const $content = $('<p>', { class: 'card-text', text: data.title });

    $img.on('load', function() {
      $card.append($(this));
      $card.append($body);
      $body.append($title);
      $body.append($content);
      $cardWrapper.append($card);
    })

    $img.attr('src', data.url);

    if ($img.get(0).complete) {
      $img.trigger('load');
    }
  };

  $button.on('click', () => {
    if (!data) {
      $button.prop('disabled', true);
      $button.text('Wczytuję ...');

      $.ajax({
        url: API,
        dataType: 'json'
      }).done(response => {
          data = response;
          addCards(data);

          $button.prop('disabled', false);
          $button.text('Wczytaj zdjęcia');
        }).fail(error => console.error(error));
    } else {
      addCards(data);
    }    
  });
});