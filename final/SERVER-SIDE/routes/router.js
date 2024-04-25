const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const ctrl = require('../controllers/userctrl')
const authIslogin = require('../middlewares/authIslogin')
const multer = require('multer');
const path = require('path');

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.urlencoded({ extended: false }))



router.post('/Login', ctrl.loginUserByEmailPass)
router.post('/register', ctrl.adduser)

router.get('/project', authIslogin, ctrl.getProjectByMid)
router.get('/project-sort', authIslogin, ctrl.getProjectByStatus)
router.get('/project-order', authIslogin, ctrl.getProjectByOrder)
router.get('/project/query', authIslogin, ctrl.getProjectByPname)


router.post('/task', authIslogin, ctrl.createTask)
router.post('/assignment', authIslogin, ctrl.assignMembers)
router.get('/task', ctrl.getTaskByProject)

router.get('/project-details-log/:pid', ctrl.logByPid)
router.get('/project-details-project/:pid', ctrl.projectDetailByPid)
router.get('/project-details-members/:pid', ctrl.memberByPid)



router.post('/project', ctrl.addProject)
router.get('/project-details', ctrl.getProjectDetailsByMid)

router.post('/log', ctrl.addLog)
router.post('/update-log-status', authIslogin, ctrl.updateLogStatus)

router.post('/add-log/:pid/:tid', authIslogin, ctrl.addLogInPidAndTid)
router.post('/project-update/:pid', ctrl.updateProjectStatus)
router.post('/add-new-project', authIslogin, ctrl.addNewProject)

router.get('/manager', ctrl.getManagers)


router.get('/project-details-task/:pid', authIslogin, ctrl.taskByPid)
router.post('/update-task-status', authIslogin, ctrl.updateTaskStatus)

router.get('/project-details-task/query/:pid', authIslogin, ctrl.taskBySearchQuery)


router.get('/project-details-logByTask/:pid/:tid', authIslogin, ctrl.logByPidAndTid)
router.get('/project/members/not-invlolved/:pid', ctrl.getMemberByPidNotInvolved)











// File Uploading

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../SERVER-SIDE/public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const maxSize = 5 * 1000 * 1000; //5mb

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(
            "Error: File upload only supports the " +
            "following filetypes - " +
            filetypes
        );
    },

});


router.post('/EditDetails', upload.single('profile'), ctrl.UpdateDetails);


module.exports = router;