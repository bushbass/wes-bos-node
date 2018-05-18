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