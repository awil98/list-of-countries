import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';


describe('Input element functions correctly', ()=>{

  test('typing updates value', () => {

    const { getByTestId } = render(<App />);
    const inputElement = getByTestId("country-input")

    userEvent.type(inputElement, 'America')
    expect(inputElement).toHaveValue('America')

  });

  test('typing triggers function', ()=>{
    const onChange = jest.fn()

    render(<input type="text" onChange={onChange}/>)

    const inputElement = screen.getByRole("textbox")

    userEvent.type(inputElement, 'America')
    expect(onChange).toHaveBeenCalledTimes(7)

  })
})
