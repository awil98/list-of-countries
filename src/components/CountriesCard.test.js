import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import CountriesCard from './CountriesCard.js'

const country =
  {
    "currencies":[{"code":"AFN","name":"Afghan afghani","symbol":"؋"}],"name":"Afghanistan","region":"Asia"
  }

describe('Countries Card Component Renders Correctly',()=>{

  it('Component Renders Correct Name', ()=>{

    const { getByTestId } = render(<CountriesCard data={country}/>)

    const countryName = getByTestId("Country_Name")
    expect(countryName).toHaveTextContent('Afghanistan')
  })

  it('Component Renderes Correct Region', ()=>{

    const { getByTestId } = render(<CountriesCard data={country}/>)

    const regionName = getByTestId("Country_Region")
    expect(regionName).toHaveTextContent('Asia')
  })
})
