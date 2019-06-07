const express = require("express");
const router = express.Router();
const projectdb = require("../data/helpers/projectModel");
const actiondb = require("../data/helpers/actionModel")

router.use(express.json());

router.get('/:projectId', (req, res) => {
    const { projectId } = req.params
    projectdb
      .getProjectActions(projectId)
      .then(action => {
       res.status(200).json(action)
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "error retrieving actions" });
      });
  });
   
  router.post('/:projectId', (req, res) => {
      const { projectId } = req.params
      actiondb
      .insert(projectId, req.body)
      .then(addedAction => {
        res.status(201).json(addedAction)
      })
      .catch(error => {
          console.log(error);
        res.status(500).json({ message: 'Error adding new action.'})
      })
  })

module.exports = router;
