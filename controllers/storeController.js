const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {

  res.render("index", { name: req.name });
};

exports.addStore = (req, res) => {
  res.render("editStore", {
    title: "Add store"
  });
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  await store.save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`)
  console.log('it worked')
};

exports.getStores = async (req, res) => {
  // get all stores from database
  const stores = await Store.find();
  res.render( 'stores', { title: 'Stores', stores: stores})
}

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id })
  res.render('editStore', { title: `Edit ${store.name}`, store})
}

exports.updateStore = async (req, res) => {
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true}).exec()
req.flash('success', `Successfully updated <strong> ${store.name}</stong>. <a href="/stores/${store.slug}">View store </a>`)
  res.redirect(`/stores/${store._id}/edit`)
}