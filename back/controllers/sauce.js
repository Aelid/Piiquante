const Sauce = require("../models/sauce");
const fs = require("fs");

// Récupérer les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Récupérer une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Créer une sauce
exports.createSauce = (req, res, next) => {
  let sauceObject;

  try {
    sauceObject =
      typeof req.body.sauce === "string"
        ? JSON.parse(req.body.sauce)
        : req.body.sauce;
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }

  delete sauceObject._id;

  const imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : `${req.protocol}://${req.get("host")}/images/default.jpg`;

  const sauce = new Sauce({
    ...sauceObject,
    imageUrl,
  });

  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error.message });
    })};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = { ...req.body };

  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce not found" });
      }

      if (sauce.userId !== req.auth.userId) {
        return res.status(403).json({ message: "Unauthorized request" });
      }

      return Sauce.deleteOne({ _id: req.params.id });
    })
    .then(() => res.status(200).json({ message: "Sauce deleted !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

// Liker/Disliker une sauce
exports.likeOrDislike = (req, res) => {
  if (req.body.like === 0) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // On vérifie que l'utilisateur n'a pas déjà liké la sauce
        if (sauce.usersLiked.includes(req.auth.userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
            .then(() => res.status(200).json({ message: "Like supprimé !" }))
            .catch((error) => {
              res.status(500).json({ error });
            });
        }
        // On vérifie que l'utilisateur n'a pas déjà disliké la sauce
        if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
            .then(() => res.status(200).json({ message: "Dislike supprimé !" }))
            .catch((error) => {
              res.status(500).json({ error });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
  // Liker la sauce
  if (req.body.like === 1) {
    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
      .then(() => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
  // Disliker la sauce
  if (req.body.like === -1) {
    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
      .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};