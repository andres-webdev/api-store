const app = require('../src/index')
const request = require('supertest');
const { validateProductData, validateProductDataToUpdate } = require('../src/api/services/productsService')

const initialValues = [
  {
    "id": "BC0770",
    "name": "Five Ten Kestrel Lace Mountain Bike Shoes",
    "price": 150,
    "discount": 10,
    "color": "Grey",
    "idCategory": 1,
    "idLocation": 1,
    "breadcrumbs": "Women/Clothing",
    "description": "Lace up and get after it. The Five Ten Kestrel Lace Mountain Bike Shoes offer efficient pedal power with low-profile style. The wide platform is compatible with all clipless pedals and offers high-friction grip on and off the bike.",
    "brand": "Adidas",
    "image1": "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg",
    "image2": "https://assets.adidas.com/images/w_600,f_auto,q_auto/91b253099ece4b6c8b5fa9fa0116a5a1_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_04_standard.jpg",
    "image3": "https://assets.adidas.com/images/w_600,f_auto,q_auto/a2b39ff910204553af50a9fa0116b3a0_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_05_standard.jpg",
    "averageRating": 4, 
    "brand": "Adidas",
    "currency": "USD",
    "availability": "In Stock",
  },
]

const newProduct = {
    "id": "BC0770",
    "name": "Five Ten Kestrel Lace Mountain Bike Shoes",
    "price": 432,
    "discount": 32,
    "color": "Grey",
    "currency": "USD",
    "availability": "In Stock",
    "idCategory": 2,
    "idLocation": 1,
    "breadcrumbs": "Men/Clothing",
    "description": "Lace up and get after it. The Five Ten Kestrel Lace Mountain Bike Shoes offer efficient pedal power with low-profile style. The wide platform is compatible with all clipless pedals and offers high-friction grip on and off the bike.",
    "brand": "Adidas",
    "image1": "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg",
    "image2": "https://assets.adidas.com/images/w_600,f_auto,q_auto/91b253099ece4b6c8b5fa9fa0116a5a1_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_04_standard.jpg",
    "image3": "https://assets.adidas.com/images/w_600,f_auto,q_auto/a2b39ff910204553af50a9fa0116b3a0_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_05_standard.jpg",
    "averageRating": 4
}

const testProduct = {
  "id": "BC0770",
  "price": 432,
  "discount": 32,
  "idCategory": 2,
  "idLocation": 1,
  "breadcrumbs": "Men/Clothing",
}

describe('Routes /api/products', () => {

  describe('GET /', () => {

    test('Should get status 200 and Content-Type: json to main file', async () => {
      const response = await request(app)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
    });

    test('Should get an array', async() => {
      const response = await request(app).get('/api/products')
      expect(response.body).toBeInstanceOf(Array)
    });

    describe('GET /:id', () => {
      
      test('Should get an product on database', async () => {
        const response = await request(app)
          .get('/api/products/BC0770')
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
      })

      test('Should get an status 404 for an unnexisting product on database', async () => {
        const response = await request(app)
          .get('/api/products/BC077023213123sssd')
          .set('Accept', 'application/json')
          .expect(404)
      })
    })

    describe('GET /name/:name', () => {
      
      test('Should get an status 404 for an unnexisting product on database', async () => {
        const response = await request(app)
          .get('/api/products/name/Five Ten Kestrel Lace Mountain Bike Shoes XXXX')
          .set('Accept', 'application/json')
          .expect(404)
      })

      test('Should get an product on database by name', async () => {
        const response = await request(app)
          .get('/api/products/name/Five Ten Kestrel Lace Mountain Bike Shoes')
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
    });

    describe('GET /orderByLocation/:idLocation', () => {
      
      test('Should get products on database by idLocation', async () => {
        const response = await request(app)
          .get('/api/products/orderByLocation/:idLocation')
          .set('Accept', 'application/json')
          .expect(200)
      })
    }) 
    
    describe('GET /orderByCategory/:idCategory', () => {
      
      test('Should get products on database by idCategory', async () => {
        const response = await request(app)
          .get('/api/products/orderByCategory/:idCategory')
          .set('Accept', 'application/json')
          .expect(200)
      })
    })
    })
  })

  describe('POST /', () => {

    test('Should insert a new product with an new id on database', async () => {
      const response = await request(app)
        .post('/api/products')
        .send(initialValues[0])
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
    });

    test('Should insert an object', async () => {
      const response = await request(app)
        .post('/api/products')
        .send([
          {id: 'no-valido', name: 'no-valido'}, 
          {id: 'no-valido', name: 'no-valido'}
        ])
        .set('Accept', 'application/json')
        .expect(404)
    })

    test('Should not insert an empty object', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({})
        .set('Accept', 'application/json')
        .expect(404)
    });

    test('Should insert an object with at least 5 properties(id, name, price, idCategory, idLocation)', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          "idLocation": 1,
          "id": "DRS1234",
          "name": "no-working",
          "description": "no working",
        })
        .set('Accept', 'application/json')
        .expect(404)
    })
  })

  describe('PUT /', () => {

    test('Should update a product with status 200 and content-type: json', async () => {
      const response = await request(app)
        .put('/api/products')
        .send({
          "id": 'BC0770',
          "price": 432,
          "idCategory": 1,
          "idLocation": 1,
          "brand": "Adidas",
          "averageRating": 4
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
    });

    test('Should update an object', async () => {
      const response = await request(app)
        .put('/api/products')
        .send([
          {id: 'no-valido', name: 'no-valido'}, 
          {id: 'no-valido', name: 'no-valido'}
        ])
        .set('Accept', 'application/json')
        .expect(404)
    })

    test('Should not update an empty object', async () => {
      const response = await request(app)
        .put('/api/products')
        .send({})
        .set('Accept', 'application/json')
        .expect(404)
    });

    test('Should send an object with id property', async () => {
      const response = await request(app)
        .put('/api/products')
        .send({
          "name": "Andres Marquez",
          "price": 30,
          "discount": 0,
          "color": "Black",
          "idCategory": 1,
          "idLocation": 1,
          "breadcrumbs": "Men/Clothing",
        })
        .set('Accept', 'application/json')
        .expect(404)
    })

  })

  describe('DELETE /deleteProduct/:id', () => {
    
    test('Should delete an unexisting product with id status 404', async () => {
      const response = await request(app)
        .delete('/api/products/deleteProduct/YYYYY!')
        .expect(404)
    });

    test('Should delete an available product with and id status 200', async () => {
      const response = await request(app)
        .delete('/api/products/sdeleteProduct/YYYYY!') // add an existing id product
        .expect(404) // change to status 200
    });
  })

  describe('Services handle products', () => {

    describe('Validate product data', () => {

      test('Validate data product an verify if it is not an object', () => {
        expect(() => validateProductData(['prueba1','prueba2'])).toThrow()
      })

      test('Validate data product if it has id property', () => {
        expect(() => validateProductData({})).toThrow()
      })

      test('Validate data product if it has 5 or more properties', () => {
        expect(() => validateProductData(testProduct)).toThrow()
      })

      test('Validate and compare old and new data', () => {
        expect(validateProductDataToUpdate(initialValues[0],testProduct)).toMatchObject(newProduct)
      })
    })
  })
})
