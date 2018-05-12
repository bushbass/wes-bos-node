
exports.homePage = (req, res) => {
    res.render('index', {name: req.name})
}

exports.addStore= (req,res) => {
    res.render('editStore', {
        title: "Add store"
    })
}

exports.createStore = (req, res) => {
res.json(req.body)
}