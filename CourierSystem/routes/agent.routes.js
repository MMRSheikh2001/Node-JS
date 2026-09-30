

const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');
const { createImageUploader } = require('../utils/fileUpload');

const upload = createImageUploader('agent');

router.post('/', upload.single('image'), agentController.create);          // Create (creates User + Agent)
router.get('/', agentController.findAll);                                   // Read all
router.get('/hub/:hubId', agentController.findByHubId);                     // Read all agents at a hub
router.get('/user/:userId', agentController.findByUserId);                  // Read one by user id
router.get('/:id', agentController.findOne);                                 // Read one by agent id
router.put('/:id', upload.single('image'), agentController.update);          // Update
router.delete('/:id', agentController.remove);                               // Delete

module.exports = router;