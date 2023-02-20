const express = require("express");
const movies = require("../db/movies");
const moviesSchema = require("../db/movies");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     movies:
 *       type: object
 *       required:
 *         - movieTitle
 *         - director
 *         -releaseDate
 *         -rating
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         movieTitle:
 *           type: string
 *           description: movieTitle
 *         director:
 *           type: string
 *           description: director
 *       example:
 *         id: d5fE_asz
 *         title: thunivu
 *         director: h vinodh
 */

/**
 * @swagger
 * /movies/allmovies:
 *   get:
 *     summary: Returns the list of all the movies
 *     tags: [movies]
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/movies'
 */
// ........all movies............//
router.get("/allmovies", (req, res) => {
  moviesSchema
    .find()
    .select("-createdAt -__v")
    .then((result) => {
      res.status(200).json({ message: result, error: false });
    })
    .catch((err) => {
      res.status(400).res.json({ messsage: err.message, error: true });
    });
});
//.............add a movies....///

/**
 * @swagger
 * /movies/addmovies:
 *   post:
 *     summary: add new movies
 *     tags: [movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/movies'
 *     responses:
 *       200:
 *         description: The movie was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/movies'
 *       500:
 *         description: Some server error
 */
router.post("/addmovies", (req, res) => {
  const { movieTitle, director, releaseDate, rating } = req.body;

  if (!movieTitle || !director || !releaseDate || !rating) {
    res.status(400).json({ message: "Please enter all fields", error: true });
    return;
  }

  moviesSchema
    .create({ movieTitle, director, releaseDate, rating })
    .then((result) => {
      res
        .status(200)
        .json({ message: "movies added successfully", error: false });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res
          .status(500)
          .json({ message: "movie already exist in database", error: true });

        return;
      }
      res.status(500).json({ message: err.message, error: true });
    });
});

/**
 * @swagger
 * /movies/movieslist/{id}:
 *   get:
 *     summary: get the movie by id
 *     tags: [movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: movies list
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/movies'
 *       404:
 *         description: this movie is not available
 */
router.get("/movieslist/:id", (req, res) => {
  moviesSchema
    .findById(req.params.id)
    .select("-createdAt -__v")
    .then((result) => {
      res.status(200).json({ message: result, error: false });
    })
    .catch((err) => {
      res.status(404).json({ message: "invalid movie id", error: true });
    });
});

/**
 * @swagger
 * /movies/update{id}:
 *  put:
 *    summary: Update a movie
 *    tags: [movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The movie id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/movies'
 *    responses:
 *      200:
 *        description: updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/movies'
 *      404:
 *        description: not found
 *      500:
 *        description: Some error happened
 */
// ......update movies.....//
router.put("/update/:id", (req, res) => {
  const updateMovies = {
    movieTitle: req.body.movieTitle,
    director: req.body.director,
    releaseDate: req.body.releaseDate,
    rating: req.body.rating,
  };

  moviesSchema
    .findByIdAndUpdate(req.params.id, { $set: updateMovies })
    .then((result) => {
      res.status(200).json({ message: "updated successfully", error: false });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res
          .status(409)
          .json({ message: "movie already exist in database", error: true });

        return;
      }
      res.status(404).json({ message: "invalid movie id", error: true });
    });
});
// .........delete movies........//
/**
 * @swagger
 * /movies/delete/{id}:
 *   delete:
 *     summary: Remove the movie
 *     tags: [movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: deleted successfully
 *
 *     responses:
 *       200:
 *         description: The movie was deleted
 *       404:
 *         description: not found
 */

router.delete("/delete/:id", (req, res) => {
  moviesSchema
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(200).json({ message: "deleted successfully", error: false });
    })
    .catch((err) => {
      res.status(404).json({ message: err.message, error: true });
    });
});

module.exports = router;
