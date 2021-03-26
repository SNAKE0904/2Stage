
function tabs(evt, cityName) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("main__thing-item");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("main__header-item");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    if(document.getElementById(cityName).id === 'about' || document.getElementById(cityName).id === 'special') {
        document.getElementById(cityName).style.display = "flex";
    } else {
        document.getElementById(cityName).style.display = "block";
    }
    evt.currentTarget.className += " active";
}

document.querySelector('.example-slider__item').parentNode.childNodes.forEach(value => {
    value.onclick = () => {
        document.querySelector('.example-slider__item').parentNode.childNodes.forEach(values => {
            if(values.classList.contains('clicked')){
                values.classList.remove('clicked');
            }
        })
        value.classList.add('clicked');
        document.querySelector('.main__picture').childNodes[0].src = `${value.childNodes[0].src}`;
    }
})


document.querySelector('.main__header').childNodes[1].classList.add('active');
document.getElementById('about').style.display = "flex";
document.querySelector('.example-slider__item').classList.add('clicked');
let check = false;



document.querySelector('.accurate__links').childNodes.forEach(value => {
    value.onclick = () => {
        accordion(value, '81px', true);
    }
})

let commentMass = [];

let requestURL = './js/comments.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    let comments = request.response;
    let json = JSON.parse(JSON.stringify(comments));
    Object.values(json).forEach(value => {
        //commentMass.push([value.name, value.date, value.rate, value.text])
        commentMass.push(value)
    })

    generateComments(commentMass, -1, document.getElementById('comment').childNodes[3]);
    document.getElementById('comment').childNodes[3].style.maxHeight = 'none';
    document.getElementById('comment').childNodes[3].style.overflow = 'none';

    document.querySelector('.comments__button').onclick = () => {
        accordion('comments__block', '391px');
    }
}

function generateComments(mass, count = -1, blocks = false) {
    if (check === false) {
        mass.forEach((value, index) => {
            if (index > count) {
                let block = document.createElement('div');
                block.classList.add('comments__item');
                let info = document.createElement('div');
                info.classList.add('comments__info');
                let name = document.createElement('div');
                name.classList.add('comments__name');
                name.textContent = `${value.name}`;
                let span = document.createElement('span');
                span.textContent = `${value.date}`;
                name.append(span);
                let stars = document.createElement('div');
                stars.classList.add('comments__stars');
                for (let x = 0; x < 5; x++) {
                    let ns = 'http://www.w3.org/2000/svg';
                    let svg = document.createElementNS(ns, 'svg');
                    svg.setAttributeNS(null, 'width', '16px');
                    svg.setAttributeNS(null, 'height', '14px');
                    stars.append(svg);
                    let path = document.createElementNS(ns, 'path');
                    path.setAttributeNS(null, 'id', 'svg_1');
                    path.setAttributeNS(null, 'fill', '#FFA800');
                    path.setAttributeNS(null, 'd', 'm3.59246,13.9993c-0.05485,0 -0.10971,-0.0168 -0.15581,-0.0502c-0.08161,-0.0589 -0.12241,-0.1586 -0.10519,-0.2572l0.81904,-4.73859l-3.46878,-3.35552c-0.07207,-0.06996 -0.09803,-0.17436 -0.06703,-0.2693c0.03127,-0.09521 0.11419,-0.16464 0.21409,-0.1791l4.79339,-0.69141l2.14392,-4.31123c0.04451,-0.08994 0.13673,-0.14675 0.23742,-0.14675c0.10095,0 0.19316,0.05681 0.23741,0.14675l2.14368,4.31123l4.7937,0.69141c0.0999,0.01446 0.1825,0.08363 0.2141,0.1791c0.031,0.09494 0.0053,0.19961 -0.0671,0.2693l-3.4688,3.35604l0.8188,4.73837c0.0169,0.0986 -0.0239,0.1983 -0.1052,0.2572c-0.0816,0.0594 -0.19,0.067 -0.2793,0.02l-4.28729,-2.2371l-4.28785,2.2371c-0.03868,0.0199 -0.08107,0.0299 -0.1232,0.0299z');
                    svg.append(path);
                    if (value.rate - 1 < x) {
                        path.setAttributeNS(null, 'opacity', '0.5');
                    }
                }
                info.append(name, stars);
                let p = document.createElement('p');
                p.classList.add('comments__text');
                p.textContent = `${value.text}`;
                block.append(info, p);
                if (!blocks) {
                    document.querySelector('.comments__block').append(block);
                } else {
                    blocks.append(block);
                }
            }
        })
    } else {
        for (let x = 0; x < mass.length - 3; x++) {
            document.querySelector('.comments__block').lastChild.remove();
        }
    }
}


function accordion(event, value, change = false) {
    let block;
    if(typeof(event)==='string'){
        block = document.querySelector(`.${event}`)
    } else {
        block = event;
    }
    console.log(block)
    if(change === true) {
        if (block.classList.contains('close')) {
            block.classList.remove('close');
            block.classList.add('open');
            block.childNodes[1].style.maxHeight = block.childNodes[1].scrollHeight + "px";
        } else if (block.classList.contains('open')) {
            block.classList.remove('open');
            block.classList.add('close');
            block.childNodes[1].style.maxHeight = `${value}`;
        }
    } else {
        generateComments(commentMass, 2);
        if (check === false) {
            block.style.maxHeight = block.scrollHeight + "px";
            check = !check;
        } else {
            block.style.maxHeight = `${value}`;
            check = !check;
        }
    }
}

