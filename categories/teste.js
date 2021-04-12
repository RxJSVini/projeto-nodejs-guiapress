const Category = require('./Category');

Category.findAll()
  .then((categories) => {
    categories.forEach(categorie => {
      console.log(categorie.createdAt)
    })
  })