const pokemonList = document.getElementById('pokemonList')
const regionList = document.getElementById('regionList')
const loadMoreButton = document.getElementById('loadMoreButton')
const nextGenerationButton = document.getElementById('nextGenerationButton')
const backGenerationButton = document.getElementById('backGenerationButton')

let maxRecords = 151
let offset = 0;
let region = 1;
const limit = 12
const maxRegion = 5;

backGenerationButton.style.display = 'none'
getRegion(region)
loadPokemonItens(offset, limit)

function getRegion(region) {
    switch (region) {
        case 1:
            regionList.innerHTML = `Pokedex of region: Kanto`
            break;
        case 2:
            regionList.innerHTML = `Pokedex of region: Johto`
            break;
        case 3:
            regionList.innerHTML = `Pokedex of region: Hoenn`
            break;
        case 4:
            regionList.innerHTML = `Pokedex of region: Sinnoh`
            break;
        case 5:
            regionList.innerHTML = `Pokedex of region: Unova`
            break;
        default:
            regionList.innerHTML = `Pokedex`
            break;
    }
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

nextGenerationButton.addEventListener('click', () => {
    pokemonList.innerHTML = ''  
        if (region === 1) {            
            offset = 151
            maxRecords = 251
            region++
            backGenerationButton.style.display = 'block'
            loadMoreButton.style.display = 'block'
        }
        else if (region === 2) {
            offset = 251
            maxRecords = 386
            region++
            loadMoreButton.style.display = 'block'
        }
        else if (region === 3) {
            offset = 386
            maxRecords = 493
            region++
            loadMoreButton.style.display = 'block'
        }
        else if (region === 4) {
            offset = 493
            maxRecords = 649
            region++
            loadMoreButton.style.display = 'block'
            nextGenerationButton.style.display = 'none'
        }
        else {
            alert('Erro inesperado! Atualize o navegador!')
        }

        getRegion(region)
        loadPokemonItens(offset, limit)
})

backGenerationButton.addEventListener('click', () => {
    pokemonList.innerHTML = ''
        if (region === 5) {
            offset = 386
            maxRecords = 493
            region--
            nextGenerationButton.style.display = 'block'
        }
        else if (region === 4) {
            offset = 251
            maxRecords = 386
            region--
        }
        else if (region === 3) {
            offset = 151
            maxRecords = 251
            region--
        }
        else if (region === 2) {
            offset = 0
            maxRecords = 151
            region--
            backGenerationButton.style.display = 'none'
        }
        else {
            alert('Erro inesperado! Atualize o navegador!')
        }

        getRegion(region)
        loadPokemonItens(offset, limit)
})

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.style.display = 'none'
    } else {
        loadPokemonItens(offset, limit)
    }
})