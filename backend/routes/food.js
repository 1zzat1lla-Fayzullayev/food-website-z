const express = require("express");
const Food = require("../model/foodModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json(foods);
    console.log(foods);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.get("/:id", (req, res) => {
  const _id = req.params.id;
  Food.findOne({ _id }, (err, foods) => {
    if (err) {
      res.status(400).json({ msg: err.message });
      return;
    }
    res.status(200).json(foods);
  });
});

router.delete('/:id', (req, res) => {
  const _id = req.params.id;
  Food.deleteOne({ _id })
  .then(()=>{
    res.status(200).json({msg: "Successfully deleted"})
  })
  .catch(err => {
    res.status(400).json({msg: err.message})
  }) 
})

router.post("/add", (req, res) => {
  const newFoods = new Food(req.body);
  newFoods
    .save()
    .then(() => {
      res.status(201).json(newFoods);
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
