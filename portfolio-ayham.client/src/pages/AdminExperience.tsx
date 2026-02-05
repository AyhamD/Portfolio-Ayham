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
import type { experienceProps } from "../interface/interfaces";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const AdminExperience: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [experiences, setExperiences] = useState<experienceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] =
    useState<experienceProps | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<experienceProps>>({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    } else if (isAuthenticated) {
      loadExperiences();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadExperiences = async () => {
    try {
      const res = await contentAPI.getExperience();
      const data = Array.isArray(res.data) ? res.data : [];
      // sort by order so drag-and-drop starts from current ordering
      const sorted = data.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setExperiences(sorted);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load experiences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOrder = async (orderedItems: experienceProps[]) => {
    try {
      // Persist only the order field for each experience
      await Promise.all(
        orderedItems.map((exp, index) =>
          contentAPI.updateExperience(exp.id!, { order: index })
        )
      );
      toast({
        title: "Order updated",
        description: "Experience order has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save experience order",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(experiences);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);

    const withOrder = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setExperiences(withOrder);
    handleSaveOrder(withOrder);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingExperience) {
        await contentAPI.updateExperience(editingExperience.id!, formData);
        toast({
          title: "Success!",
          description: "Experience updated successfully.",
        });
      } else {
        await contentAPI.createExperience(
          formData as Omit<experienceProps, "id">
        );
        toast({
          title: "Success!",
          description: "Experience created successfully.",
        });
      }

      resetForm();
      loadExperiences();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save experience",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (experience: experienceProps) => {
    setEditingExperience(experience);
    setFormData(experience);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this experience?"))
      return;

    try {
      await contentAPI.deleteExperience(id);
      toast({
        title: "Success!",
        description: "Experience deleted successfully.",
      });
      loadExperiences();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setEditingExperience(null);
    setShowForm(false);
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
        <div className="max-w-6xl mx-auto px-6 py-4">
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
              <h1 className="text-2xl font-bold text-white">Work Experience</h1>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Add/Edit Form */}
        {showForm && (
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {editingExperience ? "Edit Experience" : "Add New Experience"}
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
                    Company
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Role
                  </label>
                  <Input
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Start Date
                </label>
                <Input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  End Date (leave empty if current)
                </label>
                <Input
                  type="text"
                  value={formData.endDate ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      endDate: e.target.value || undefined,
                    })
                  }
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                  className="bg-slate-900 border-slate-700 text-white resize-none"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="border-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingExperience ? "Update" : "Create"} Experience
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Experiences List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            All Experiences ({experiences.length})
          </h2>

          {experiences.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
              <p className="text-slate-400">
                No experience entries yet. Click "Add Experience" to create one.
              </p>
            </Card>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="experience-list">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {experiences.map((exp, index) => (
                      <Draggable
                        key={exp.id}
                        draggableId={exp.id!}
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
                                  <h3 className="text-xl font-bold text-white mb-1">
                                    {exp.role}
                                  </h3>
                                  <p className="text-cyan-400 font-medium">
                                    {exp.company}
                                  </p>
                                  <p className="text-slate-500 text-sm mt-1">
                                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                                    {exp.endDate
                                      ? new Date(exp.endDate).toLocaleDateString()
                                      : "Present"}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEdit(exp)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-cyan-400"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(exp.id!)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-red-400"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              <p className="text-slate-300 mb-4">
                                {exp.description}
                              </p>
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

export default AdminExperience;
