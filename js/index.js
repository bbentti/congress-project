import {senators} from './senators.js'
import {representatives} from './representatives.js'

//combines sens and reps and simplifies data
function simplifyCongress(reps, sens) {
    let finalArray = [];

    reps.forEach((rep) => {
        let simpleRep = {
            fullName: `${rep.first_name} ${rep.last_name}`,
            title: rep.short_title,
            seniority: `${rep.seniority}`,
            party: `${rep.party}`,
            imgUrl: `https://www.govtrack.us/static/legislator-photos/${rep.govtrack_id}-100px.jpeg`
        }
        finalArray.push(simpleRep);
    })

    sens.forEach((sen) => {
        let simpleSen = {
            fullName: `${sen.first_name} ${sen.last_name}`,
            title: sen.short_title,
            seniority: `${sen.seniority}`,
            party: `${sen.party}`,
            imgUrl: `https://www.govtrack.us/static/legislator-photos/${sen.govtrack_id}-100px.jpeg`
        }
        finalArray.push(simpleSen);
    })

    return finalArray;
}

//The final, combined array
const simpleCongress = simplifyCongress(representatives, senators);

//Helper Functions
//Function to Select
function selectElement(selectString) {
    return document.querySelector(selectString)
};
//Function to Create
function createElement(createString) {
    return document.createElement(createString)
};
//Function to Append
function appendElement(baseElement, appendString) {
    baseElement.append(appendString)
};
//Create Text Node
function textNode(textString) {
    return document.createTextNode(textString)
};

//Div for Congress Grid
const congressGrid = selectElement('#congressGrid');

function renderCongress(conArr) {
    conArr.forEach((person) => {
        let conDiv = createElement('div');
        let conName = createElement('h4');
        let conNameText = textNode(person.fullName);
        let conImg = createElement('img');
        conImg.setAttribute('src', person.imgUrl);
        appendElement(conName, conNameText);
        appendElement(conDiv, conName);
        appendElement(conDiv, conImg);
        appendElement(congressGrid, conDiv)
    });
};

//Filter by Title - Senator
const senatorArr = simpleCongress.filter((person) => {
    return person.title == 'Sen.';
});

const senSort = selectElement('#senSort');

senSort.addEventListener('click', function(event) {
    event.preventDefault();
    return renderCongress(senatorArr);
});

//Filter by Title - Represenatative
const representativeArr = simpleCongress.filter((person) => {
    return person.title == 'Rep.';
});

const repSort = selectElement('#repSort');

repSort.addEventListener('click', function(event) {
    event.preventDefault();
    return renderCongress(representativeArr);
});

//Filter by Party - Republican
const partyR = simpleCongress.filter((person) => {
    return person.party == 'R';
});

const partyAffiliationR = selectElement('#partyAffiliationR');

partyAffiliationR.addEventListener('click', function(event) {
    event.preventDefault();
    return renderCongress(partyR);
});

//Filter by Party - Democrat
const partyD = simpleCongress.filter((person) => {
    return person.party == 'D';
});

const partyAffiliationD = selectElement('#partyAffiliationD');

partyAffiliationD.addEventListener('click', function(event) {
    event.preventDefault();
    renderCongress(partyD);
});

//Filter by Party - Independent
const partyI = simpleCongress.filter((person) => {
    return person.party == 'ID';
});

const partyAffiliationI = selectElement('#partyAffiliationI');

partyAffiliationI.addEventListener('click', function(event) {
    event.preventDefault();
    return renderCongress(partyI);
});

//Seniority Sort
const seniorityButton = selectElement('#seniority');

function sortSeniority(arr) {
    return arr.sort((a, b) => a.seniority - b.seniority);
    };

seniorityButton.addEventListener('click', function(event) {
    event.preventDefault();
    renderCongress(sortSeniority(simpleCongress))
})