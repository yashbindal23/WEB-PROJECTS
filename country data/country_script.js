const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.flag_img')
const countryNameElement = document.querySelector('.country_name')
const nativeName = document.querySelector('.native')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub_region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top_level_domain')
const currency = document.querySelector('.currency')
const language = document.querySelector('.language')
const borderCountries = document.querySelector('.border_country')
const backBtn = document.querySelector('.back_btn')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        flagImage.src = country.flags.svg

        countryNameElement.innerText = country.name.common

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        }
        else {
            nativeName.innerText = 'None'
        }

        population.innerText = country.population.toLocaleString('en-IN')

        region.innerText = country.region

        if (country.subregion) {
            subRegion.innerText = country.subregion
        }
        else {
            subRegion.innerText = 'None'
        }

        if (country.capital) {
            capital.innerText = country.capital
        }
        else {
            capital.innerText = 'None'
        }

        topLevelDomain.innerText = country.tld

        currency.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')

        language.innerText = Object.values(country.languages).join(', ')

        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([countryborder]) => {
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = countryborder.name.common
                        console.log(countryborder.name.common)
                        borderCountries.append(borderCountryTag)
                        borderCountryTag.href = `country_page.html?name=${countryborder.name.common}`
                    })
            })
        }
    })


    backBtn.addEventListener("click", function () {
        history.back()
 });