import request from 'supertest'
import app from './helpers/getAppInstance'

describe('Get benefits by cpf e2e tests', () => {
  it('Should can run in parralel', async () => {
    const firstPromise = request(app).post('/benefits').send({
      cpf: '1',
      login: 'testekonsi',
      password: 'testekonsi',
    })

    const secondPromise = request(app).post('/benefits').send({
      cpf: '1',
      login: 'testekonsi',
      password: 'testekonsi',
    })

    const [firstResponse, secondResponse] = await Promise.all([
      firstPromise,
      secondPromise,
    ])

    expect(firstResponse.body).toEqual({
      benefitsNumbers: ['Matrícula não encontrada!'],
    })
    expect(firstResponse.status).toEqual(200)
    expect(secondResponse.body).toEqual({
      benefitsNumbers: ['Matrícula não encontrada!'],
    })
    expect(secondResponse.status).toEqual(200)
  })

  it('Should continue running the crawler if another page throws', async () => {
    const firstPromise = request(app).post('/benefits').send({
      cpf: '1',
      login: 'testekonsi',
      password: 'invalidtestekonsi',
    })

    const secondPromise = request(app).post('/benefits').send({
      cpf: '1',
      login: 'testekonsi',
      password: 'testekonsi',
    })

    const [firstResponse, secondResponse] = await Promise.all([
      firstPromise,
      secondPromise,
    ])

    expect(firstResponse.body.message).toEqual('Verify user and password')
    expect(firstResponse.status).toEqual(400)
    expect(secondResponse.body).toEqual({
      benefitsNumbers: ['Matrícula não encontrada!'],
    })
    expect(secondResponse.status).toEqual(200)
  })

  it('Should return badRequestError if login or password is invalid', async () => {
    const invalidPasswordPromise = request(app).post('/benefits').send({
      cpf: '1',
      login: 'testekonsi',
      password: 'invalidtestekonsi',
    })

    const invalidLoginPromise = request(app).post('/benefits').send({
      cpf: '1',
      login: 'invalidtestekonsi',
      password: 'testekonsi',
    })

    const [invalidPasswordResponse, invalidLoginResponse] = await Promise.all([
      invalidPasswordPromise,
      invalidLoginPromise,
    ])

    expect(invalidPasswordResponse.body.message).toEqual(
      'Verify user and password'
    )
    expect(invalidPasswordResponse.status).toEqual(400)
    expect(invalidLoginResponse.body.message).toEqual(
      'Verify user and password'
    )
    expect(invalidLoginResponse.status).toEqual(400)
  })

  // it.todo('Should return the benefits when have') nao tinha cpf com beneficios quando fiz os testes
  it('Should return "matricula não encontrada!" when dont have benefits', async () => {
    const { body, status } = await request(app).post('/benefits').send({
      cpf: '1',
      login: 'testekonsi',
      password: 'testekonsi',
    })

    expect(body).toEqual({ benefitsNumbers: ['Matrícula não encontrada!'] })
    expect(status).toEqual(200)
  })
})
