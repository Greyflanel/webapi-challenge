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
    //   console.log(req.body);
      const newAction = req.body
      actiondb
      .insert(newAction)
      .then(addedAction => {
        res.status(201).json(addedAction)
      })
      .catch(error => {
          console.log(error);
        res.status(500).json({ message: 'Error adding new action.'})
      })
  })

  router.delete('/:projectId', (req, res) => {
      const { projectId } = req.params
    actiondb    
    .remove(projectId)
    .then(deleteAction => {
        res.status(200).json(deleteAction)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error deleting action.'})
    })
  })

  router.put('/:projectId', (req, res) => {
      const { projectId } = req.params
      const updateAction  = req.body
      actiondb
      .update(projectId, updateAction)
      .then(updatedAction => {
          res.status(201).json(updatedAction)
      })
      .catch(error => {
          console.log(error);
        res.status(500).json({ message: 'Error updating action.'})
      })
  })

module.exports = router;
