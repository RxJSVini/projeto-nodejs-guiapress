class errorController {
  async error(req, res) {
    return res.render('admin/index')
  }
}

module.exports = new errorController();