const express = require('express');
const controller = require('../controller/campgrounds');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router.get('/', catchAsync(controller.getCampgrounds));
router.get('/:id', catchAsync(controller.getCampgroundById));

router.get('/user/new',catchAsync(controller.newCampground));
router.post('/', catchAsync(controller.createCampground));

router.get('/:id/edit', catchAsync(controller.editCampgroundGET));
router.put('/:id', catchAsync(controller.editCampgroundPUT));
router.delete('/:id', catchAsync(controller.deleteCampground));


module.exports = router;