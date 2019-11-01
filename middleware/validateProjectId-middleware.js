const validateProjectId = db => {
    return async function (req, res, next) {
        const { project_id } = req.body;
        try {
            const project = await db.get(project_id);
            if (!project) res.status(404).json({ message: "Resource with given id is not available" });
            next();
        } catch (error) {
            res.status(500).json({ message: "Internal server error when validating project ID", project_id });
        }
    }
}

module.exports = validateProjectId;