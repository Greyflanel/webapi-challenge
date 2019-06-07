const express = require('express');
const router = express.Router();

router.use(express.json());

const projectdb = require('../data/helpers/projectModel.js');



router.get('/', (req, res) => {
    projectdb.get()
    .then(allProjects => {
        res.json(allProjects)
    })
    .catch(error => {
        res.status(500).json({ message: 'error retrieving projects'})
    })
})

router.post('/', (req, res) => {
    projectdb.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'error adding new project'})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectdb.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        console.log(error);
    })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectdb.remove(id)
    .then(deletedProject => {
        res.status(202).json(deletedProject)
    })
    .catch(error => {
        console.log(error);
        
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    
    projectdb.update(id, req.body)
    .then(updatedProject => {
        res.json(updatedProject)
    })
    .catch(error => {
        console.log(error);
        
    })
})

// router.get('/actions', (req, res) => {
//     const projectId = req.body
//     projectdb
//       .getProjectActions(projectId)
//       .then(action => {
//        res.status(200).json(action)
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({ message: "error retrieving actions" });
//       });
//   });

router.get('/actions', async (req, res) => {
    try {
    const projectId  = req.body
    const posts = await projectdb.getProjectActions(projectId);
    res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;