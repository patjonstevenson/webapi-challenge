const router = require("express").Router();

const projectsDb = require("../data/helpers/projectModel");

const validateId = require("../middleware/validateId-middleware")(projectsDb);

// Route Handlers
router.get("/", async (req, res) => {
    try {
        const projects = await projectsDb.get();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Internal server error when getting the projects" });
    }
});

router.get("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await projectsDb.get(id);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Internal server error getting the project", id });
    }
});

router.get("/:id/actions", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const actions = await projectsDb.getProjectActions(id);
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error getting the project actions", id });
    }
});

router.post("/", async (req, res) => {
    const project = req.body;
    try {
        const newProject = await projectsDb.insert(project);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Internal server error posting project", project });
    }
});

router.put("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const newProject = await projectsDb.update(id, changes);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Internal server error when updating the project", id });
    }
});

router.delete("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await projectsDb.remove(id);
        if (!deleted) res.status(500).json({ message: "Project could not be deleted", id });
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ message: `Internal server error when deleting action with id ${id}` });
    }
});

module.exports = router;