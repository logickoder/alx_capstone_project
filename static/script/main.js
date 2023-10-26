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

// setup smooth scrolling for nav links
function setupSmoothScroll() {
    function smoothScroll(target, offset = 0) {
        // Get the target element.
        const targetElement = document.querySelector(target);

        // Get the current scroll position.
        const currentScrollY = window.scrollY;

        // Calculate the distance to scroll.
        const distanceToScroll = targetElement.getBoundingClientRect().top - offset;

        // Scroll to the target element smoothly.
        window.scrollTo({
            top: currentScrollY + distanceToScroll,
            behavior: 'smooth',
        });
    }

    const navLinks = document.querySelectorAll('#main-nav a');
    const offset = document.querySelector('#main-nav').offsetHeight;
    navLinks.forEach((link) => {
        const target = link.getAttribute('href');
        link.addEventListener('click', (event) => {
            event.preventDefault();
            smoothScroll(target, offset);
        });
    });
}


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

        const item = document.createElement('a');
        item.setAttribute('href', project.url);
        item.setAttribute('target', '_blank');
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
    setupSmoothScroll();
});