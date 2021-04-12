const Category = require('./Category');
class SaveController {
  async save(req, res) {
    const title = req.body.title;
    if (title != undefined) {
      console.log(req.body.title)
      const retorno = await res.json({ message: 'Controller que salva' })
      return retorno;
    } else {
      const retorno = await res.redirect('/admin/categories/new');
      console.log(`Eu acho que é ${req.body.title}`)
      return retorno;
    }
  }
}
module.exports = new SaveController();