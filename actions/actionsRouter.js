const router = require("express").Router();

const actionsDb = require("../data/helpers/actionModel");
const projectsDb = require("../data/helpers/projectModel");

// Route Handlers
router.get("/", async (req, res) => {
    try {
        const actions = await actionsDb.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error when getting the actions" });
    }
});

router.get("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const actions = await actionsDb.get(id);
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: `Internal server error getting the action with id ${id}` });
    }
});

router.post("/", validateProjectId, async (req, res) => {
    const action = req.body;
    try {
        const newAction = await actionsDb.insert(action);
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: `Internal server error posting action ${action}` });
    }
});

router.put("/:id", validateId, validateProjectId, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const newAction = await actionsDb.update(id, changes);
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: `Internal server error when updating the action with id ${id}` });
    }
});

router.delete("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await actionsDb.remove(id);
        if (!deleted) res.status(500).json({ message: `Action with id ${id} could not be deleted` });
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ message: `Internal server error when deleting action with id ${id}` });
    }
});

// Custom Middleware
async function validateId(req, res, next) {
    const { id } = req.params;
    try {
        const actions = await actionsDb.get(id);
        if (!actions) res.status(404).json({ message: "Resource with given id is not available" });
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error when validating Id" });
    }
}

async function validateProjectId(req, res, next) {
    const { project_id } = req.body;
    try {
        const project = await projectsDb.get(project_id);
        if (!project) res.status(404).json({ message: "Resource with given id is not available" });
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error when validating project ID" });
    }
}


module.exports = router;