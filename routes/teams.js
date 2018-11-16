const express = require('express');
const router = express.Router();
const { Team } = require('../database/models');

// Find all the teams;
router.get('/', function(req, res, next) {
  Team.findAll()
    .then(team => res.json(team))
    .catch(next)
});


router.get('/:id/coach', async (req, res, next) => {
  let foundTeam;

  try {
    foundTeam = await Team.findOne({where: { id: req.params.id }});
  }
  catch (err) {
    next(err);
  }

  let coachOfTeam;

  try {
    coachOfTeam = await foundTeam.getCoach();
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(coachOfTeam);
});

// Find a particular team and eager load all players who belong on/share the same team;
router.get('/:id/players', async function(req, res, next) {
  let foundTeam;

  try {
    foundTeam = await Team.findOne({ where: { id: req.params.id } });
  }
  catch (err) {
    next(err);
  }

  let playersOfTeam;

  try {
    playersOfTeam = await foundTeam.getPlayers();
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(playersOfTeam);
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
