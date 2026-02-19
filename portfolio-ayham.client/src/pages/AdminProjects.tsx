import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { ArrowLeft, Save, Plus, X, Edit2, Trash2 } from "lucide-react";
import { useAuth } from "../context.tsx/authContext";
import { useToast } from "../hook/useToast";
import { contentAPI } from "../services/authService";
import type { projectProps } from "../interface/interfaces";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "../components/ui/modal";

type AdminProjectItem = projectProps & {
  descriptionSv?: string;
};

const AdminProjects: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [projects, setProjects] = useState<AdminProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] =
    useState<AdminProjectItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] =
    useState<AdminProjectItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formDataEn, setFormDataEn] = useState<Partial<projectProps>>({
    title: "",
    client: "",
    year: "",
    description: "",
    role: "",
    technologies: [],
    category: "frontend",
  });
  const [formDataSv, setFormDataSv] = useState<Partial<projectProps>>({
    title: "",
    client: "",
    year: "",
    description: "",
    role: "",
    technologies: [],
    category: "frontend",
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    } else if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadProjects = async () => {
    try {
      const [enRes, svRes] = await Promise.all([
        contentAPI.getProjects("en"),
        contentAPI.getProjects("sv"),
      ]);

      const enList = Array.isArray(enRes.data) ? enRes.data : [];
      const svList = Array.isArray(svRes.data) ? svRes.data : [];

      const merged: AdminProjectItem[] = enList.map((en) => {
        const sv = svList.find((s) => s.id === en.id);
        return {
          ...en,
          descriptionSv: sv?.description,
        };
      });

      const sorted = merged
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setProjects(sorted);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const basePayloadEn = {
        title: formDataEn.title || "",
        client: formDataEn.client || "",
        year: formDataEn.year || "",
        description: formDataEn.description || "",
        role: formDataEn.role || "",
        technologies: formDataEn.technologies || [],
        category: formDataEn.category || "frontend",
      };

      if (editingProject) {
        // Update EN
        await contentAPI.updateProject(editingProject.id!, {
          ...basePayloadEn,
          language: "en",
        });

        // Update SV description as well (fallback to EN when SV is empty)
        const svDescription =
          formDataSv.description && formDataSv.description.trim().length > 0
            ? formDataSv.description
            : basePayloadEn.description;

        await contentAPI.updateProject(editingProject.id!, {
          ...basePayloadEn,
          description: svDescription,
          language: "sv",
        });

        toast({
          title: "Success!",
          description: "Project updated successfully.",
        });
      } else {
        // Create EN project first
        const created = await contentAPI.createProject({
          ...(basePayloadEn as Omit<projectProps, "id">),
          language: "en",
        });

        // Then add SV description on same project (fallback to EN when SV is empty)
        const svDescription =
          formDataSv.description && formDataSv.description.trim().length > 0
            ? formDataSv.description
            : basePayloadEn.description;

        await contentAPI.updateProject(created.data.id!, {
          ...basePayloadEn,
          description: svDescription,
          language: "sv",
        });

        toast({
          title: "Success!",
          description: "Project created successfully.",
        });
      }

      resetForm();
      loadProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: AdminProjectItem) => {
    setEditingProject(project);
    setFormDataEn({
      title: project.title,
      client: project.client,
      year: project.year,
      description: project.description,
      role: project.role,
      technologies: project.technologies,
      category: project.category,
    });
    setFormDataSv({
      title: project.title,
      client: project.client,
      year: project.year,
      description: project.descriptionSv || "",
      role: project.role,
      technologies: project.technologies,
      category: project.category,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await contentAPI.deleteProject(id);
      toast({
        title: "Success!",
        description: "Project deleted successfully.",
      });
      loadProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormDataEn({
      title: "",
      client: "",
      year: "",
      description: "",
      role: "",
      technologies: [],
      category: "frontend",
    });
    setFormDataSv({
      title: "",
      client: "",
      year: "",
      description: "",
      role: "",
      technologies: [],
      category: "frontend",
    });
    setEditingProject(null);
    setShowForm(false);
    setTechInput("");
  };

  const addTechnology = () => {
    if (
      techInput.trim() &&
      !formDataEn.technologies?.includes(techInput.trim())
    ) {
      setFormDataEn({
        ...formDataEn,
        technologies: [...(formDataEn.technologies || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete?.id) return;
    try {
      await contentAPI.deleteProject(projectToDelete.id);
      toast({
        title: "Deleted",
        description: "Project entry deleted successfully.",
      });
      setProjects((prev) =>
        prev.filter((proj) => proj.id !== projectToDelete.id),
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project entry",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
    }
  };

  const removeTechnology = (tech: string) => {
    setFormDataEn({
      ...formDataEn,
      technologies: formDataEn.technologies?.filter((t) => t !== tech) || [],
    });
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(projects);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);

    const withOrder = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setProjects(withOrder);

    try {
      await Promise.all(
        withOrder.map((item, index) => {
          if (!item.id) return Promise.resolve();

          const updatedData = {
            title: item.title,
            client: item.client,
            year: item.year,
            description: item.description,
            role: item.role,
            technologies: item.technologies,
            category: item.category,
            order: index,
            language: "en",
          };
          return contentAPI.updateProject(item.id, updatedData);
        }),
      );
      toast({
        title: "Order updated",
        description: "Project order has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project order",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Add/Edit Form */}
        <Modal
          open={showDeleteConfirm && !!projectToDelete}
          onClose={() => {
            setShowDeleteConfirm(false);
            setProjectToDelete(null);
          }}
          title="Delete project entry?"
          description={
            projectToDelete
              ? `You are about to delete "${projectToDelete.title}" for client "${projectToDelete.client}". This action cannot be undone.`
              : undefined
          }
          footer={
            <>
              <Button
                variant="outline"
                className="border-slate-700 text-white"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setProjectToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={confirmDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          }
        />
        {showForm && (
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <Button
                onClick={resetForm}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Title
                  </label>
                  <Input
                    value={formDataEn.title}
                    onChange={(e) =>
                      setFormDataEn({ ...formDataEn, title: e.target.value })
                    }
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Client
                  </label>
                  <Input
                    value={formDataEn.client}
                    onChange={(e) =>
                      setFormDataEn({ ...formDataEn, client: e.target.value })
                    }
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Year
                  </label>
                  <Input
                    value={formDataEn.year}
                    onChange={(e) =>
                      setFormDataEn({ ...formDataEn, year: e.target.value })
                    }
                    placeholder="e.g., 2024"
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <select
                    value={formDataEn.category}
                    onChange={(e) =>
                      setFormDataEn({
                        ...formDataEn,
                        category: e.target.value as any,
                      })
                    }
                    required
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-md px-3 py-2"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full-Stack</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Role
                </label>
                <Input
                  value={formDataEn.role}
                  onChange={(e) =>
                    setFormDataEn({ ...formDataEn, role: e.target.value })
                  }
                  placeholder="e.g., Frontend Developer"
                  required
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Description (EN)
                  </label>
                  <Textarea
                    value={formDataEn.description}
                    onChange={(e) =>
                      setFormDataEn({
                        ...formDataEn,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    required
                    className="bg-slate-900 border-slate-700 text-white resize-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Description (SV)
                  </label>
                  <Textarea
                    value={formDataSv.description}
                    onChange={(e) =>
                      setFormDataSv({
                        ...formDataSv,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="bg-slate-900 border-slate-700 text-white resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTechnology())
                    }
                    placeholder="Add technology"
                    className="bg-slate-900 border-slate-700 text-white flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addTechnology}
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formDataEn.technologies?.map((tech, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-700 text-white px-3 py-1 rounded-md flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="border-slate-700 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingProject ? "Update" : "Create"} Project
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            All Projects ({projects.length})
          </h2>

          {projects.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
              <p className="text-slate-400">
                No projects yet. Click "Add Project" to create one.
              </p>
            </Card>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="projects-list">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {projects.map((project, index) => (
                      <Draggable
                        key={project.id}
                        draggableId={project.id!}
                        index={index}
                      >
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition-all">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-white mb-1">
                                    {project.title}
                                  </h3>
                                  <p className="text-cyan-400 text-sm">
                                    {project.client}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEdit(project)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-cyan-400"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(project.id!)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-red-400"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2 mb-3">
                                <p className="text-slate-400 text-sm">
                                  <span className="text-slate-500">Year:</span>{" "}
                                  {project.year}
                                </p>
                                <p className="text-slate-400 text-sm">
                                  <span className="text-slate-500">Role:</span>{" "}
                                  {project.role}
                                </p>
                                <p className="text-slate-400 text-sm">
                                  <span className="text-slate-500">
                                    Category:
                                  </span>{" "}
                                  <span className="capitalize">
                                    {project.category}
                                  </span>
                                </p>
                              </div>

                              <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                                {project.description}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {project.technologies
                                  .slice(0, 5)
                                  .map((tech, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                {project.technologies.length > 5 && (
                                  <span className="bg-slate-700 text-slate-400 text-xs px-2 py-1 rounded">
                                    +{project.technologies.length - 5}
                                  </span>
                                )}
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProjects;
