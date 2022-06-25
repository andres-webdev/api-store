// Products Controllers
// It creates an object to store all controllers
const productServices = {}

/*
  This function formated the properties name of the products array
  for better comprenssion in client side
*/
productServices.formatedProductsArray = (data) => {
  const formatedProduct = data.map(elem => {
    return {
      id: elem.id,
      name: elem.name,
      price: elem.sellingPrice,
      discount: elem.discount,
      color: elem.color,
      idCategory: elem.idCategory,
      idLocation: elem.idLocation,
      breadcrumbs: elem.breadcrumbs,
      description: elem.description,
      brand: elem.brand,
      image1: elem.image1,
      image2: elem.image2,
      image3: elem.image3,
      averageRating: elem.averageRating
    }
  })

  return formatedProduct
}

/*
  This function formated the properties name of the product object
  for better comprenssion in client side
*/
productServices.formatedProductObject = (data) => {
  return {
    id: data.id,
    name: data.name,
    price: data.sellingPrice,
    discount: data.discount,
    color: data.color,
    idCategory: data.idCategory,
    idLocation: data.idLocation,
    breadcrumbs: data.breadcrumbs,
    description: data.description,
    brand: data.brand,
    image1: data.image1,
    image2: data.image2,
    image3: data.image3,
    averageRating: data.averageRating
  }
}

/*
  This function validate it is an array, it includes property id and it has
  5 properties then It formated the properties name of the product for use it in database
*/
productServices.validateProductData = (data) => {
  if (Array.isArray(data)) throw Error('It is not an object')

  if (!(Object.keys(data).includes('id'))) throw Error('It does not include and id property')

  if (Object.keys(data).length < 5) throw Error('Object empty or with less than 5 properties')

  return {
    id: data.id,
    name: data.name,
    sellingPrice: data.price,
    discount: data.discount === undefined ? 0 : data.discount,
    color: data.color === undefined ? '' : data.color,
    idCategory: data.idCategory,
    idLocation: data.idLocation,
    breadcrumbs: data.breadcrumbs === undefined ? '' : data.breadcrumbs,
    description: data.description === undefined ? '' : data.description,
    brand: data.brand === undefined ? '' : data.brand,
    image1: data.image1 === undefined ? '' : data.image1,
    image2: data.image2 === undefined ? '' : data.image2,
    image3: data.image3 === undefined ? '' : data.image3,
    averageRating: data.averageRating === undefined ? 0 : data.averageRating
  }
}

/*
  This function formated the properties name of the product for
  better comprenssion in client side
*/
productServices.validateIdProduct = (id) => {
  if (!id || id === '') throw Error('No se ingreso ningun id, por favor suministrarlo')

  return id
}

module.exports = productServices
