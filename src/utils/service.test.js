import { serverCall } from './service.js'

const country = [
  {"currencies":[{"code":"AFN","name":"Afghan afghani","symbol":"؋"}],"name":"Afghanistan","region":"Asia"}
]

describe('Requested Countries', ()=>{

  it('Successful Calls Return Array Of Data', async ()=>{

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 200,
            data: country,
          }),
      })
    )

    const result = await serverCall()

    expect(result.data).toBe(country)
  })

  it('Unsuccessful Calls Return Empty Array', async ()=>{

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 500,
          }),
      })
    )

    const result = await serverCall()

    expect(result.status).toBe(500);
    expect(result.data).not.toBeDefined();
  })

})
