const countriesContainer = document.querySelector('.country_container')
const filterByRegion = document.querySelector('.filter-by-region')
let allCountriesData
const searchInput = document.querySelector('.search_container input')
const themeChanger = document.querySelector('.mode')


fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data)=>{
        render(data)
        allCountriesData = data
    })

function render(data){
    data.forEach((country) => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('country_card')
        countryCard.href = `/country_page.html?name=${country.name.common}`
        countryCard.innerHTML = `<img src="${country.flags.svg}">
                                        <div class="country_details">
                                            <h3>${country.name.common}</h3>
                                            <h4>Population: ${country.population.toLocaleString('en-IN')}</h4>
                                            <h4>Region: ${country.region}</h4>
                                            <h4>Capital: ${country.capital}</h4>
                                            <h4>Area: ${country.area}</h4>
                                        </div>`
        countriesContainer.append(countryCard)
    })
}

filterByRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res)=> res.json())
    .then((data) => {
        countriesContainer.innerHTML = ''
        render(data)
    })
})

searchInput.addEventListener('input',  (e) => {
    countriesContainer.innerHTML = ''
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    render(filteredCountries)
    console.log(filteredCountries);
  })


  themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    if(document.body.classList.contains('dark')){
        document.querySelector('.mode img').src = 'resource/light_mode_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
        document.querySelector('.mode h4').innerHTML = '&nbsp;light'
    }else{
        document.querySelector('.mode img').src = 'resource/dark_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
        document.querySelector('.mode h4').innerHTML = '&nbsp;Dark'
    }
})


  