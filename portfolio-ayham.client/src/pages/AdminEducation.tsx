import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { ArrowLeft, Save, Plus, X, Trash2 } from "lucide-react";
import Modal from "../components/ui/modal";
import { useAuth } from "../context.tsx/authContext";
import { useToast } from "../hook/useToast";
import { contentAPI } from "../services/authService";
import type { educationProps } from "../interface/interfaces";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type AdminEducationItem = educationProps & {
  degreeSv?: string;
  descriptionSv?: string;
};

const AdminEducation: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [educations, setEducations] = useState<AdminEducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEducation, setEditingEducation] =
    useState<AdminEducationItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formDataEn, setFormDataEn] = useState<Partial<educationProps>>({
    degree: "",
    school: "",
    period: "",
    description: "",
  });
  const [formDataSv, setFormDataSv] = useState<Partial<educationProps>>({
    degree: "",
    school: "",
    period: "",
    description: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    } else if (isAuthenticated) {
      loadEducations();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadEducations = async () => {
    try {
      const [enRes, svRes] = await Promise.all([
        contentAPI.getEducation("en"),
        contentAPI.getEducation("sv"),
      ]);

      const enList = Array.isArray(enRes.data) ? enRes.data : [];
      const svList = Array.isArray(svRes.data) ? svRes.data : [];

      const merged: AdminEducationItem[] = enList.map((en) => {
        const sv = svList.find((s) => s.id === en.id);
        return {
          ...en,
          degreeSv: sv?.degree,
          descriptionSv: sv?.description,
        };
      });

      setEducations(merged);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load education entries",
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
        school: formDataEn.school || "",
        degree: formDataEn.degree || "",
        period: formDataEn.period || "",
        description: formDataEn.description || "",
      };

      if (editingEducation && editingEducation.id) {
        // Update EN description and base fields
        await contentAPI.updateEducation(editingEducation.id, {
          ...basePayloadEn,
          language: "en",
        });

        // Always update SV as well (fallback to EN when SV fields are empty)
        const svDegree =
          formDataSv.degree && formDataSv.degree.trim().length > 0
            ? formDataSv.degree
            : basePayloadEn.degree;
        const svDescription =
          formDataSv.description && formDataSv.description.trim().length > 0
            ? formDataSv.description
            : basePayloadEn.description;

        await contentAPI.updateEducation(editingEducation.id, {
          ...basePayloadEn,
          degree: svDegree,
          description: svDescription,
          language: "sv",
        });
      } else {
        // Create education with EN description first
        const created = await contentAPI.createEducation({
          ...(basePayloadEn as Omit<educationProps, "id">),
          language: "en",
        });

        // Then always store SV on the same entry (fallback to EN when SV fields are empty)
        const svDegree =
          formDataSv.degree && formDataSv.degree.trim().length > 0
            ? formDataSv.degree
            : basePayloadEn.degree;
        const svDescription =
          formDataSv.description && formDataSv.description.trim().length > 0
            ? formDataSv.description
            : basePayloadEn.description;

        await contentAPI.updateEducation(created.data.id!, {
          ...basePayloadEn,
          degree: svDegree,
          description: svDescription,
          language: "sv",
        });
      }

      toast({
        title: "Success!",
        description: editingEducation
          ? "Education updated successfully."
          : "Education added successfully.",
      });

      resetForm();
      loadEducations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save education",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (education: AdminEducationItem) => {
    setEditingEducation(education);
    setFormDataEn({
      degree: education.degree,
      school: education.school,
      period: education.period,
      description: education.description,
    });
    setFormDataSv({
      degree: education.degreeSv || "",
      school: education.school,
      period: education.period,
      description: education.descriptionSv || "",
    });
    setShowForm(true);
  };

  const [educationToDelete, setEducationToDelete] =
    useState<AdminEducationItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (education: educationProps) => {
    setEducationToDelete(education);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!educationToDelete?.id) return;
    try {
      await contentAPI.deleteEducation(educationToDelete.id);
      toast({
        title: "Deleted",
        description: "Education entry deleted successfully.",
      });
      setEducations((prev) =>
        prev.filter((edu) => edu.id !== educationToDelete.id),
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete education entry",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirm(false);
      setEducationToDelete(null);
    }
  };

  const resetForm = () => {
    setFormDataEn({
      degree: "",
      school: "",
      period: "",
      description: "",
    });
    setFormDataSv({
      degree: "",
      school: "",
      period: "",
      description: "",
    });
    setEditingEducation(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(educations);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    const withOrder = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));
    setEducations(withOrder);
    await Promise.all(
      withOrder.map((item, index) => {
        if (!item.id) return Promise.resolve();
        const updatedData = {
          school: item.school,
          degree: item.degree,
          period: item.period,
          description: item.description,
          order: index,
          language: "en",
        };
        return contentAPI.updateEducation(item.id, updatedData);
      }),
    );
  };

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
              <h1 className="text-2xl font-bold text-white">
                Education & Courses
              </h1>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Delete confirmation modal */}
        <Modal
          open={showDeleteConfirm && !!educationToDelete}
          onClose={() => {
            setShowDeleteConfirm(false);
            setEducationToDelete(null);
          }}
          title="Delete education entry?"
          description={
            educationToDelete
              ? `You are about to delete "${educationToDelete.degree}" at "${educationToDelete.school}". This action cannot be undone.`
              : undefined
          }
          footer={
            <>
              <Button
                variant="outline"
                className="border-slate-700 text-white"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setEducationToDelete(null);
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
        {/* Add/Edit Form */}
        {showForm && (
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {editingEducation ? "Edit Education" : "Add New Education"}
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
                    Degree / Course (EN)
                  </label>
                  <Input
                    value={formDataEn.degree}
                    onChange={(e) =>
                      setFormDataEn({ ...formDataEn, degree: e.target.value })
                    }
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">
                    Degree / Course (SV)
                  </label>
                  <Input
                    value={formDataSv.degree}
                    onChange={(e) =>
                      setFormDataSv({ ...formDataSv, degree: e.target.value })
                    }
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  School / Provider
                </label>
                <Input
                  value={formDataEn.school}
                  onChange={(e) =>
                    setFormDataEn({ ...formDataEn, school: e.target.value })
                  }
                  required
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Period (e.g. 2018 - 2021)
                </label>
                <Input
                  value={formDataEn.period}
                  onChange={(e) =>
                    setFormDataEn({ ...formDataEn, period: e.target.value })
                  }
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
                  {editingEducation ? "Update" : "Create"} Education
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Education List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            All Education & Courses ({educations.length})
          </h2>

          {educations.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
              <p className="text-slate-400">
                No education entries yet. Click "Add Education" to create one.
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
                    {educations.map((edu) => (
                      <Draggable
                        key={edu.id}
                        draggableId={edu.id!}
                        index={educations.indexOf(edu)}
                      >
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            <Card
                              key={edu.id}
                              className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition-all"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-white mb-1">
                                    {edu.degree}
                                  </h3>
                                  <p className="text-cyan-400 font-medium">
                                    {edu.school}
                                  </p>
                                  <p className="text-slate-500 text-sm mt-1">
                                    {edu.period}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEdit(edu)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-cyan-400"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteClick(edu)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-red-400"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              <p className="text-slate-300 mb-4">
                                {edu.description}
                              </p>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
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

export default AdminEducation;
