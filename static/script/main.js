import skills from './skills.json' assert { type: 'json' };
import projects from './projects.json' assert { type: 'json' };

// Sticky Menu Background
window.addEventListener('scroll', function () {
    if (window.scrollY > 150) {
        document.querySelector('#main-nav').style.opacity = 0.9;
    } else {
        document.querySelector('#main-nav').style.opacity = 1;
    }
});

// Smooth Scrolling
$('#main-nav a').on('click', function (event) {
    if (this.hash !== ' ') {
        event.preventDefault();

        const hash = this.hash;

        $('html, body').animate(
            {
                scrollTop: $(hash).offset().top - 100
            },
            800
        );
    }
});



// load skills into page
function loadSkills() {
    const container = document.body.querySelector('#skills .items');
    container.replaceChildren();

    // load skills into the container
    skills.forEach((skill) => {
        const value = skill.value * 100;
        const valueText = `${value}%`;

        const title = document.createElement('h1');
        title.textContent = skill.name;

        const percent = document.createElement('p');
        percent.textContent = valueText;

        const subject = document.createElement('div');
        subject.classList.add('subject');
        subject.append(title, percent);

        const progressSpan = document.createElement('span');
        progressSpan.textContent = valueText;

        const progress = document.createElement('div');
        progress.classList.add('progress-bar', 'color-1');
        progress.setAttribute('role', 'progressbar');
        progress.setAttribute('aria-valuenow', valueText);
        progress.setAttribute('aria-valuemin', '0');
        progress.setAttribute('aria-valuemax', '100');
        progress.style.width = `${value}%`;
        progress.appendChild(progressSpan);

        const item = document.createElement('div');
        item.classList.add('item');
        item.append(subject, progress);

        container.appendChild(item);
    });
}


// load projects into page
function loadProjects() {
    const container = document.body.querySelector('#projects .items');
    container.replaceChildren();

    // load projects into the container
    projects.forEach((project) => {
        const image = document.createElement('img');
        image.src = project.image;

        const title = document.createElement('h1');
        title.textContent = project.name;
        title.classList.add('m-heading');

        const description = document.createElement('p');
        description.textContent = project.description;
        description.classList.add('desc');

        const item = document.createElement('div');
        item.classList.add('item', 'card');
        item.append(image, title, description);

        container.appendChild(item);
    });
}

// load year into page
function loadYear() {
    const year = new Date().getFullYear();
    const years = document.body.querySelectorAll('.year');
    years.forEach((y) => {
        y.textContent = year;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadSkills();
    loadProjects();
    loadYear();
});