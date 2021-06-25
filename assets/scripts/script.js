const estados = [];
const modalWrapper = document.querySelector(".modal-wrapper")

const fetchSvg = (image) => {
    fetch(image.src)
        .then((response) => response.text())
        .then((response) => {
            const span = document.createElement('span');
            span.innerHTML = response;
            const inlineSvg = span.getElementsByTagName('svg')[0];
            image.parentNode.replaceChild(inlineSvg, image);
            return true;
        })
        .then(() => { getActions(); });
};

const getActions = () => {
    const states = document.getElementsByClassName('estado');
    for(let i = 0; i < states.length; i++) {
        states[i].onclick = () => { stateClicked(states[i]); };
    }
    getEstados();
};

const getEstados = () => {
    fetch('/scripts/states.json')
        .then((response) => response.text())
        .then((response) => {
            estados.push(...JSON.parse(response));
        });
};

const stateClicked = (state) => {
    const code = state.getAttribute('code');
    const uf = estados.find(estado => estado.code === code);
    if (!uf) return;
    openModal();
    fillContent(uf);
};

const fillContent = ({ name, postalCode, description, area, population, capital }) => {
    const nameLabel = document.getElementById('state-name');
    const descriptionLabel = document.getElementById('state-description');
    const areaLabel = document.getElementById("state-area")
    const populationLabel = document.getElementById('state-population');
    const capitalLabel = document.getElementById("state-capital")
    
    nameLabel.innerText = `${name} (${postalCode})`;
    descriptionLabel.innerText = description;
    areaLabel.innerText = `${area} km²`
    populationLabel.innerText = `${population} hab`;
    capitalLabel.innerText = capital
};

function openModal(){
   modalWrapper.classList.add("active")
}

function closeModal(){
   modalWrapper.classList.remove("active")
}