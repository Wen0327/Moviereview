const express = require("express");
const {
  createActor,
  updateActor,
  removeActor,
  searchActor,
  getLatestActors,
  getSingleActor,
} = require("../controllers/actor");
const { isAuth, isAdmin } = require("../middleWares/auth");
const { uploadImage } = require("../middleWares/multer");
const { actorInfoValidator, validate } = require("../middleWares/validator");
const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);
router.post(
  "/update/:actorId",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);

router.delete("/:actorId", isAuth, isAdmin, removeActor);
router.get("/search", isAuth, isAdmin, searchActor);
router.get("/latest-uploads", isAuth, isAdmin, getLatestActors);
router.get("/single/:id", getSingleActor);

module.exports = router;
