document.addEventListener('DOMContentLoaded', () => {

    const URL_API = 'https://randomuser.me/api?results=30';

    var users = [];

    fetch(URL_API)
        .then(res => res.json())
        .then(data => {

            let results = data.results;

            for(let i = 0; i < results.length; i++) {

                users.push(results[i]);

                let img = results[i].picture.medium;
                let name = results[i].name.first + ' ' + results[i].name.last;
                let location = results[i].location.city + ', ' + results[i].location.country;
                
                let ul = document.querySelector('ul');
                let li = document.createElement('li');

                li.innerHTML = `<img src="${img}" alt="">
                                <div class="infos" id="${i}">
                                    <h3>${name}</h3>
                                    <h4>${location}</h4>
                                </div>`;
                
                let hr = document.createElement('hr');
                li.appendChild(hr);               
                ul.appendChild(li);

            }

        });

        let input = document.querySelector('input');

        input.addEventListener('keyup', () => {
            let li = document.querySelectorAll('li');
            let value = input.value;
            for(let i = 0; i < li.length; i++) {
                let name = li[i].children[1].children[0].textContent;
                let location = li[i].children[1].children[1].textContent;

                if(name.includes(value) || location.includes(value)) {
                    for(let i = 0; i < li.length; i++) {
                        li[i].style.display = 'none';
                    }
                    li[i].style.display = 'flex';
                } 
            }

            if(input.value === '') {
                for(let i = 0; i < li.length; i++) {
                    li[i].style.display = 'flex';
                }
            }
        });

        /** Click event listener LI & fetch data from user's local array for specified USER.. And display infos.. */

        setTimeout(() => {
            let li = document.querySelectorAll('li');
            for(let i = 0; i < li.length; i++) {
                li[i].addEventListener('mouseover', () => {
                    let user_name = li[i].children[1].children[0].textContent;
                   
                    for(let i = 0; i < users.length; i++) {
                        let full_name = users[i].name.first + ' ' + users[i].name.last;
                        
                        if(full_name == user_name) {
                            console.log(users[i]);

                            let name = `${users[i].name.title} ${users[i].name.first} ${users[i].name.last}`;
                            let email = users[i].email;
                            let location = `${users[i].location.street.number} ${users[i].location.street.name}, 
                                            ${users[i].location.city} - ${users[i].location.country}`;
                            let login = users[i].login.username;
                            let phone = users[i].cell;
                            let photo = users[i].picture.thumbnail;
                            let age = users[i].dob.age;

                            let infos_user = document.createElement('div');
                            infos_user.classList.add('user_details');
                            infos_user.innerHTML = `<header class='header_bis'>
                                                        <h3>${name}</h3>
                                                        <img src='${photo}' alt=''>
                                                    </header>
                                                    <div>
                                                        <ul>
                                                            <li><b>Login : </b>${login}</li>
                                                            <li><b>Email : </b>${email}</li>
                                                            <li><b>Phone : </b>${phone}</li>
                                                            <li><b>Location : </b>${location}</li>
                                                            <li><b>Age : </b>${age} ans</li>
                                                        </ul>
                                                    </div>
                                                    `;
                            document.body.appendChild(infos_user);

                        } 
                    }
                });
                li[i].addEventListener('mouseout', () => {
                    let infos_user = document.querySelector('.user_details');
                    infos_user.remove();
                });
            }
        }, 1500);

});