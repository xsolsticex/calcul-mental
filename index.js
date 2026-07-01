let table = document.getElementById("table");
let generateBtn = document.getElementById("generate");
let result = document.getElementById("result");
let validate = document.getElementById("validar");
let fiveCounter = 0;
let reiniciar = document.getElementById("refresca");
let sixCounter = 0;
let p = document.getElementById("points");
let max = 6;
let min = 5;

let aciertos = 0;
let puntos = 5;
let ids = []


function getRandomResult() {
    return Math.floor(Math.random() * 100) + 1
}

function getRandomInt() {

    if (sixCounter === 4) {
        fiveCounter++;
        return 5;
    }

    if (fiveCounter === 5) {
        sixCounter++;
        return 6;
    }


    const mult = Math.random() < 0.5 ? 5 : 6;

    if (mult === 5) {
        fiveCounter++;
    } else {
        sixCounter++;
    }

    return mult;

}


function calcPoints() {
    if (aciertos < 5) {
        return puntos * 1;
    } else if (aciertos > 5) {
        return puntos * 1.5
    } else {
        return puntos * 1.8
    }
}


function generateRepeat(number, repeat) {
    let cadena = "";
    for (let index = 0; index < repeat; index++) {
        cadena += number;
    }

    return cadena;
}


function shuffler(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        // Intercambiar elementos
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;

}

function generateNumbers() {
    let list = [];
    let result = "";
    fiveCounter = 0;
    sixCounter = 0;

    for (let index = 1; index < 10; index++) {
        let multiplier = getRandomInt();
        let cadena = generateRepeat(index, multiplier);
        result += cadena;
    }

    return result.split('').map(Number);

}

function removeId(id) {

    if (ids.includes(id)) {
        ids = ids.filter(x => x !== id);
    }
    validate.style.opacity = ids.length > 2 ? 1 : 0;
    console.log(ids)
}

function addId(id) {
    if (!ids.includes(id)) {
        ids.push(id);
        console.log(`Id añadida ${id}`);
    }
    validate.style.opacity = ids.length > 2 ? 1 : 0;
    console.log(ids)
}

function getColor(value) {

    switch (value) {
        case 1:
            return "#2563EB"
            break;
        case 2:
            return "#14B8A6"
            break;
        case 3:
            return "#22C55E"
            break;
        case 4:
            return "#F59E0B"
            break;
        case 5:
            return "#F97316"
            break;
        case 6:
            return "#EC4899"
            break;
        case 7:
            return "#8B5CF6"
            break;
        case 8:
            return "#EF4444"
            break;
        case 9:
            return "#374151"
            break;

        default:
            break;
    }
}

function createTable(data) {
    let elements = document.createDocumentFragment();
    for (let index = 0; index < data.length; index++) {
        var element = document.createElement("div");
        var sp = document.createElement("span");
        var color = getColor(data[index]);
        element.style.background = color;
        sp.textContent = data[index];
        sp.style.color = "white";
        element.appendChild(sp);
        element.id = index;
        element.classList.add("button")
        element.addEventListener("click", (data) => {
            let element = data.currentTarget;

            if (element.classList.contains("selected")) {
                element.classList.remove(["selected"]);
                removeId(element.id);
            } else {
                element.classList.add("selected");
                addId(element.id);
                if (ids.length > 1) {
                    console.log("Verificando B");
                    if (esVecino(ids[0], ids[1])) {

                    } else {
                        element.classList.add("no-vecino");
                        setTimeout(() => {
                            element.classList.remove("selected", "no-vecino");
                            removeId(element.id);
                        }, 1000)


                    }
                }
                if (ids.length > 2) {
                    console.log("Verificando C");
                    if (esVecino(ids[1], ids[2]) || esVecino(ids[0], ids[2])) {
                        validate.style.opacity = ids.length > 2 ? 1 : 0;

                    } else {
                        element.classList.add("no-vecino");
                        setTimeout(() => {
                            element.classList.remove("selected", "no-vecino");
                            removeId(element.id);

                        }, 1000)


                    }
                }


            }


            let value = element.textContent;
        })
        elements.appendChild(element);



    }
    table.appendChild(elements);

}

function esVecino(n1, n2) {
    var id1 = Number(n1);
    var id2 = Number(n2);

    // Arriba o abajo
    if (Math.abs(id1 - id2) === 7) return true;

    // Izquierda o derecha
    if (Math.abs(id1 - id2) === 1) {
        return Math.floor(id1 / 7) === Math.floor(id2 / 7);
    }

    //Diagonal
    if ((Math.abs(id1 - id2) === 8) || (Math.abs(id1 - id2) === 6)) return true;

    return false;

}

validate.addEventListener("click", () => {
    let a = document.getElementById(ids[0]);
    let b = document.getElementById(ids[1]);
    let c = document.getElementById(ids[2]);
    check(parseInt(a.textContent), parseInt(b.textContent), parseInt(c.textContent))
})

function check(n1, n2, n3) {
    let firstRes = (n1 * n2) + n3;
    let secondRes = (n1 * n2) - n3;
    let value = parseInt(result.textContent);

    if (firstRes == value || secondRes == value) {
        console.log("Resultado Valido!");
        let points = calcPoints();
        showModal("correcte");
        var current = parseInt(p.textContent);
        var newPoint = current + points;
        p.textContent = newPoint;

    } else if (vidas.children.length > 1) {
        console.log("Resultado no valido!")
        showModal("incorrecte");
    } else {
        console.log("Resultado no valido!")
        showModal("fin");
    }


}

function showModal(status) {
    let modal = document.getElementById("modal");
    let checker = document.getElementById("checker");
    checker.textContent = status.toUpperCase();
    switch (status) {
        case "correcte":
            checker.style.color = "green";
            break;
        case "incorrecte":
            checker.style.color = "red";
            break;
        case "fin":
            status = "has perdido"
            checker.textContent = status.toUpperCase();
            checker.style.color = "red";
        default:
            break;
    }

    modal.classList.add("shown");

    setTimeout(() => {
        modal.classList.remove("shown");
        generateNew();
        removeVida();
        validate.style.visibility = vidas.children.length === 0 ? "hidden" : "visible";
        generateBtn.style.visibility = vidas.children.length === 0 ? "hidden" : "visible";
        reiniciar.style.visibility = vidas.children.length === 0 ? "visible" : "hidden";
        
    }, 2000);
}


reiniciar.addEventListener("click",()=>{
    location.reload();
})

function generateNew() {
    ids = []
    validate.style.opacity = ids.length > 2 ? 1 : 0;
    let number = getRandomResult();
    result.textContent = number.toString();
    table.innerHTML = ``;
    let lista = generateNumbers();
    console.log(lista);

    console.log("Desordenado");
    console.log(shuffler(lista))
    createTable(lista);
}

generateBtn.onclick = (() => {
    let number = getRandomResult();
    result.textContent = number.toString();
    generateNew();

})

let vidas = document.getElementById("vidas");

let corazones = vidas.children;

function removeVida() {
    if (vidas.children.length > 0) {
        vidas.lastElementChild.remove();
    } else {
        console.log("Ya has perdido");
    }

}

generateNew();

