import "./styles.css";
import { loadProjects, saveProjects } from "./modules/storage.js";
import { render, renderProjects } from "./ui/dom.js";
import { initializeEventHandlers } from "./ui/eventHandlers.js";

document.addEventListener("DOMContentLoaded", function () {
  // Get content, form, edit dialog modal
  const content = document.getElementById("todo-content");
  const projectsContent = document.getElementById("projects-content");
  const form = document.getElementById("todo-form");
  const editDialog = document.getElementById("todo-edit-dialog");

  // Load projects with todos
  const projectsArr = loadProjects();

  // Track active project
  let activeProjectId = projectsArr[0].id;

  // Helper to get active project
  function getActiveProject() {
    for (let i = 0; i < projectsArr.length; i++) {
      if (projectsArr[i].id === activeProjectId) {
        return projectsArr[i];
      }
    }
    return projectsArr[0];
  }

  // Call event handlers
  initializeEventHandlers(
    content,
    form,
    projectsArr,
    saveProjects,
    render,
    editDialog,
    activeProjectId,
  );

  // Display
  render(content, getActiveProject().todos);
  renderProjects(projectsContent, projectsArr, activeProjectId);
});
