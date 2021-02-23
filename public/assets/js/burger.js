// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }

    // UPDATE
    const changeDevourBtns = document.querySelectorAll('.change-devoured');

    // Set up the event listener for the devour button
    if (changeDevourBtns) {
      changeDevourBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          // Grabs the id of the element that goes by the name, "id"
          const id = e.target.getAttribute('data-id');
          const newDevour = e.target.getAttribute('data-newdevour');

          const newDevourState = {
            devoured: newDevour,
          };

          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },

            // make sure to serialize the JSON body
            body: JSON.stringify(newDevourState),
          }).then((response) => {
            // Check that the response is all good
            // Reload the page so the user can see the update
            if (response.ok) {
              console.log(`changed devoured to: ${newDevour}`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }

    // CREATE
    const createBurgerBtn = document.getElementById('create-form');

    if (createBurgerBtn) {
      createBurgerBtn.addEventListener('submit', (e) => {
        e.preventDefault();

        if(document.getElementById('order').value.trim() == ""){
          alert("Please enter a burger name and try again!")
        }else{
          // Grabs the value of the textarea that goes by the burger_name, devoured
        const newBurger = {
          burger_name: document.getElementById('order').value.trim(),
          devoured: false,
        };

        // Send POST request to create a new quote
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newBurger),
        }).then(() => {
          // Empty the form
          document.getElementById('order').value = '';

          // Reload the page so the user can see the new quote
          console.log('Created a new burger!');
          location.reload();
        });
        }

      });
    }
});